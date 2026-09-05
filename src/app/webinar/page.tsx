import type { Metadata } from "next";
import {
  AlertCircle,
  Check,
  ChevronDown,
  Clock,
  Gift,
  IndianRupee,
  Ticket,
  Video,
} from "lucide-react";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Eyebrow } from "@/components/Eyebrow";
import { WebinarForm } from "@/components/WebinarForm";
import { disclaimers } from "@/lib/content";
import {
  bonuses,
  discoveries,
  earningMore,
  finalCta,
  hero,
  homeLoan,
  painQuestions,
  presenter,
  session,
  webinarFaqs,
  whoShouldAttend,
} from "@/lib/webinar";

export const metadata: Metadata = {
  title: "Free Financial Planning Webinar — RVGWealth",
  description:
    "How much money is enough for the life you want? Join our free live webinar to calculate your financial requirements, plan your life goals, and build a roadmap toward financial freedom.",
};

const facts = [
  { icon: Clock, label: session.duration },
  { icon: Video, label: session.format },
  { icon: IndianRupee, label: session.cost },
  { icon: Ticket, label: session.seats },
];

export default function WebinarPage() {
  return (
    <>
      {/* Hero + registration */}
      <Section background="evergreen">
        <div
          id="register"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          <div className="lg:col-span-6 space-y-8">
            <div>
              <Eyebrow
                tone="gold"
                className="mb-4 !text-[28px] !font-bold !tracking-[0.06em] leading-tight"
              >
                {hero.eyebrow}
              </Eyebrow>
              <h1 className="text-display text-white mb-5">{hero.heading}</h1>
              <p className="text-body text-white/70 max-w-xl mb-4">
                {hero.body}
              </p>
              <p className="text-body text-white/70 max-w-xl">{hero.support}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {facts.map((fact) => {
                const Icon = fact.icon;
                return (
                  <span
                    key={fact.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80"
                  >
                    <Icon className="h-4 w-4 text-gold" />
                    {fact.label}
                  </span>
                );
              })}
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <h2 className="text-h3 text-white mb-4">
                Free bonuses for every participant
              </h2>
              <ul className="space-y-3">
                {bonuses.map((bonus) => (
                  <li key={bonus.title} className="flex items-start gap-3">
                    <Gift className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <span className="text-body text-white/80">
                      {bonus.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <Card className="p-8">
              <WebinarForm />
            </Card>
          </div>
        </div>
      </Section>

      {/* The questions */}
      <Section background="white" divider>
        <div className="max-w-2xl mb-12">
          <Eyebrow tone="gold" className="mb-4">
            Sound Familiar?
          </Eyebrow>
          <h2 className="text-h2 text-ink mb-5">
            Are You Earning More… But Still Not Feeling Richer?
          </h2>
          <p className="text-body text-slate">
            Your salary may be increasing, but so are your expenses, EMIs and
            lifestyle commitments. You may be asking yourself:
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {painQuestions.map((question) => (
            <Card key={question} className="p-6 flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <p className="text-body text-ink">{question}</p>
            </Card>
          ))}
        </div>
        <p className="text-body text-slate mt-8">
          If these questions sound familiar, this webinar is for you.
        </p>
      </Section>

      {/* The problem */}
      <Section background="evergreen" divider>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-h2 text-white mb-6">
            The Problem Isn&apos;t Always Your Income.
            <br />
            <span className="text-gold">
              It&apos;s the Lack of a Clear Financial Plan.
            </span>
          </h2>
          <p className="text-body text-white/70 mb-8">
            A higher income doesn&apos;t automatically create financial freedom.
            Without proper planning, money can disappear into:
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {["EMIs", "Lifestyle Expenses", "Taxes", "Inflation", "Unplanned Goals"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm text-white/80"
                >
                  {item}
                </span>
              )
            )}
          </div>
          <p className="text-body text-white/70">
            The result? You earn more… but still worry about your financial
            future. This webinar will help you replace uncertainty with clarity.
          </p>
        </div>
      </Section>

      {/* What you'll discover */}
      <Section background="white" divider>
        <div className="max-w-2xl mb-14">
          <Eyebrow tone="gold" className="mb-4">
            What You&apos;ll Discover
          </Eyebrow>
          <h2 className="text-h2 text-ink">Nine Things You&apos;ll Walk Away Knowing</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {discoveries.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.number} hover className="p-8">
                <div className="flex items-center justify-between mb-5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-evergreen/10 text-evergreen ring-1 ring-evergreen/15">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-h2 text-gold/25 leading-none">
                    {item.number}
                  </span>
                </div>
                <h3 className="text-h3 text-ink mb-2">{item.title}</h3>
                <p className="text-body text-slate">{item.description}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Home loan */}
      <Section background="sage" divider>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow tone="gold" className="mb-4">
              A Decision Worth Pausing On
            </Eyebrow>
            <h2 className="text-h2 text-ink mb-6">{homeLoan.heading}</h2>
            <p className="text-body text-slate mb-6">Ask yourself:</p>
            <ul className="space-y-4">
              {homeLoan.questions.map((question) => (
                <li key={question} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-evergreen" />
                  <span className="text-body text-slate">{question}</span>
                </li>
              ))}
            </ul>
          </div>
          <Card className="p-10 text-center">
            <h3 className="text-h2 text-ink mb-5">{homeLoan.punchline}</h3>
            <p className="text-body text-slate mb-8">{homeLoan.support}</p>
            <a
              href="#register"
              className="inline-flex items-center justify-center rounded-full bg-ink px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(21,35,28,0.25)]"
            >
              Reserve My Free Seat
            </a>
          </Card>
        </div>
      </Section>

      {/* Earning more */}
      <Section background="white" divider>
        <div className="max-w-3xl mx-auto text-center">
          <Eyebrow tone="gold" className="mb-4">
            The Hard Truth
          </Eyebrow>
          <h2 className="text-h2 text-ink mb-8">{earningMore.heading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
            {earningMore.points.map((point) => (
              <Card key={point} className="p-6">
                <p className="text-body text-slate">{point}</p>
              </Card>
            ))}
          </div>
          <p className="text-body text-slate">{earningMore.closing}</p>
        </div>
      </Section>

      {/* Bonuses */}
      <Section background="sage" divider>
        <div className="max-w-2xl mb-14">
          <Eyebrow tone="gold" className="mb-4">
            Free Bonuses for Every Participant
          </Eyebrow>
          <h2 className="text-h2 text-ink">
            Practical Planning Tools, Yours to Keep
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bonuses.map((bonus) => {
            const Icon = bonus.icon;
            return (
              <Card key={bonus.title} hover className="p-8">
                <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold ring-1 ring-gold/20">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-h3 text-ink mb-2">{bonus.title}</h3>
                <p className="text-body text-slate">{bonus.description}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Presenter */}
      <Section background="evergreen" divider>
        <div className="max-w-3xl mx-auto text-center">
          <Eyebrow tone="gold" className="mb-4">
            {presenter.eyebrow}
          </Eyebrow>
          <h2 className="text-h2 text-white mb-6">{presenter.heading}</h2>
          <p className="text-body text-white/70 mb-8">{presenter.body}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {presenter.highlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm text-white/80"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* Who should attend */}
      <Section background="white" divider>
        <div className="max-w-2xl mb-12">
          <Eyebrow tone="gold" className="mb-4">
            Who Should Attend?
          </Eyebrow>
          <h2 className="text-h2 text-ink">This Webinar Is Ideal For</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {whoShouldAttend.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl border border-hairline bg-white px-6 py-4"
            >
              <Check className="h-5 w-5 shrink-0 text-evergreen" />
              <span className="text-body text-ink">{item}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Stop guessing */}
      <Section background="sage" divider>
        <div className="max-w-2xl mx-auto text-center">
          <Eyebrow tone="gold" className="mb-4">
            Free Webinar
          </Eyebrow>
          <h2 className="text-h2 text-ink mb-5">Stop Guessing. Start Planning.</h2>
          <p className="text-body text-slate mb-8">
            You don&apos;t need another random investment tip. You need clarity
            about where you are, where you want to go, and how much money it
            will take to get there.
          </p>
          <a
            href="#register"
            className="inline-flex items-center justify-center rounded-full bg-ink px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(21,35,28,0.25)]"
          >
            Register for Free
          </a>
          <p className="text-sm text-slate mt-5">{finalCta.note}</p>
        </div>
      </Section>

      {/* FAQ */}
      <Section background="white" divider>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-h2 text-ink text-center mb-14">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {webinarFaqs.map((faq) => (
              <Card key={faq.q} className="p-6">
                <details className="group">
                  <summary className="list-none flex justify-between items-center cursor-pointer gap-4">
                    <h3 className="text-h3 text-ink">{faq.q}</h3>
                    <ChevronDown className="w-5 h-5 shrink-0 text-slate transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="pt-4 text-body text-slate">{faq.a}</div>
                </details>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section background="evergreen" divider>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-h2 text-white mb-5">{finalCta.heading}</h2>
          <p className="text-body text-white/70 mb-8">{finalCta.body}</p>
          <a
            href="#register"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
          >
            {finalCta.button}
          </a>
          <p className="text-sm text-white/60 mt-5">{session.seats}</p>
          <p className="mt-10 text-xs leading-relaxed text-white/45">
            {disclaimers.registration}
          </p>
        </div>
      </Section>
    </>
  );
}
