import { Clock, Globe, Megaphone, Phone, Video } from "lucide-react";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <Section
      background="evergreen"
      className="relative overflow-hidden flex items-center min-h-[calc(100dvh-81px)]"
      containerClassName="w-full"
    >
      <div className="relative">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-display text-white mb-3">
            Begin Your Planning Journey.
          </h1>
          <p className="text-body text-white/70 max-w-3xl mx-auto">
            Connect with our planning team to discuss your personal financial
            roadmap — from wherever you are.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: how to reach us */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-h2 text-white">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-gold ring-1 ring-white/15">
                  <Phone className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-eyebrow text-white/50">Call Us</p>
                  <p className="text-body text-white">+91 87625 37905</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-gold ring-1 ring-white/15">
                  <Megaphone className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-eyebrow text-white/50">Press &amp; Media</p>
                  <p className="text-body text-white">enquiries@rvgwealth.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-gold ring-1 ring-white/15">
                  <Video className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-eyebrow text-white/50">Sessions</p>
                  <p className="text-body text-white">
                    One-on-one video consultations
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-gold ring-1 ring-white/15">
                  <Globe className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-eyebrow text-white/50">Coverage</p>
                  <p className="text-body text-white">
                    India · Serving NRIs worldwide
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-4">
              <Clock className="w-5 h-5 shrink-0 text-gold" />
              <p className="text-sm text-white/70">
                We respond to every enquiry within 24 hours.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-7">
            <Card className="p-8">
              <ContactForm />
            </Card>
          </div>
        </div>
      </div>
    </Section>
  );
}
