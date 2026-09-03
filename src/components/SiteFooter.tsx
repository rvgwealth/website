import { Globe, Mail, Share2 } from "lucide-react";
import Image from "next/image";
import { footerColumns, siteInfo } from "@/lib/site";
import { disclaimers } from "@/lib/content";
import { Container } from "./Container";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white/70">
      <Container className="py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div>
            <Image
              src="/logo-lockup-transparent.png"
              alt="RVGWealth"
              width={820}
              height={380}
              className="h-auto w-48"
            />
            <p className="mt-4 mb-6 max-w-xs text-sm leading-relaxed text-white/60">
              {siteInfo.tagline}
            </p>
            <div className="flex gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-gold hover:text-gold">
                <Share2 className="h-4 w-4" />
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-gold hover:text-gold">
                <Mail className="h-4 w-4" />
              </span>
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-eyebrow mb-6 text-gold">{col.heading}</h4>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={`${col.heading}-${link.label}`}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* SEBI disclosures */}
        <div className="mt-16 space-y-3 border-t border-white/10 pt-8">
          <p className="text-xs leading-relaxed text-white/45">
            {disclaimers.registration}
          </p>
          <p className="text-xs leading-relaxed text-white/45">
            {disclaimers.risk}
          </p>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <p className="text-sm text-white/50">{siteInfo.copyright}</p>
          <div className="flex items-center gap-2 text-sm text-white/70">
            <Globe className="h-4 w-4 text-gold" />
            <span>{siteInfo.regions}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
