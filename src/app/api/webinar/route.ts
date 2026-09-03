import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase";
import { session, whatsappGroupUrl } from "@/lib/webinar";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(7).max(20),
  goal: z.enum(["structure", "saving", "education", "retirement", "debt"]),
  // Meta requires documented opt-in before any WhatsApp template message.
  whatsappOptIn: z.boolean().default(false),
  // Honeypot — humans never see this field; bots fill it.
  company: z.string().max(0).optional().or(z.literal("")),
});

const goalLabels: Record<string, string> = {
  structure: "Structure overall financial plan",
  saving: "Build a saving & investing habit",
  education: "Plan for child's education",
  retirement: "Prepare for retirement",
  debt: "Get out of debt",
};

// Naive per-IP rate limit. Resets on redeploy/cold start — good enough
// to stop form spam without external infra.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; start: number }>();

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(ip, { count: 1, start: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function registrantEmail(name: string) {
  const firstName = name.split(" ")[0];
  return {
    subject: `You're registered — ${session.name}`,
    text: [
      `Hi ${firstName},`,
      ``,
      `Your seat for the ${session.name} is reserved.`,
      ``,
      `ONE STEP LEFT — JOIN THE WHATSAPP GROUP`,
      `Your registration is only complete once you join. The joining link, reminders, and your free templates are all shared there:`,
      whatsappGroupUrl,
      ``,
      `SESSION DETAILS`,
      `When: ${session.schedule}`,
      `Duration: ${session.duration}`,
      `Where: ${session.format} — link posted in the WhatsApp group`,
      ``,
      `WHAT TO BRING`,
      `A notebook, a rough idea of your monthly income and expenses, and the goals you want to plan for.`,
      ``,
      `YOUR FREE TEMPLATES`,
      `Every participant receives our Monthly & Annual Budget Templates, a Simple Tax Calculator, and Goal Planning Templates.`,
      ``,
      `See you there,`,
      `RVGWealth`,
    ].join("\n"),
  };
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form fields and try again." },
      { status: 400 }
    );
  }

  const { name, email, phone, goal, whatsappOptIn, company } = parsed.data;

  // Honeypot tripped — pretend success so bots don't adapt.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  // 1. Persist to Supabase (source of truth for the lead list).
  let stored = false;
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("webinar_registrations").insert({
      name,
      email,
      phone,
      goal,
      session_label: session.schedule,
      source: "website",
      whatsapp_opt_in: whatsappOptIn,
      whatsapp_opt_in_at: whatsappOptIn ? new Date().toISOString() : null,
      user_agent: request.headers.get("user-agent"),
      ip,
    });
    if (error) {
      console.error("Supabase insert error:", error);
    } else {
      stored = true;
    }
  } else {
    console.warn("Supabase not configured — skipping registration insert.");
  }

  // 2. Notify the team + send the registrant their next steps.
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.CONTACT_FROM_EMAIL ?? "enquiries@rvgwealth.com";
  const to = process.env.CONTACT_TO_EMAIL ?? "rvgwealth@gmail.com";
  const registrant = registrantEmail(name);

  const results = await Promise.allSettled([
    resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Webinar registration — ${name}`,
      text: [
        `New registration for the ${session.name}.`,
        ``,
        `Name: ${name}`,
        `Email: ${email}`,
        `WhatsApp: ${phone}`,
        `Goal: ${goalLabels[goal]}`,
        `Session: ${session.schedule}`,
        `WhatsApp opt-in: ${whatsappOptIn ? "YES" : "no"}`,
        ``,
        stored ? `Saved to Supabase.` : `NOT saved to Supabase — check config.`,
      ].join("\n"),
    }),
    resend.emails.send({
      from,
      to: email,
      replyTo: to,
      subject: registrant.subject,
      text: registrant.text,
    }),
  ]);

  const emailed = results.some(
    (r) => r.status === "fulfilled" && !r.value.error
  );
  results.forEach((r) => {
    if (r.status === "rejected") console.error("Resend send rejected:", r.reason);
    else if (r.value.error) console.error("Resend error:", r.value.error);
  });

  // Only fail the request if the lead was captured nowhere at all.
  if (!stored && !emailed) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Something went wrong reserving your seat. Please try again or call us.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
