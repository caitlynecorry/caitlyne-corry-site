import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooterFull } from "@/components/site-footer";
import { Button } from "@/components/ui/button";

const OFFERINGS = [
  {
    no: "01 / Breathwork",
    title: "Breathwork in Motion",
    sub: "Private · Couples · Group · Virtual",
    image: null,
  },
  {
    no: "02 / Nervous System",
    title: "Nervous System Support",
    sub: "Education · Toolkits · Workshops",
    image: null,
  },
  {
    no: "03 / Play",
    title: "Make Space For Play",
    sub: "How to cultivate playfulness",
    image: null,
  },
  {
    no: "04 / Integration",
    title: "Integration",
    sub: "The work after the work",
    image: null,
  },
];

const WORK = [
  {
    no: "(01)",
    title: "Body",
    body: "You can't access the story until you're in the body. We begin here — with sensation, with presence, with the intelligence that's been there all along.",
  },
  {
    no: "(02)",
    title: "Story",
    body: "Once the body is safe, the story becomes available. Not to relive — to reclaim. To hold differently. To stop being held by.",
  },
  {
    no: "(03)",
    title: "Breath",
    body: "The breath was always yours. This work returns it to you. Not as a technique, but as a homecoming.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-cream text-ink">
      <SiteHeader />

      {/* Hero */}
      <section className="border-b border-ink px-5 pb-[60px] pt-[54px] md:px-10">
        <h1 className="m-0 font-grotesk text-[clamp(56px,14vw,188px)] font-bold uppercase leading-[0.82] tracking-[-0.045em]">
          I see through the <span className="italic text-pink-deep">story</span>
        </h1>
        <div className="mt-11 flex flex-wrap items-end justify-between gap-10">
          <div className="max-w-[520px]">
            <p className="mb-6 font-grotesk text-xl leading-[1.5] text-[#4a443c]">
              Hi, I&rsquo;m Caitlyne — a writer, somatic breathwork facilitator,
              and intuitive guide.
            </p>
            <div className="flex gap-3">
              <Button asChild>
                <Link href="/live-stream">Join Live Stream</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/live-stream">Book a 1:1</Link>
              </Button>
            </div>
          </div>
          <span className="font-mono text-xs tracking-[0.12em] text-[#8a8074]">
            ↓ Scroll to breathe
          </span>
        </div>
      </section>

      {/* Offerings grid */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        {OFFERINGS.map((o, i) => (
          <Link
            key={o.title}
            href="/offerings"
            className={`group border-b border-ink transition-colors hover:bg-sand-2 ${
              i % 2 === 0 ? "md:border-r" : ""
            }`}
          >
            {o.image ? (
              <div
                className="h-[320px] border-b border-ink bg-sand bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${o.image}')` }}
              />
            ) : null}
            <div className="px-10 py-[34px]">
              <div className="mb-5 flex justify-between font-mono text-xs text-[#8a8074]">
                <span>{o.no}</span>
                <span className="inline-block transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </div>
              <h3 className="mb-2 font-grotesk text-[38px] font-semibold leading-[1.02]">
                {o.title}
              </h3>
              <p className="m-0 font-grotesk text-[15px] text-[#5a5247]">
                {o.sub}
              </p>
            </div>
          </Link>
        ))}
      </section>

      {/* Soft-pink statement band */}
      <section className="border-b border-ink bg-pink px-6 py-24 text-[#3a2a2b] md:px-11">
        <p className="m-0 max-w-[1080px] font-grotesk text-[clamp(30px,4.4vw,52px)] font-semibold leading-[1.12] tracking-[-0.02em]">
          I work with people who want safety from the inside out &mdash; they
          are ready to see through the story and listen to what their body
          already knows.
        </p>
      </section>

      {/* About preview */}
      <section className="grid grid-cols-1 border-b border-ink md:grid-cols-2">
        <div className="min-h-[500px] border-ink md:border-r">
          <img
            src="/media/caitlyne-portrait.jpg"
            alt="Caitlyne in a forward fold with arms outstretched on a studio floor"
            className="h-full min-h-[500px] w-full object-cover"
          />
        </div>
        <div className="px-6 py-16 md:px-11">
          <div className="mb-6 font-mono text-xs uppercase tracking-[0.16em] text-pink-muted">
            Meet Caitlyne
          </div>
          <p className="mb-6 font-grotesk text-[27px] font-medium leading-[1.35] tracking-[-0.01em]">
            Life is messy and being human is hard. In my lineage, we call it
            slaying dragons. And I know that territory — I&rsquo;ve been there.
          </p>
          <p className="mb-[30px] font-grotesk text-base leading-[1.7] text-[#5a5247]">
            What began in 2009 as a personal relationship to movement became
            something I couldn&rsquo;t unfind. I&rsquo;m not here to fix you —
            I&rsquo;m here to help you hear yourself.
          </p>
          <Link
            href="/about"
            className="border-b-2 border-pink-deep pb-[3px] font-grotesk text-sm font-semibold"
          >
            Read my story →
          </Link>
        </div>
      </section>

      {/* The Work */}
      <section className="grid grid-cols-1 border-b border-ink md:grid-cols-3">
        {WORK.map((w, i) => (
          <div
            key={w.title}
            className={`px-9 py-[54px] ${
              i < 2 ? "border-b border-ink md:border-b-0 md:border-r" : ""
            }`}
          >
            <span className="font-mono text-xs text-[#8a8074]">{w.no}</span>
            <h3 className="mb-3.5 mt-[18px] font-grotesk text-[48px] font-bold uppercase">
              {w.title}
            </h3>
            <p className="m-0 font-grotesk text-[15px] leading-[1.65] text-[#5a5247]">
              {w.body}
            </p>
          </div>
        ))}
      </section>

      {/* Live stream CTA */}
      <section className="grid grid-cols-1 border-b border-ink md:grid-cols-[1.4fr_1fr]">
        <div className="px-6 py-20 md:px-11">
          <div className="mb-[22px] font-mono text-xs uppercase tracking-[0.16em] text-pink-muted">
            Weekly · Donation-based
          </div>
          <h2 className="mb-[22px] font-grotesk text-[clamp(40px,7vw,64px)] font-bold uppercase leading-[0.96] tracking-[-0.03em]">
            Breathe with us, live
          </h2>
          <p className="mb-[30px] max-w-[520px] font-grotesk text-[17px] leading-[1.6] text-[#5a5247]">
            Every Thursday at 8PM PST, we gather on Zoom for a guided breathwork
            journey. Come as you are. Give what you can.
          </p>
          <Button asChild>
            <Link href="/live-stream">Reserve your spot →</Link>
          </Button>
        </div>
        <div className="flex flex-col justify-center border-ink bg-pink px-6 py-20 md:border-l md:px-11">
          <div className="font-mono text-[64px] font-bold leading-none text-[#3a2a2b]">
            8:00
          </div>
          <div className="mt-2 font-mono text-sm tracking-[0.12em] text-[#3a2a2b]">
            PM PST — THURSDAYS
          </div>
          <div className="my-7 h-px bg-ink opacity-30" />
          <div className="font-grotesk text-[15px] text-[#3a2a2b]">
            Live on Zoom · 60 minutes · All levels welcome
          </div>
        </div>
      </section>

      <SiteFooterFull />
    </main>
  );
}
