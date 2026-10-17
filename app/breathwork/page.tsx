import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooterCompact } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Therapeutic Breathwork & the ABRI Method | Caitlyne Corry",
  description:
    "Therapeutic breathwork in Seattle and online with Caitlyne Corry. The ABRI method: awareness, breath, release, integration.",
  path: "/breathwork",
});

const STAGES = [
  {
    title: "Awareness",
    body: "Noticing first. Your breath, your posture, your pace, what's loud in your system today. A system can't change what it can't feel.",
  },
  {
    title: "Breath",
    body: "The breath leads. Conscious connected breathing, guided and paced to your system, until the thinking mind steps back.",
  },
  {
    title: "Release",
    body: "What's been held begins to move. Heat, shaking, tears, stillness. Nothing has to be forced or explained.",
  },
  {
    title: "Integration",
    body: "Building capacity. The system learns to hold more sensation, more charge, more of your own life, without reverting to the old pattern.",
  },
];

const SESSION_STEPS = [
  {
    no: "01",
    title: "Arrive",
    body: "Awareness begins here. We slow down and take an inner weather report: your breath, your posture, your pace, what's loud in your system today. From there, we set an intention. No experience needed. Willingness is enough.",
  },
  {
    no: "02",
    title: "Breathe",
    body: "Awareness becomes breath. Guided throughout, paced to your system. The thinking mind steps back and the body leads.",
  },
  {
    no: "03",
    title: "Integrate",
    body: "We land slowly and notice what moved. Together we name what's ready to be carried forward. Capacity builds here, in the days after as much as in the room.",
  },
];

const APPROACH_PARAGRAPHS = [
  "My approach to therapeutic breathwork is rooted in developing a deeper relationship with the body through curiosity, awareness, and choice. It is an invitation to explore our patterns of protection, reconnect with sensation, and begin recognizing what safety can feel like within ourselves.",
  "This work is not about forcing an emotional release or moving through a prescribed set of stages. Every experience is different. Sometimes something profound shifts. Other times, the work is simply learning to listen, to notice, and to be present with what arises.",
  "There is no required outcome, only an opportunity to explore what becomes possible when we approach the body with curiosity rather than expectation.",
];

const TRAUMA_INTRO = [
  "This work is deeply human.",
  "It is the practice of using breath, sensation, and awareness to reconnect with the body beneath the story.",
  ];

const TRAUMA_PARAGRAPHS = [
  "Trauma isn't just about what happened to us. It's also about how those experiences can continue to show up in our bodies, our nervous systems, and the ways we move through the world.",
  "Modern neuroscience tells us that experiences are not stored only as memories or thoughts, but as patterns in the nervous system — in muscle tension, breath patterns, posture, vigilance, shutdown, and stress physiology. The body remembers what the mind has moved on from.",
  "When we experience something overwhelming, our bodies instinctively respond in ways designed to protect us: fight, flight, or freeze. And sometimes, long after the experience has passed, those protective patterns remain.",
  "We can intellectually understand what happened to us and still find ourselves reacting in ways we don't fully understand. Clenching the steering wheel. Holding our breath. Feeling unsafe when there is no immediate danger.",
  "Therapeutic breathwork creates an opportunity to move beyond intellectual understanding and explore what is happening beneath the surface. Through active breathing, somatic awareness, and intentional integration, we work with the nervous system and the patterns of protection it has developed over time.",
  "This work is not about fixing you. It is about helping your body discover what safety feels like.",
  "In a world that asks us to think our way through everything, this work invites us to listen to physiology, trust sensation, and be curious enough to adapt.",
  "Because sometimes healing doesn't happen through understanding the story.",
  "Sometimes it happens when the body finally realizes the story is over.",
  ];

const LABEL =
  "mb-6 font-mono text-xs uppercase tracking-[0.16em] text-pink-muted";
const BODY = "font-grotesk text-[17px] leading-[1.8] text-[#5a5247]";

export default function BreathworkPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-cream text-ink">
      <SiteHeader active="/breathwork" />

      {/* The Work */}
      <section className="border-b border-ink px-4 pb-20 pt-[70px] md:px-11">
  <h1 className="m-0 font-grotesk text-[clamp(64px,14vw,158px)] font-bold uppercase leading-[0.82] tracking-[-0.045em]">
  THE METHOD.
  </h1>
        <p className="mt-10 max-w-[640px] text-pretty font-grotesk text-[clamp(20px,2.2vw,24px)] font-semibold italic leading-[1.45] tracking-[-0.01em] text-pink-deep">
          The breath is the practice. Awareness is the invitation. Release is a
          possibility. Integration is where the work continues.
        </p>
        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
          {STAGES.map((stage) => (
            <div key={stage.title} className="border-t-2 border-ink pt-[22px]">
              <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-ink">
                {stage.title}
              </h2>
              <p className="m-0 font-grotesk text-[15px] leading-[1.7] text-[#5a5247]">
                {stage.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Breathwork */}
      <section className="border-b border-ink px-4 py-20 md:px-11">
        <div className={LABEL}>Breathwork</div>
        <h2 className="mb-8 max-w-[820px] text-balance font-grotesk text-[clamp(36px,6vw,64px)] font-bold leading-[1.02] tracking-[-0.02em]">
          Conscious connected breathing
        </h2>
        <p className={`m-0 max-w-[720px] ${BODY}`}>
          {"A continuous breath, no pause between inhale and exhale, sustained over time. It's simple, and it isn't gentle. The pattern shifts your state quickly, out of analysis and into sensation. Some sessions are quiet and tender. Others open into expansive, dreamlike, even psychedelic states, where old beliefs loosen and something new becomes possible."}
        </p>
        <div className="mt-6 flex max-w-[720px] flex-col gap-6">
          {APPROACH_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className={`m-0 ${BODY}`}>
              {paragraph}
            </p>
          ))}
        </div>
        <p className="mt-6 font-grotesk text-[17px] font-semibold italic text-pink-deep">
          In person in Seattle, and online.
        </p>

        <h3 className="mb-10 mt-20 font-grotesk text-[26px] font-semibold">
          What a session feels like
        </h3>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {SESSION_STEPS.map((step) => (
            <div key={step.title} className="border-t-2 border-ink pt-[22px]">
              <div className="mb-2 font-mono text-[13px] text-[#8a8074]">
                {step.no}
              </div>
              <h4 className="mb-3 font-grotesk text-[26px] font-semibold">
                {step.title}
              </h4>
              <p className="m-0 font-grotesk text-[15px] leading-[1.7] text-[#5a5247]">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Breath & trauma */}
      <section className="border-b border-ink px-4 py-20 md:px-11">
        <div className={LABEL}>Breath &amp; trauma</div>
        <div className="mb-12 flex max-w-[720px] flex-col gap-6">
          {TRAUMA_INTRO.map((paragraph, index) => (
            <p
              key={paragraph.slice(0, 24)}
              className={`m-0 ${BODY} ${index === 0 ? "font-bold" : ""}`}
            >
              {paragraph}
            </p>
          ))}
        </div>
        <h2 className="mb-10 text-balance font-grotesk text-[clamp(36px,6vw,64px)] font-bold leading-[1.02] tracking-[-0.02em]">
          {"Let's talk about trauma."}
        </h2>
        <div className="flex max-w-[720px] flex-col gap-6">
          {TRAUMA_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className={`m-0 ${BODY}`}>
              {paragraph}
            </p>
          ))}
          <p className="m-0 mt-4 text-pretty font-grotesk text-[clamp(22px,2.6vw,28px)] font-semibold italic leading-[1.35] tracking-[-0.01em] text-pink-deep">
            Because understanding our trauma is one thing. Learning how to be
            and feel safe in our bodies is another.
          </p>
          <p className="m-0 mt-4 font-grotesk text-sm italic leading-relaxed text-[#8a8074]">
            {"This work complements therapy and isn't a replacement for it. If you're in active treatment, I'm glad to work alongside your provider."}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-ink bg-pink px-4 py-[90px] text-center text-[#3a2a2b] md:px-11">
        <h2 className="mb-8 font-grotesk text-[clamp(36px,6vw,56px)] font-bold uppercase leading-[1.02] tracking-[-0.02em]">
          Come breathe with me
        </h2>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
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
            <Link href="/events">Upcoming events</Link>
          </Button>
        </div>
      </section>

      <SiteFooterCompact />
    </main>
  );
}
