import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooterCompact } from "@/components/site-footer";
import { Button } from "@/components/ui/button";

const TIMELINE = [
  {
    year: "2009",
    body: "A personal relationship to movement began — and never let go.",
  },
  {
    year: "2018",
    body: "Began facilitating breathwork and somatic practice professionally.",
  },
  {
    year: "Now",
    body: "Guiding individuals, couples, and groups — live every Thursday on Zoom.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-cream text-ink">
      <SiteHeader active="/about" />

      {/* Hero */}
      <section className="grid grid-cols-1 border-b border-ink md:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col justify-center px-6 py-[72px] md:px-11">
          <div className="mb-[26px] font-mono text-xs uppercase tracking-[0.2em] text-pink-muted">
            Meet Caitlyne
          </div>
          <h1 className="m-0 font-grotesk text-[clamp(48px,11vw,128px)] font-bold uppercase leading-[0.84] tracking-[-0.04em]">
            Hi, I&rsquo;m
            <br />
            Caitlyne
          </h1>
          <p className="mt-[34px] max-w-[480px] font-grotesk text-[19px] leading-[1.55] text-[#5a5247]">
            A somatic breathwork facilitator, movement practitioner, writer, and
            intuitive guide based in Seattle.
          </p>
        </div>
        <div className="hatch flex min-h-[560px] items-end border-ink p-[22px] md:border-l">
          <span className="font-mono text-xs text-[#a99e88]">
            portrait — caitlyne
          </span>
        </div>
      </section>

      {/* Story */}
      <section className="border-b border-ink px-6 py-[90px] md:px-11">
        <div className="mx-auto max-w-[760px]">
          <p className="mb-10 font-grotesk text-[30px] font-medium leading-[1.4] tracking-[-0.01em]">
            Life is messy and being human is hard. Unlearning, discarding,
            rewiring — it&rsquo;s not always pretty. In my lineage, we call it
            slaying dragons. And I know that territory. I&rsquo;ve been there.
          </p>
          <p className="mb-6 font-grotesk text-lg leading-[1.75] text-[#4a443c]">
            That&rsquo;s what brought me here.
          </p>
          <p className="mb-6 font-grotesk text-lg leading-[1.75] text-[#4a443c]">
            What began in 2009 as a personal relationship to movement became
            something I couldn&rsquo;t unfind. The body kept telling the truth
            even when I wasn&rsquo;t ready to hear it. Eventually I stopped
            arguing with it.
          </p>
          <p className="m-0 font-grotesk text-lg leading-[1.75] text-[#4a443c]">
            I&rsquo;ve learned the price you pay for ignoring your body&rsquo;s
            intelligence is very expensive. I work with people who are done
            outsourcing their healing, who want to become their own teacher. Who
            are ready to build safety from the inside out, not because someone
            told them to, but because they&rsquo;re finally listening.
          </p>
        </div>
      </section>

      {/* Pink pull quote */}
      <section className="border-b border-ink bg-pink px-6 py-[100px] text-center text-[#3a2a2b] md:px-11">
        <p className="m-0 font-grotesk text-[clamp(40px,9vw,72px)] font-bold uppercase leading-none tracking-[-0.03em]">
          How free do you
          <br />
          wanna be?
        </p>
        <p className="mx-auto mt-[34px] max-w-[600px] font-grotesk text-lg leading-[1.6] text-[#4a2e2f]">
          Breathwork is a simple, powerful meditative tool for coming home to
          yourself — quieting the noise, moving stuck emotions, and rebuilding
          safety in the body.
        </p>
      </section>

      {/* Timeline */}
      <section className="grid grid-cols-1 border-b border-ink md:grid-cols-3">
        {TIMELINE.map((t, i) => (
          <div
            key={t.year}
            className={`px-9 py-[54px] ${
              i < 2 ? "border-b border-ink md:border-b-0 md:border-r" : ""
            }`}
          >
            <div className="font-mono text-[40px] font-bold text-pink-deep">
              {t.year}
            </div>
            <p className="mt-4 font-grotesk text-base leading-[1.6] text-[#5a5247]">
              {t.body}
            </p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="border-b border-ink px-6 py-20 text-center md:px-11">
        <h2 className="mb-7 font-grotesk text-[clamp(36px,6vw,56px)] font-bold uppercase leading-[0.98] tracking-[-0.02em]">
          Come breathe with me
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/live-stream">Join Live Stream</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/offerings">See offerings</Link>
          </Button>
        </div>
      </section>

      <SiteFooterCompact />
    </main>
  );
}
