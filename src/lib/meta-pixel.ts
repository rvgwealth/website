// Public by design — the pixel id is visible in the page source either way.
export const META_PIXEL_ID = "1470976854843617";

// Meta's standard snippet, rendered straight into the server HTML by the root
// layout rather than through next/script.
//
// next/script's "afterInteractive" injects the tag only after hydration. The
// live DOM ends up correct — Pixel Helper sees it — but anything that reads the
// raw HTML response does not, including Meta's own Event Setup Tool, which then
// reports "a pixel wasn't detected on this website". Inlining it server-side
// keeps both happy and starts the pixel a little earlier.
export const metaPixelSnippet = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`;

export const metaPixelNoscriptSrc = `https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`;
