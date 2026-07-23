import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooterFull } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { BreathworkNotice } from "@/components/breathwork-notice";

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
    no: "03 / Meditation",
    title: "Form Follows Silence",
    sub: "A somatics-based guided meditation",
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

const EVENT_DETAILS: [string, string][] = [
  ["Where", "Cedarhouse Flowers — 1901 N 45th St, Seattle, WA 98103"],
  ["When", "Saturday, July 25, 2026 · 6:00–7:30 PM"],
  ["Spots", "Limited to 8"],
  ["Price", "$40 per person"],
  ["Bring", "A water bottle. The rest is provided."],
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-cream text-ink">
      <SiteHeader />

      {/* ───────────────────────── Hero ───────────────────────── */}
      <section
        id="top"
        className="relative isolate overflow-hidden border-b border-ink"
      >
        {/* Atmospheric photograph */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/media/hero-reach.jpeg"
            alt="Caitlyne in a deep forward fold on a studio mat, arms outstretched with open hands reaching forward"
            className="h-full w-full object-cover object-[center_38%] opacity-[0.72] grayscale contrast-[1.16] brightness-[1.02]"
          />
          {/* Cream wash keeps the type as the focal point */}
          <div className="absolute inset-0 bg-gradient-to-b from-cream/75 via-cream/30 to-cream/60" />
          {/* Soft film grain */}
          <div className="grain absolute inset-0 opacity-[0.28] mix-blend-multiply" />
        </div>

        <div className="flex min-h-[82vh] flex-col justify-between px-5 pt-10 pb-9 md:px-10 md:pt-14 md:pb-12">
          {/* Top block — headline + intro read as one unit */}
          <div>
            <h1 className="m-0 max-w-[15ch] font-grotesk text-[clamp(56px,14vw,188px)] font-bold uppercase leading-[0.82] tracking-[-0.045em]">
              Form follows <span className="italic text-pink-deep">silence</span>
            </h1>
            <p className="mt-7 max-w-[520px] font-grotesk text-xl leading-[1.5] text-[#4a443c] md:mt-9">
              Hi, I&rsquo;m Caitlyne — a writer, somatic breathwork facilitator,
              and intuitive guide.
            </p>
          </div>

          {/* Bottom block — CTAs sit lower, scroll cue anchored at the base */}
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <div className="flex gap-3">
              <Button asChild>
                <Link href="#virtual-breathwork">Join Live Stream</Link>
              </Button>
              <Button asChild variant="outline">
                <a
                  href="https://app.acuityscheduling.com/schedule/bc35c44e"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a 1:1
                </a>
              </Button>
            </div>
            <a
              href="#about"
              className="font-mono text-xs tracking-[0.12em] text-[#8a8074] transition-colors hover:text-pink-muted"
            >
              ↓ Scroll to breathe
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────── About Caitlyne ─────────────────────── */}
      <section
        id="about"
        className="grid scroll-mt-24 grid-cols-1 border-b border-ink md:grid-cols-2"
      >
        <div className="min-h-[500px] border-ink md:border-r">
          <img
            src="/media/caitlyne-about.jpg"
            alt="Caitlyne holding a handstand on a studio floor against a paneled wall"
            className="h-full min-h-[500px] w-full object-cover object-top"
          />
        </div>
        <div className="px-6 py-16 md:px-11">
          <div className="mb-6 font-mono text-xs uppercase tracking-[0.16em] text-pink-muted">
            Meet Caitlyne
          </div>
          <p className="mb-6 font-grotesk text-[27px] font-medium leading-[1.35] tracking-[-0.01em]">
            Life is messy and being human is hard, and marvelous, sacred, wild,
            infinite, and holy.
          </p>
          <p className="mb-[30px] font-grotesk text-base leading-[1.7] text-[#5a5247]">
            Unlearning, grieving, rewiring, starting over — none of it is
            particularly graceful. In my lineage, we call it slaying dragons. And
            I know that territory. I&rsquo;ve lived there. What began in 2009 as a
            personal relationship to movement became something I couldn&rsquo;t
            unfind. I&rsquo;m not here to fix you — I&rsquo;m here to witness you.
          </p>
          <Link
            href="/about"
            className="border-b-2 border-pink-deep pb-[3px] font-grotesk text-sm font-semibold"
          >
            Read my story →
          </Link>
        </div>
      </section>

      {/* Soft-pink statement band — transition into the work */}
      <section className="border-b border-ink bg-pink px-6 py-24 text-[#3a2a2b] md:px-11">
        <p className="m-0 max-w-[1080px] font-grotesk text-[clamp(30px,4.4vw,52px)] font-semibold leading-[1.12] tracking-[-0.02em]">
          I work with people who show up to do the work. If you&rsquo;re ready to
          see through the story and listen to what your body already knows,
          let&rsquo;s have that conversation.
        </p>
      </section>

      {/* ─────────────────────── What Is the Work? ─────────────────────── */}
      <section id="the-work" className="scroll-mt-24 border-b border-ink">
        <div className="px-6 pb-4 pt-16 md:px-11">
          <div className="mb-6 font-mono text-xs uppercase tracking-[0.16em] text-pink-muted">
            What is the work?
          </div>
          <p className="max-w-[720px] font-grotesk text-[clamp(24px,3.4vw,34px)] font-medium leading-[1.35] tracking-[-0.01em]">
            This work moves in a sequence. We don&rsquo;t start with the story —
            we start with the body. Safety first, then truth, then the breath
            that was always yours.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
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
        </div>
        <div className="border-t border-ink px-6 py-8 md:px-11">
          <Link
            href="/the-work"
            className="border-b-2 border-pink-deep pb-[3px] font-grotesk text-sm font-semibold"
          >
            Explore the work →
          </Link>
        </div>
      </section>

      {/* ─────────────────── Current Events & Workshops ─────────────────── */}
      <section id="events" className="scroll-mt-24 border-b border-ink">
        <div className="px-6 pb-2 pt-16 md:px-11">
          <div className="mb-2 font-mono text-xs uppercase tracking-[0.16em] text-pink-muted">
            Current events &amp; workshops
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div
            className="min-h-[360px] border-t border-ink bg-sand bg-cover bg-center bg-no-repeat md:min-h-[560px] md:border-r"
            style={{ backgroundImage: "url('/media/cedarhouse-flowers.png')" }}
            role="img"
            aria-label="Loose seasonal cut flowers resting on a table in a flower studio"
          />
          <div className="flex flex-col justify-center border-t border-ink px-6 py-16 md:px-11">
            <div className="mb-[18px] font-mono text-[13px] uppercase tracking-[0.14em] text-pink-muted">
              Upcoming Event · Cedarhouse Flowers
            </div>
            <h2 className="mb-3 font-grotesk text-[clamp(40px,6vw,56px)] font-semibold leading-[0.98]">
              Turn Me Into a Flower
            </h2>
            <p className="mb-6 max-w-[460px] font-grotesk text-[17px] italic leading-[1.6] text-[#5a5247]">
              An evening of breath, surrender, and bloom — hosted among the
              flowers at Cedarhouse.
            </p>
            <p className="mb-7 max-w-[460px] font-grotesk text-base leading-[1.7] text-[#5a5247]">
              This is an evening to slow down and return to yourself. Through
              guided breathwork, together we&rsquo;ll soften what has been held
              too tightly, release what no longer fits, and make space for
              whatever is waiting to bloom. No breathwork experience necessary —
              just come as you are.
            </p>
            <dl className="mb-8 max-w-[460px] border-t border-ink/15 font-grotesk text-[14.5px] leading-[1.6] text-ink">
              {EVENT_DETAILS.map(([label, value]) => (
                <div
                  key={label}
                  className="flex gap-4 border-b border-ink/15 py-3"
                >
                  <dt className="w-[64px] shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-pink-muted">
                    {label}
                  </dt>
                  <dd className="m-0 text-[#3a352c]">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap items-center gap-6">
              <Button asChild>
                <a
                  href="https://app.acuityscheduling.com/schedule.php?owner=39688174&appointmentType=95243724"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Reserve your spot →
                </a>
              </Button>
              <Link
                href="/events"
                className="border-b-2 border-pink-deep pb-[3px] font-grotesk text-sm font-semibold"
              >
                See all events →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Scheduling / Ways to Work Together ───────────── */}
      <section id="offerings" className="scroll-mt-24 border-b border-ink">
        <div className="px-6 pb-2 pt-16 md:px-11">
          <div className="mb-6 font-mono text-xs uppercase tracking-[0.16em] text-pink-muted">
            Ways to work together
          </div>
          <p className="mb-2 max-w-[720px] font-grotesk text-[clamp(24px,3.4vw,34px)] font-medium leading-[1.35] tracking-[-0.01em]">
            Breathwork is a simple, powerful meditative tool for coming home to
            yourself — quieting the noise, moving stuck emotions, and rebuilding
            safety in the body.
          </p>
        </div>
        <div className="grid grid-cols-1 border-t border-ink md:grid-cols-2">
          {OFFERINGS.map((o, i) => (
            <Link
              key={o.title}
              href="/offerings"
              className={`group border-b border-ink transition-colors hover:bg-sand-2 ${
                i % 2 === 0 ? "md:border-r" : ""
              } ${i >= OFFERINGS.length - 2 ? "md:border-b-0" : ""}`}
            >
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
        </div>
      </section>

      {/* ─────────────────────── Virtual Breathwork ─────────────────────── */}
      <section
        id="virtual-breathwork"
        className="grid scroll-mt-24 grid-cols-1 border-b border-ink md:grid-cols-[1.4fr_1fr]"
      >
        <div className="px-6 py-20 md:px-11">
          <div className="mb-[22px] font-mono text-xs uppercase tracking-[0.16em] text-pink-muted">
            Weekly · Donation-based · Virtual
          </div>
          <h2 className="mb-[22px] font-grotesk text-[clamp(40px,7vw,64px)] font-bold uppercase leading-[0.96] tracking-[-0.03em]">
            Breathe with us, live
          </h2>
          <p className="mb-8 max-w-[520px] font-grotesk text-[17px] leading-[1.6] text-[#5a5247]">
            Every Wednesday at 8:00 PM PT, we gather on Zoom for a guided
            breathwork journey. Come as you are. Give what you can.
          </p>
          <BreathworkNotice />
        </div>
        <div className="flex flex-col justify-center border-ink bg-pink px-6 py-20 md:border-l md:px-11">
          <div className="font-mono text-[64px] font-bold leading-none text-[#3a2a2b]">
            8:00
          </div>
          <div className="mt-2 font-mono text-sm tracking-[0.12em] text-[#3a2a2b]">
            PM PT — WEDNESDAYS
          </div>
          <div className="my-7 h-px bg-ink opacity-30" />
          <div className="font-grotesk text-[15px] leading-[1.6] text-[#3a2a2b]">
            Returns August 5, 2026 · Live on Zoom · 60 minutes. No classes this
            week or next week.
          </div>
        </div>
      </section>

      {/* ─────────────────── Contact / Book a Session ─────────────────── */}
      <section
        id="contact"
        className="scroll-mt-24 border-b border-ink px-6 py-24 text-center md:px-11"
      >
        <div className="mb-6 font-mono text-xs uppercase tracking-[0.16em] text-pink-muted">
          Contact · Book a session
        </div>
        <h2 className="mb-7 font-grotesk text-[clamp(36px,6vw,56px)] font-bold uppercase leading-[0.98] tracking-[-0.02em]">
          Come breathe with me
        </h2>
        <p className="mx-auto mb-9 max-w-[560px] font-grotesk text-lg leading-[1.6] text-[#5a5247]">
          Questions about sessions, workshops, or working together? Send a note —
          I read every one.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild>
            <a
              href="https://app.acuityscheduling.com/schedule/bc35c44e"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a 1:1
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Say hello →</Link>
          </Button>
        </div>
      </section>

      <SiteFooterFull />
    </main>
  );
}
