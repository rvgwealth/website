"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown, Lock } from "lucide-react";
import { Button } from "./Button";
import { Eyebrow } from "./Eyebrow";

type Status = "idle" | "sending" | "error";

const inputClasses =
  "w-full bg-mist border border-hairline rounded-lg px-4 py-2.5 text-ink placeholder:text-slate/60 focus:border-evergreen focus:outline-none";

export function WebinarForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      goal: fd.get("goal"),
      company: fd.get("company") ?? "",
      whatsappOptIn: fd.get("whatsappOptIn") === "on",
    };

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/webinar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "Something went wrong.");
      }
      router.push("/webinar/confirmed");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <h2 className="text-h3 text-ink">Reserve your free seat</h2>
        <p className="text-sm text-slate mt-1">
          Takes less than a minute. No payment details required.
        </p>
      </div>

      {/* Honeypot — hidden from humans, bots fill it */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="space-y-2">
        <Eyebrow tone="muted">Full Name</Eyebrow>
        <input
          className={inputClasses}
          placeholder="Your name"
          type="text"
          name="name"
          required
          minLength={2}
          maxLength={100}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Eyebrow tone="muted">Email Address</Eyebrow>
          <input
            className={inputClasses}
            placeholder="you@example.com"
            type="email"
            name="email"
            required
            maxLength={200}
          />
        </div>
        <div className="space-y-2">
          <Eyebrow tone="muted">WhatsApp Number</Eyebrow>
          <input
            className={inputClasses}
            placeholder="+91 00000 00000"
            type="tel"
            name="phone"
            required
            minLength={7}
            maxLength={20}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Eyebrow tone="muted">What Brings You Here?</Eyebrow>
        <div className="relative">
          <select
            className={`${inputClasses} appearance-none cursor-pointer`}
            name="goal"
            defaultValue="structure"
          >
            <option value="structure">Structure my overall financial plan</option>
            <option value="saving">Build a saving &amp; investing habit</option>
            <option value="education">Plan for my child&apos;s education</option>
            <option value="retirement">Prepare for retirement</option>
            <option value="debt">Get out of debt</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-5 h-5 text-slate" />
        </div>
      </div>

      <label className="flex items-start gap-3 rounded-lg border border-hairline bg-mist/60 px-4 py-3 cursor-pointer">
        <input
          type="checkbox"
          name="whatsappOptIn"
          defaultChecked
          className="mt-0.5 h-4 w-4 shrink-0 accent-evergreen cursor-pointer"
        />
        <span className="text-sm text-slate">
          Send me the joining link, reminders and free templates on{" "}
          <span className="font-semibold text-ink">WhatsApp</span>. You can opt
          out any time.
        </span>
      </label>

      {status === "error" && (
        <p className="text-sm text-center text-red-600">{errorMsg}</p>
      )}

      <Button type="submit" disabled={status === "sending"} className="w-full">
        {status === "sending" ? "Reserving…" : "Reserve My Free Seat"}
        <ArrowRight className="w-4 h-4" />
      </Button>

      <p className="flex items-center justify-center gap-2 text-xs text-slate/70">
        <Lock className="w-3.5 h-3.5" />
        We never share your details. No spam, ever.
      </p>
    </form>
  );
}
