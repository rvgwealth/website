import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MetaPixelRouteTracker } from "@/components/MetaPixel";
import {
  metaPixelNoscriptSrc,
  metaPixelSnippet,
} from "@/lib/meta-pixel";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RVGWealth — Goal-Based Financial Planning",
  description:
    "Empowering individuals with the knowledge, strategies, and confidence to build lasting wealth.",
  icons: {
    icon: "/logo-mark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <head>
        {/* Meta Pixel — inlined server-side so it is present in the raw HTML. */}
        <script
          id="meta-pixel"
          dangerouslySetInnerHTML={{ __html: metaPixelSnippet }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-background text-ink">
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={metaPixelNoscriptSrc}
          />
        </noscript>
        <MetaPixelRouteTracker />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
