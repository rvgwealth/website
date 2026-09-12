"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Public by design — the pixel id is visible in the page source either way.
const PIXEL_ID = "792235003947214";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function MetaPixel() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  // The base snippet fires PageView once on load. App Router navigations
  // never reload the document, so every later route change needs its own.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}

type LeadDetails = { name: string; email: string; phone: string };

/**
 * Fires the Lead conversion for a completed webinar registration.
 *
 * Automatic Advanced Matching scrapes form fields on a native form submit,
 * which never happens here — the form posts with fetch and then client-side
 * navigates, so there is nothing for Meta to observe. Re-running init with the
 * customer data is the documented manual equivalent; fbq normalizes and
 * SHA-256 hashes these values in the browser before anything is sent.
 */
export function trackLead({ name, email, phone }: LeadDetails) {
  if (typeof window === "undefined" || !window.fbq) return;

  const [firstName, ...rest] = name.trim().split(/\s+/);
  const lastName = rest.join(" ");

  window.fbq("init", PIXEL_ID, {
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
