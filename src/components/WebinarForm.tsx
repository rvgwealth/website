"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "./Button";
import { Eyebrow } from "./Eyebrow";
import { generateSessionSlots, type SessionSlot } from "@/lib/webinar";
import { trackLead } from "./MetaPixel";

type Status = "idle" | "sending" | "error";

const inputClasses =
  "w-full bg-mist border border-hairline rounded-lg px-4 py-2.5 text-ink placeholder:text-slate/60 focus:border-evergreen focus:outline-none";

// Extra right padding keeps long option text from running under the chevron.
const selectClasses = `${inputClasses} pr-11 appearance-none cursor-pointer truncate`;

// Bold, high-contrast field labels.
const labelClasses = "!font-bold !text-ink";

// The dates are derived on the client so the list always reflects the
// visitor's "today" instead of freezing at build time on this static page.
// useSyncExternalStore keeps the server snapshot empty without a setState
// cascade; both snapshots must be referentially stable, hence the caches.
const NO_SLOTS: SessionSlot[] = [];
let cachedSlots: SessionSlot[] | null = null;
const neverChanges = () => () => {};
const clientSlots = () => (cachedSlots ??= generateSessionSlots(12));

export function WebinarForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const slots = useSyncExternalStore(neverChanges, clientSlots, () => NO_SLOTS);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      sessionSlot: fd.get("sessionSlot"),
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
      // Meta conversion — only once the API confirms the seat is reserved,
      // so failed submissions and bots never count as conversions.
      trackLead({
        name: String(data.name ?? ""),
        email: String(data.email ?? ""),
        phone: String(data.phone ?? ""),
      });
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
        <Eyebrow tone="muted" className={labelClasses}>Full Name</Eyebrow>
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
          <Eyebrow tone="muted" className={labelClasses}>Email Address</Eyebrow>
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
          <Eyebrow tone="muted" className={labelClasses}>WhatsApp Number</Eyebrow>
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
        <Eyebrow tone="muted" className={labelClasses}>
          Choose Your Session
        </Eyebrow>
        <div className="relative">
          <select
            className={selectClasses}
            name="sessionSlot"
            required
            defaultValue=""
          >
            <option value="" disabled>
              {slots.length ? "Select a date" : "Loading dates…"}
            </option>
            {slots.map((slot) => (
              <option key={slot.value} value={slot.value}>
                {slot.label}
              </option>
            ))}
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

    </form>
  );
}
