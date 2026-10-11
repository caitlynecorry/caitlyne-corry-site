import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooterCompact } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { BOOKING_URL, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Online Breathwork Sessions | Caitlyne Corry",
  description:
    "Private 1:1 virtual breathwork with Caitlyne Corry, plus a 15-minute meet & greet call. Weekly donation-based Zoom breathwork is coming soon.",
  path: "/online-breathwork",
});

const SESSIONS = [
  {
    label: "Start here · 15 minutes",
    title: "Meet & Greet",
    body: "A short consultation call to see if we\u2019re in alignment before you book a session.",
    status: "Available now",
  },
  {
    label: "Private · 75 minutes",
    title: "1:1 Virtual Breathwork",
    body: "An intimate solo session catered to your specific needs. What is your body asking to be heard, released, or witnessed right now?",
    status: "Available now",
  },
  {
    label: "Group · Donation-based",
    title: "Weekly Zoom breathwork",
    body: "A guided group journey, live on Zoom. 60 minutes, no experience needed. Give what you can.",
    status: "Coming soon",
  },
];

export default function OnlineBreathworkPage() {
  return (
    <main className="min-h-screen bg-cream text-ink">
      <SiteHeader />

      <section className="grid grid-cols-1 border-b border-ink md:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col justify-center px-6 py-[72px] md:px-11">
          <div className="mb-[26px] font-mono text-xs uppercase tracking-[0.2em] text-pink-muted">
            Online · Virtual
          </div>
          <h1 className="m-0 font-grotesk text-[clamp(48px,11vw,128px)] font-bold uppercase leading-[0.84] tracking-[-0.04em]">
            Online
            <br />
            Breathwork
          </h1>
          <p className="mt-[34px] max-w-[480px] font-grotesk text-[19px] leading-[1.55] text-[#5a5247]">
            Private therapeutic breathwork from your own space, with the same
            structure and pacing as in-person work: awareness, breath, release,
            and integration.
          </p>
        </div>
        <div className="min-h-[420px] border-t border-ink md:min-h-[560px] md:border-l md:border-t-0">
          <img
            src="/media/caitlyne-portrait.jpg"
            alt="Caitlyne resting in a child's pose on a mat, arms extended toward the camera with open palms"
            className="h-full min-h-[420px] w-full object-cover grayscale md:min-h-[560px]"
          />
        </div>
      </section>

      <section className="border-b border-ink">
        <div className="px-6 pb-10 pt-16 md:px-11">
          <div className="mb-6 font-mono text-xs uppercase tracking-[0.16em] text-pink-muted">
            Virtual offerings
          </div>
          <h2 className="m-0 max-w-[720px] font-grotesk text-[clamp(28px,4vw,40px)] font-semibold leading-[1.1] tracking-[-0.01em]">
            Ways to breathe together online
          </h2>
        </div>
        <div className="grid grid-cols-1 border-t border-ink md:grid-cols-3">
          {SESSIONS.map((s, i) => (
            <div
              key={s.title}
              className={`flex flex-col px-6 py-12 md:px-9 ${
                i < SESSIONS.length - 1
                  ? "border-b border-ink md:border-b-0 md:border-r"
                  : ""
              }`}
            >
              <div className="mb-5 font-mono text-xs uppercase tracking-[0.14em] text-[#8a8074]">
                {s.label}
              </div>
              <h3 className="mb-3 font-grotesk text-[28px] font-semibold leading-[1.05]">
                {s.title}
              </h3>
              <p className="mb-6 font-grotesk text-base leading-[1.7] text-[#5a5247]">
                {s.body}
              </p>
              <div className="mt-auto font-mono text-xs uppercase tracking-[0.14em] text-pink-muted">
                {s.status}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-ink px-6 py-20 md:px-11">
        <div className="mb-6 font-mono text-xs uppercase tracking-[0.16em] text-pink-muted">
          How to book
        </div>
        <p className="mb-9 max-w-[640px] font-grotesk text-[clamp(22px,3vw,30px)] font-medium leading-[1.35] tracking-[-0.01em]">
          Sessions are booked through my scheduler. Choose Meet &amp; Greet or
          1:1 Virtual Breathwork, then pick a time that works for you.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Book an online session
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Questions first? →</Link>
          </Button>
        </div>
      </section>

      <section className="border-b border-ink bg-pink px-6 py-[90px] text-center text-[#3a2a2b] md:px-11">
        <p className="mb-[30px] font-grotesk text-[clamp(32px,6vw,52px)] font-bold uppercase leading-[1.05] tracking-[-0.02em]">
          In Seattle?
        </p>
        <p className="mx-auto mb-8 max-w-[520px] font-grotesk text-lg leading-[1.6] text-[#4a2e2f]">
          Join an in-person gathering at Cedarhouse Flowers.
        </p>
        <Button asChild>
          <Link href="/seattle-breathwork">Seattle breathwork →</Link>
        </Button>
      </section>

      <SiteFooterCompact />
    </main>
  );
}
