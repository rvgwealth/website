"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { META_PIXEL_ID } from "@/lib/meta-pixel";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * The base snippet in the root layout fires PageView once, on document load.
 * App Router navigations never reload the document, so every later route
 * change needs its own. Renders nothing.
 */
export function MetaPixelRouteTracker() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return null;
}

type LeadDetails = { name: string; email: string; phone: string };

/**
 * Fires the Lead conversion for a completed webinar registration.
 *
 * Deliberately code-fired rather than set up through Meta's Event Setup Tool.
 * The pixel reports `dl` as the bare origin on this site rather than the real
 * page URL, so a URL-matching rule for /webinar/confirmed can never match.
 * Tracking the event by name sidesteps URL matching entirely.
 *
 * The advanced matching is manual for a related reason: Meta's automatic
 * version reads form fields on a native submit, which never happens here —
 * this form posts with fetch and then client-side navigates. Re-running init
 * with the customer data is the documented equivalent; fbq normalizes and
 * SHA-256 hashes these values in the browser before anything is sent.
 */
export function trackLead({ name, email, phone }: LeadDetails) {
  if (typeof window === "undefined" || !window.fbq) return;

  const [firstName, ...rest] = name.trim().split(/\s+/);
  const lastName = rest.join(" ");

  window.fbq("init", META_PIXEL_ID, {
    em: email.trim().toLowerCase(),
    ph: phone.replace(/\D/g, ""),
    fn: firstName?.toLowerCase(),
    ...(lastName ? { ln: lastName.toLowerCase() } : {}),
  });

  window.fbq("track", "Lead", {
    content_name: "Free Financial Planning Webinar",
    content_category: "webinar_registration",
  });
}
