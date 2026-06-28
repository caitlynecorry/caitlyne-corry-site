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
    body: "A deeper curiosity for body & breath formed.",
  },
  {
    year: "Now",
    body: "Offering private sessions, couples work, and group experiences — including community breathwork gatherings every Thursday on Zoom.",
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
            A writer, somatic breathwork facilitator, and intuitive guide based
            in Seattle.
          </p>
        </div>
        <div className="min-h-[560px] border-ink md:border-l">
          <img
            src="/media/caitlyne-meet.jpg"
            alt="Caitlyne reclining across a wooden bench beneath a window, smiling"
            className="h-full min-h-[560px] w-full object-cover"
          />
        </div>
      </section>

      {/* Story */}
      <section className="border-b border-ink px-6 py-[90px] md:px-11">
        <div className="mx-auto max-w-[760px]">
          <p className="mb-10 font-grotesk text-[30px] font-medium leading-[1.4] tracking-[-0.01em]">
            My story is part of the work. From survival to self-trust. From
            numbing to feeling. From performing to being. My deepest pains have
            become my greatest assets. It&rsquo;s all shaped how I hold space,
            how I listen, and how I walk alongside you.
          </p>
          <p className="mb-6 font-grotesk text-lg leading-[1.75] text-[#4a443c]">
            For a long time, my body was something I carried around with me
            rather than somewhere I lived. Like a lot of people, I learned how to
            override myself. Push through exhaustion. Explain away anxiety. Stay
            when I should have left. Leave when I should have stayed. Call
            survival intuition and intuition survival.
          </p>
          <p className="mb-6 font-grotesk text-lg leading-[1.75] text-[#4a443c]">
            My body knew the difference long before I did. What began in 2009 as
            a relationship with movement, the body kept telling the truth even
            when I wasn&rsquo;t ready to hear it. Eventually, I stopped arguing
            with it.
          </p>
          <p className="mb-6 font-grotesk text-lg leading-[1.75] text-[#4a443c]">
            Breath became a doorway back to myself. Not to a better version of
            me. Not to some enlightened, healed, untouchable version of being
            human. Just back to myself.
          </p>
          <p className="mb-6 font-grotesk text-lg leading-[1.75] text-[#4a443c]">
            I&rsquo;ve learned that the cost of abandoning your body is expensive.
            It can look like burnout, anxiety, addiction, grief, chronic
            striving, relationships that ask you to betray yourself, or a life
            that no longer fits the person you&rsquo;ve become.
          </p>
          <p className="mb-6 font-grotesk text-lg leading-[1.75] text-[#4a443c]">
            The body usually knows long before the mind catches up.
          </p>
          <p className="mb-6 font-grotesk text-lg leading-[1.75] text-[#4a443c]">
            I work with people who show up to do the work. People who are tired
            of outsourcing their authority and ready to become their own teacher.
            People who are willing to see through the story and listen to what
            their body has been trying to say all along.
          </p>
          <p className="m-0 font-grotesk text-lg leading-[1.75] text-[#4a443c]">
            Because beneath the noise, beneath the fear, beneath the
            conditioning — I&rsquo;ve discovered that the body was often wiser
            than the narratives surrounding it.
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
