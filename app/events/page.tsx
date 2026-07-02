import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooterCompact } from "@/components/site-footer";
import { Button } from "@/components/ui/button";

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-cream text-ink">
      <SiteHeader active="/events" />

      {/* Page header */}
      <section className="border-b border-ink px-5 pb-14 pt-[70px] md:px-10">
        <div className="mb-[26px] font-mono text-xs uppercase tracking-[0.2em] text-pink-muted">
          Gather in person
        </div>
        <h1 className="m-0 font-grotesk text-[clamp(52px,12vw,148px)] font-bold uppercase leading-[0.84] tracking-[-0.04em]">
          Events
        </h1>
        <p className="mt-10 max-w-[600px] font-grotesk text-[19px] leading-[1.55] text-[#5a5247]">
          Seasonal gatherings for breath, surrender, and coming home to
          yourself — held in community, in beautiful spaces around Seattle.
        </p>
      </section>

      {/* Featured event: Turn Me Into a Flower */}
      <section className="grid grid-cols-1 border-b border-ink md:grid-cols-2">
        <div
          className="min-h-[360px] border-b border-ink bg-sand bg-cover bg-center bg-no-repeat md:min-h-[620px] md:border-b-0 md:border-r"
          style={{ backgroundImage: "url('/media/cedarhouse-flowers.png')" }}
          role="img"
          aria-label="Loose seasonal cut flowers resting on a table in a flower studio"
        />
        <div className="flex flex-col justify-center px-6 py-16 md:px-11">
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
            Surrounded by the flowers and quiet of Cedarhouse, together
            we&rsquo;ll soften what has been held too tightly, release what no
            longer fits, and make space for whatever is waiting to bloom. No
            breathwork experience necessary — just come as you are, and leave a
            little more like a flower.
          </p>
          <dl className="mb-8 max-w-[460px] border-t border-ink/15 font-grotesk text-[14.5px] leading-[1.6] text-ink">
            {[
              ["Where", "Cedarhouse Flowers — 1901 N 45th St, Seattle, WA 98103"],
              ["When", "Saturday, July 25, 2026 · 6:00–7:30 PM"],
              ["Spots", "Limited to 15"],
              ["Price", "$40 per person"],
              ["Bring", "A mat or blanket, and something comfortable to wear"],
            ].map(([label, value]) => (
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
          <Button asChild className="self-start">
            <a
              href="https://app.acuityscheduling.com/schedule.php?owner=39688174&appointmentType=95243724"
              target="_blank"
              rel="noopener noreferrer"
            >
              Reserve your spot →
            </a>
          </Button>
        </div>
      </section>

      {/* Host an event CTA */}
      <section className="border-b border-ink px-6 py-16 md:px-11">
        <div className="mb-[18px] font-mono text-[13px] uppercase tracking-[0.14em] text-pink-muted">
          Bring the work to your space
        </div>
        <h2 className="mb-4 max-w-[620px] font-grotesk text-[clamp(30px,5vw,44px)] font-semibold leading-[1.05]">
          Interested in hosting a workshop, retreat, or private gathering?
        </h2>
        <p className="mb-7 max-w-[560px] font-grotesk text-base leading-[1.7] text-[#5a5247]">
          Events are held with the same care and intention as the one-on-one
          work — shaped to fit your community, your space, and the moment
          you&rsquo;re in.
        </p>
        <Button asChild variant="outline" className="self-start">
          <Link href="/contact">Inquire →</Link>
        </Button>
      </section>

      {/* Pink CTA band */}
      <section className="border-b border-ink bg-pink px-6 py-[90px] text-center text-[#3a2a2b] md:px-11">
        <p className="mb-[30px] font-grotesk text-[clamp(38px,7vw,60px)] font-bold uppercase leading-[1.05] tracking-[-0.02em]">
          Come as you are.
        </p>
        <Button asChild>
          <a
            href="https://app.acuityscheduling.com/schedule.php?owner=39688174&appointmentType=95243724"
            target="_blank"
            rel="noopener noreferrer"
          >
            Reserve your spot →
          </a>
        </Button>
      </section>

      <SiteFooterCompact />
    </main>
  );
}
