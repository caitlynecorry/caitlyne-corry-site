import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooterCompact } from "@/components/site-footer";
import { Button } from "@/components/ui/button";

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-cream text-ink">
      <SiteHeader active="/events" />

      <section className="border-b border-ink px-5 pb-14 pt-[70px] md:px-10">
        <div className="mb-[26px] font-mono text-xs uppercase tracking-[0.2em] text-pink-muted">
          Gather in person
        </div>
        <h1 className="m-0 font-grotesk text-[clamp(52px,12vw,148px)] font-bold uppercase leading-[0.84] tracking-[-0.04em]">
          Events
        </h1>
        <p className="mt-10 max-w-[600px] font-grotesk text-[19px] leading-[1.55] text-[#5a5247]">
          Seasonal gatherings for breath, surrender, and coming home to yourself — held in community, in beautiful spaces around Seattle.
        </p>
      </section>

      <section className="border-b border-ink px-6 py-16 md:px-11">
        <div className="mb-[18px] font-mono text-[13px] uppercase tracking-[0.14em] text-pink-muted">
          Cedarhouse Flowers
        </div>
        <h2 className="mb-4 max-w-[620px] font-grotesk text-[clamp(40px,6vw,56px)] font-semibold leading-[0.98]">
          ROOTED: Cedarhouse Breathwork
        </h2>
        <p className="mb-2 max-w-[600px] font-grotesk text-[19px] font-semibold leading-[1.3] text-ink">
          The somatic reset.
        </p>
        <p className="mb-14 max-w-[600px] font-grotesk text-[17px] leading-[1.6] text-[#5a5247]">
          Regular Seattle gatherings utilizing therapeutic breathwork to shift whatever needs shifted. No pressure, no performance — just a local community doing deeply rooted work. Held in an intimate circle limited to 10 at Cedarhouse Flowers. Everything is provided; bring only water and whatever helps you land.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="border border-ink px-7 py-9">
            <div className="mb-3 font-mono text-[13px] uppercase tracking-[0.14em] text-pink-muted">
              October Session
            </div>
            <p className="mb-1 font-grotesk text-[22px] font-semibold leading-[1.2]">
              October 17, 2026
            </p>
            <p className="mb-6 font-grotesk text-[15px] text-[#5a5247]">
              6:00 – 8:00 PM · Cedarhouse Flowers · Limited to 10
            </p>
            <Button asChild variant="outline" className="self-start">
              <a href="https://app.acuityscheduling.com/schedule.php?owner=39688174&amp;appointmentType=98703705" target="_blank" rel="noopener noreferrer">Reserve Your Spot →</a>
            </Button>
          </div>

          <div className="border border-ink px-7 py-9">
            <div className="mb-3 font-mono text-[13px] uppercase tracking-[0.14em] text-pink-muted">
              November Session
            </div>
            <p className="mb-1 font-grotesk text-[22px] font-semibold leading-[1.2]">
              November 21, 2026
            </p>
            <p className="mb-6 font-grotesk text-[15px] text-[#5a5247]">
              6:00 – 8:00 PM · Cedarhouse Flowers · Limited to 10
            </p>
            <Button asChild variant="outline" className="self-start">
              <a href="https://app.acuityscheduling.com/schedule.php?owner=39688174&amp;appointmentType=98724494" target="_blank" rel="noopener noreferrer">Reserve Your Spot →</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-ink px-6 py-16 md:px-11">
        <div className="mb-[18px] font-mono text-[13px] uppercase tracking-[0.14em] text-pink-muted">
          Bring the work to your space
        </div>
        <h2 className="mb-4 max-w-[620px] font-grotesk text-[clamp(30px,5vw,44px)] font-semibold leading-[1.05]">
          Interested in hosting a workshop, retreat, or private gathering?
        </h2>
        <p className="mb-7 max-w-[560px] font-grotesk text-base leading-[1.7] text-[#5a5247]">
          Events are held with the same care and intention as the one-on-one work — shaped to fit your community, your space, and the moment you&rsquo;re in.
        </p>
        <Button asChild variant="outline" className="self-start">
          <Link href="/contact">Inquire →</Link>
        </Button>
      </section>

      <section className="border-b border-ink bg-pink px-6 py-[90px] text-center text-[#3a2a2b] md:px-11">
        <p className="mb-[30px] font-grotesk text-[clamp(38px,7vw,60px)] font-bold uppercase leading-[1.05] tracking-[-0.02em]">
          Come as you are.
        </p>
        <Button asChild>
          <Link href="/contact">Get in touch →</Link>
        </Button>
      </section>

      <SiteFooterCompact />
    </main>
  );
}
