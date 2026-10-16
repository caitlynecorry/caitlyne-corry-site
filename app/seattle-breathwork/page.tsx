import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooterCompact } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { EventDates } from "@/components/event-dates";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Seattle Breathwork | Caitlyne Corry",
  description:
    "In-person therapeutic breathwork in Seattle: ROOTED gatherings at Cedarhouse Flowers, plus private and group sessions arranged by request.",
  path: "/seattle-breathwork",
});

const IN_PERSON = [
  {
    label: "Private",
    title: "Private sessions in person",
    body: "One-on-one work in Seattle is arranged by request. Email before booking so we can confirm the details together.",
    cta: { label: "Email first →", href: "mailto:caitlynecorry@gmail.com" },
  },
  {
    label: "Groups",
    title: "Small & larger groups",
    body: "Two-hour group sessions for 2–4 or 5–10 people. Email before booking to plan the space and pacing.",
    cta: { label: "Plan a group →", href: "mailto:caitlynecorry@gmail.com" },
  },
  {
    label: "Hosting",
    title: "Bring the work to your space",
    body: "Workshops, retreats, and private gatherings, shaped to fit your community and the moment you\u2019re in.",
    cta: { label: "Inquire →", href: "/contact" },
  },
];

export default function SeattleBreathworkPage() {
  return (
    <main className="min-h-screen bg-cream text-ink">
      <SiteHeader />

      <section className="border-b border-ink px-5 pb-14 pt-[70px] md:px-10">
        <div className="mb-[26px] font-mono text-xs uppercase tracking-[0.2em] text-pink-muted">
          In person · Seattle
        </div>
        <h1 className="m-0 font-grotesk text-[clamp(52px,12vw,148px)] font-bold uppercase leading-[0.84] tracking-[-0.04em]">
          Seattle
          <br />
          Breathwork
        </h1>
        <p className="mt-10 max-w-[600px] font-grotesk text-[19px] leading-[1.55] text-[#5a5247]">
          Therapeutic breathwork in Seattle, in small groups and private
          settings. Conscious connected breathing, somatic tools, and
          integration, paced for safety.
        </p>
      </section>

      <section className="grid grid-cols-1 border-b border-ink md:grid-cols-2">
        <div
          className="min-h-[360px] border-b border-ink bg-sand bg-cover bg-center bg-no-repeat md:min-h-[560px] md:border-b-0 md:border-r"
          style={{ backgroundImage: "url('/media/cedarhouse-flowers.png')" }}
          role="img"
          aria-label="Loose seasonal cut flowers resting on a table in a flower studio"
        />
        <div className="flex flex-col justify-center px-6 py-16 md:px-11">
          <div className="mb-[18px] font-mono text-[13px] uppercase tracking-[0.14em] text-pink-muted">
            ROOTED · Cedarhouse Flowers
          </div>
          <h2 className="mb-6 max-w-[460px] font-grotesk text-[clamp(40px,6vw,56px)] font-semibold leading-[0.98]">
            Upcoming dates
          </h2>
          <EventDates />
          <p className="mt-7 max-w-[560px] text-pretty font-grotesk text-base leading-[1.7] text-[#5a5247]">
            {"Two-hour therapeutic breathwork experience with somatic tools and integration, in an intimate flower-shop setting. Everything included. Limited capacity. Please avoid eating two hours beforehand."}
          </p>
        </div>
      </section>

      <section className="border-b border-ink">
        <div className="px-6 pb-10 pt-16 md:px-11">
          <div className="mb-6 font-mono text-xs uppercase tracking-[0.16em] text-pink-muted">
            Private &amp; group work
          </div>
          <h2 className="m-0 max-w-[720px] font-grotesk text-[clamp(28px,4vw,40px)] font-semibold leading-[1.1] tracking-[-0.01em]">
            In-person sessions, arranged with care
          </h2>
        </div>
        <div className="grid grid-cols-1 border-t border-ink md:grid-cols-3">
          {IN_PERSON.map((item, i) => (
            <div
              key={item.title}
              className={`flex flex-col px-6 py-12 md:px-9 ${
                i < IN_PERSON.length - 1
                  ? "border-b border-ink md:border-b-0 md:border-r"
                  : ""
              }`}
            >
              <div className="mb-5 font-mono text-xs uppercase tracking-[0.14em] text-[#8a8074]">
                {item.label}
              </div>
              <h3 className="mb-3 font-grotesk text-[28px] font-semibold leading-[1.05]">
                {item.title}
              </h3>
              <p className="mb-6 font-grotesk text-base leading-[1.7] text-[#5a5247]">
                {item.body}
              </p>
              <a
                href={item.cta.href}
                className="mt-auto self-start border-b-2 border-pink-deep pb-[3px] font-grotesk text-sm font-semibold"
              >
                {item.cta.label}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-ink bg-pink px-6 py-[90px] text-center text-[#3a2a2b] md:px-11">
        <p className="mb-[30px] font-grotesk text-[clamp(32px,6vw,52px)] font-bold uppercase leading-[1.05] tracking-[-0.02em]">
          Not in Seattle?
        </p>
        <p className="mx-auto mb-8 max-w-[520px] font-grotesk text-lg leading-[1.6] text-[#4a2e2f]">
          Private sessions are also available online.
        </p>
        <Button asChild>
          <Link href="/online-breathwork">Online breathwork →</Link>
        </Button>
      </section>

      <SiteFooterCompact />
    </main>
  );
}
