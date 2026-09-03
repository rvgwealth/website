import type { Metadata } from "next";
import {
  AlertCircle,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Gift,
  MessageCircle,
  NotebookPen,
  Users,
  Video,
} from "lucide-react";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Eyebrow } from "@/components/Eyebrow";
import { disclaimers } from "@/lib/content";
import { bonuses, joinSteps, session, whatsappGroupUrl } from "@/lib/webinar";

export const metadata: Metadata = {
  title: "You're Registered — RVGWealth",
  description:
    "Your seat for the free 90-minute Financial Clarity Session is reserved. Join the WhatsApp group to receive the joining link and session materials.",
  robots: { index: false },
};

const details = [
  {
    icon: CalendarClock,
    label: "When",
    value: session.schedule,
  },
  {
    icon: Video,
    label: "Where",
    value: `${session.format} — link shared in the WhatsApp group`,
  },
  {
    icon: Users,
    label: "Format",
    value: "Live teaching followed by an open Q&A. Cameras optional.",
  },
  {
    icon: NotebookPen,
    label: "Bring",
    value: "A notebook, your rough monthly numbers, and your questions.",
  },
];

export default function WebinarConfirmedPage() {
  return (
    <>
      {/* Confirmation + primary action */}
      <Section background="evergreen">
        <div className="max-w-2xl mx-auto text-center">
          <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold ring-1 ring-gold/30">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <Eyebrow tone="gold" className="mb-4">
            Seat Reserved
          </Eyebrow>
          <h1 className="text-display text-white mb-5">
            You&apos;re in. One step left.
          </h1>
          <p className="text-body text-white/70 mb-10">
            We&apos;ve saved your seat and emailed you the details. Everything
            — the joining link, reminders, and your free templates — is shared
            in our WhatsApp group.
          </p>

          <a
            href={whatsappGroupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-gold px-10 py-5 text-base font-semibold text-ink shadow-[0_10px_30px_rgba(185,138,46,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
          >
            <MessageCircle className="h-5 w-5" />
            Join the WhatsApp Group
          </a>

          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-white/15 bg-white/5 px-6 py-5 text-left">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <p className="text-sm text-white/70">
              <span className="font-semibold text-white">
                Your registration is only complete once you join the group.
              </span>{" "}
              The session link is not emailed separately — it is posted in the
              group an hour before we begin.
            </p>
          </div>
        </div>
      </Section>

      {/* Next steps */}
      <Section background="white" divider>
        <div className="max-w-2xl mb-14">
          <Eyebrow tone="gold" className="mb-4">
            What Happens Next
          </Eyebrow>
          <h2 className="text-h2 text-ink">Three Things To Do Now</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {joinSteps.map((step, i) => (
            <Card key={step.title} className="p-8">
              <span className="text-display text-gold/30 leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-h3 text-ink mt-4 mb-2">{step.title}</h3>
              <p className="text-body text-slate">{step.detail}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Session details */}
      <Section background="sage" divider>
        <div className="max-w-2xl mb-14">
          <Eyebrow tone="gold" className="mb-4">
            Session Details
          </Eyebrow>
          <h2 className="text-h2 text-ink">Everything You Need To Know</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {details.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label} className="p-8 flex items-start gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-evergreen/10 text-evergreen ring-1 ring-evergreen/15">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-eyebrow text-slate mb-2">{item.label}</p>
                  <p className="text-body text-ink">{item.value}</p>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="mt-8 p-8">
          <h3 className="text-h3 text-ink mb-4">Your free templates</h3>
          <p className="text-body text-slate mb-5">
            Every participant receives these — shared in the WhatsApp group:
          </p>
          <ul className="space-y-3">
            {bonuses.map((bonus) => (
              <li key={bonus.title} className="flex items-start gap-3">
                <Gift className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <span className="text-body text-slate">
                  <strong className="text-ink">{bonus.title}</strong> —{" "}
                  {bonus.description}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="mt-8 p-8">
          <h3 className="text-h3 text-ink mb-4">A few house rules</h3>
          <ul className="space-y-3 text-body text-slate">
            <li>
              The session is <strong className="text-ink">live only</strong> and
              is not recorded, so the Q&amp;A stays open and personal.
            </li>
            <li>
              Please join a few minutes early — we start on time out of respect
              for everyone attending.
            </li>
            <li>
              Nothing is sold during the teaching. We explain our membership
              stages briefly at the end, and that part is entirely optional.
            </li>
            <li>
              Can&apos;t make this week? Stay in the group — we run the session
              regularly and announce each one there.
            </li>
          </ul>
        </Card>
      </Section>

      {/* Meanwhile */}
      <Section background="white" divider>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-h2 text-ink mb-5">While You Wait</h2>
          <p className="text-body text-slate mb-8">
            Have a look at how we work with members after the session — from
            foundational literacy through to comprehensive stewardship.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/membership"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(21,35,28,0.25)]"
            >
              Explore Membership
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-hairline px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-mist"
            >
              View Our Services
            </a>
          </div>
          <p className="mt-10 text-xs leading-relaxed text-slate/70">
            {disclaimers.registration}
          </p>
        </div>
      </Section>
    </>
  );
}
