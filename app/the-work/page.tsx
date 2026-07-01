import { SiteHeader } from "@/components/site-header";
import { SiteFooterCompact } from "@/components/site-footer";
import { Button } from "@/components/ui/button";

const STAGES = [
  {
    no: "(01)",
    title: "Body",
    body: "You can't access the story until you're in the body. We begin here — with sensation, with presence, with the intelligence that's been there all along.",
    bg: "bg-sand-2",
    titleColor: "",
    numColor: "text-[#8a8074]",
  },
  {
    no: "(02)",
    title: "Story",
    body: "Once the body is safe, the story becomes available. Not to relive — to reclaim. To hold differently. To stop being held by.",
    bg: "bg-sand-2",
    titleColor: "",
    numColor: "text-[#8a8074]",
  },
  {
    no: "(03)",
    title: "Breath",
    body: "The breath was always yours. This work returns it to you. Not as a technique, but as a homecoming.",
    bg: "bg-pink",
    titleColor: "text-[#3a2a2b]",
    numColor: "text-[#5a3a3b]",
  },
];

const EXPECT = [
  {
    title: "Arrive",
    body: "We settle in, slow down, and set an intention. No experience needed — just willingness.",
  },
  {
    title: "Breathe",
    body: "Guided active breathwork moves stuck energy and quiets the thinking mind. The body leads.",
  },
  {
    title: "Integrate",
    body: "We land gently, reflect, and name what's ready to be carried forward into your life.",
  },
];

export default function TheWorkPage() {
  return (
    <main className="min-h-screen bg-cream text-ink">
      <SiteHeader active="/the-work" />

      {/* Header */}
      <section className="border-b border-ink px-5 pb-14 pt-[70px] md:px-10">
        <div className="mb-[26px] font-mono text-xs uppercase tracking-[0.2em] text-pink-muted">
          The method — body, story, breath
        </div>
        <h1 className="m-0 font-grotesk text-[clamp(54px,13vw,158px)] font-bold uppercase leading-[0.82] tracking-[-0.045em]">
          The
          <br />
          Work.
        </h1>
        <p className="mt-10 max-w-[600px] font-grotesk text-[19px] leading-[1.55] text-[#5a5247]">
          This work moves in a sequence. We don&rsquo;t start with the story — we
          start with the body. Safety first, then truth, then the breath that was
          always yours.
        </p>
      </section>

      {/* Stages */}
      {STAGES.map((s) => (
        <section
          key={s.title}
          className="grid grid-cols-1 border-b border-ink md:grid-cols-[0.6fr_1.4fr]"
        >
          <div className={`border-ink px-6 py-16 md:border-r md:px-11 ${s.bg}`}>
            <div className={`font-mono text-[13px] ${s.numColor}`}>{s.no}</div>
            <h2
              className={`mt-3.5 font-grotesk text-[84px] font-bold uppercase leading-[0.9] ${s.titleColor}`}
            >
              {s.title}
            </h2>
          </div>
          <div className="flex items-center px-6 py-16 md:px-11">
            <p className="m-0 max-w-[680px] font-grotesk text-2xl leading-[1.55] text-[#3a352d]">
              {s.body}
            </p>
          </div>
        </section>
      ))}

      {/* What to expect */}
      <section className="border-b border-ink px-6 py-20 md:px-11">
        <div className="mb-10 font-mono text-xs uppercase tracking-[0.16em] text-pink-muted">
          What a session feels like
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {EXPECT.map((e) => (
            <div key={e.title} className="border-t-2 border-ink pt-[22px]">
              <h3 className="mb-3 font-grotesk text-[26px] font-semibold">
                {e.title}
              </h3>
              <p className="m-0 font-grotesk text-[15px] leading-[1.7] text-[#5a5247]">
                {e.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-ink bg-pink px-6 py-[90px] text-center text-[#3a2a2b] md:px-11">
        <p className="mb-7 font-grotesk text-[clamp(36px,6vw,56px)] font-bold uppercase leading-[1.02] tracking-[-0.02em]">
          Ready to begin?
        </p>
        <Button asChild>
          <a
            href="https://app.acuityscheduling.com/schedule/bc35c44e"
            target="_blank"
            rel="noopener noreferrer"
          >
            YES! →
          </a>
        </Button>
      </section>

      <SiteFooterCompact />
    </main>
  );
}
