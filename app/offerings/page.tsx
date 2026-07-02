import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooterCompact } from "@/components/site-footer";
import { Button } from "@/components/ui/button";

export default function OfferingsPage() {
  return (
    <main className="min-h-screen bg-cream text-ink">
      <SiteHeader active="/offerings" />

      {/* Page header */}
      <section className="border-b border-ink px-5 pb-14 pt-[70px] md:px-10">
        <div className="mb-[26px] font-mono text-xs uppercase tracking-[0.2em] text-pink-muted">
          Ways to work together
        </div>
        <h1 className="m-0 font-grotesk text-[clamp(52px,12vw,148px)] font-bold uppercase leading-[0.84] tracking-[-0.04em]">
          My
          <br />
          Offerings
        </h1>
        <p className="mt-10 max-w-[600px] font-grotesk text-[19px] leading-[1.55] text-[#5a5247]">
          Breathwork is a simple, powerful meditative tool for coming home to
          yourself. It helps quiet the noise, move stuck emotions, and rebuild
          safety in the body — especially when life feels overwhelming.
        </p>
      </section>

      {/* Offering 01 */}
      <section className="grid grid-cols-1 border-b border-ink md:grid-cols-2">
        <video
          className="min-h-[520px] w-full border-ink object-cover object-[center_20%] md:border-r"
          src="/media/breathwork-clip.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="flex flex-col justify-center px-6 py-16 md:px-11">
          <div className="mb-5 font-mono text-[13px] text-[#8a8074]">
            01 / Sessions
          </div>
          <h2 className="mb-[18px] font-grotesk text-[54px] font-bold uppercase leading-[0.98]">
            Breathwork in Motion
          </h2>
          <p className="mb-[26px] max-w-[440px] font-grotesk text-base leading-[1.7] text-[#5a5247]">
            Guided, embodied breathwork journeys that meet you where you are. We
            move stuck energy, quiet the noise, and let the body lead.
          </p>
          <div className="mb-[30px] flex flex-wrap gap-2.5">
            {["Private", "Couples", "Group", "Virtual"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-ink px-4 py-[7px] font-mono text-xs"
              >
                {t}
              </span>
            ))}
          </div>
          <Button asChild className="self-start">
            <a
              href="https://app.acuityscheduling.com/schedule/bc35c44e"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a session →
            </a>
          </Button>
        </div>
      </section>

      {/* Offering 02 (reversed) */}
      <section className="grid grid-cols-1 border-b border-ink md:grid-cols-2">
        <div className="flex flex-col justify-center border-ink px-6 py-16 md:order-1 md:border-r md:px-11">
          <div className="mb-5 font-mono text-[13px] text-[#8a8074]">
            02 / Education
          </div>
          <h2 className="mb-[18px] font-grotesk text-[54px] font-bold uppercase leading-[0.98]">
            Nervous System Support
          </h2>
          <p className="mb-[26px] max-w-[440px] font-grotesk text-base leading-[1.7] text-[#5a5247]">
            Learn the why beneath the work. Practical, regulating toolkits and
            workshops to help you understand and resource your own nervous
            system.
          </p>
          <div className="mb-[30px] flex flex-wrap gap-2.5">
            {["Education", "Toolkits", "Workshops"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-ink px-4 py-[7px] font-mono text-xs"
              >
                {t}
              </span>
            ))}
          </div>
          <Button asChild variant="outline" className="self-start">
            <Link href="/contact">Inquire →</Link>
          </Button>
        </div>
        <div
          className="min-h-[520px] bg-sand bg-cover bg-center bg-no-repeat md:order-2"
          style={{ backgroundImage: "url('https://www.caitlynecorry.com/cc03.webp')" }}
        />
      </section>

      {/* Offerings 03 + 04 */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="border-b border-ink px-6 py-16 md:border-r md:px-11">
          <div className="mb-[18px] font-mono text-[13px] text-[#8a8074]">
            03 / Meditation
          </div>
          <h2 className="mb-4 font-grotesk text-[44px] font-semibold leading-none">
            Form Follows Silence
          </h2>
          <p className="mb-6 font-grotesk text-base leading-[1.7] text-[#5a5247]">
            A somatics-based guided meditation to settle the nervous system and
            drop beneath the noise — a doorway back to yourself, in your own
            time and space.
          </p>
          <div className="mb-6 font-mono text-[13px] uppercase tracking-[0.14em] text-pink-muted">
            $28 — Coming soon
          </div>
          <Link
            href="/contact"
            className="border-b-2 border-pink-deep pb-[3px] font-grotesk text-sm font-semibold"
          >
            Learn more →
          </Link>
        </div>
        <div className="border-b border-ink px-6 py-16 md:px-11">
          <div className="mb-[18px] font-mono text-[13px] text-[#8a8074]">
            04 / Ongoing
          </div>
          <h2 className="mb-4 font-grotesk text-[44px] font-semibold leading-none">
            Integration
          </h2>
          <p className="mb-6 font-grotesk text-base leading-[1.7] text-[#5a5247]">
            The work after the work. Continued support to help you metabolize,
            embody, and live what you&rsquo;ve uncovered — so it lasts.
          </p>
          <Link
            href="/contact"
            className="border-b-2 border-pink-deep pb-[3px] font-grotesk text-sm font-semibold"
          >
            Learn more →
          </Link>
        </div>
        <div className="border-b border-ink px-6 py-16 md:col-span-2 md:px-11">
          <div className="mb-[18px] font-mono text-[13px] text-[#8a8074]">
            05 / Events
          </div>
          <h2 className="mb-4 font-grotesk text-[44px] font-semibold leading-none">
            Event Space
          </h2>
          <p className="mb-6 max-w-[560px] font-grotesk text-base leading-[1.7] text-[#5a5247]">
            A space to gather. Available for workshops, speaking engagements,
            retreats, and private events — held with the same care and intention
            as the one-on-one work.
          </p>
          <Link
            href="/contact"
            className="border-b-2 border-pink-deep pb-[3px] font-grotesk text-sm font-semibold"
          >
            Inquire →
          </Link>
        </div>
      </section>

      {/* Upcoming event */}
      <section className="grid grid-cols-1 border-b border-ink md:grid-cols-2">
        <div
          className="min-h-[360px] border-b border-ink bg-sand bg-cover bg-center bg-no-repeat md:min-h-[560px] md:border-b-0 md:border-r"
          style={{ backgroundImage: "url('/media/cedarhouse-flowers.png')" }}
          role="img"
          aria-label="Loose seasonal cut flowers resting on a table in a flower studio"
        />
        <div className="flex flex-col justify-center px-6 py-16 md:px-11">
          <div className="mb-[18px] font-mono text-[13px] uppercase tracking-[0.14em] text-pink-muted">
            Upcoming Event · Cedarhouse Flowers
          </div>
          <h2 className="mb-3 font-grotesk text-[44px] font-semibold leading-[0.98]">
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

      {/* Pink CTA band */}
      <section className="border-b border-ink bg-pink px-6 py-[90px] text-center text-[#3a2a2b] md:px-11">
        <p className="mb-[30px] font-grotesk text-[clamp(38px,7vw,60px)] font-bold uppercase leading-[1.05] tracking-[-0.02em]">
          How free do you wanna be?
        </p>
        <Button asChild>
          <a
            href="https://app.acuityscheduling.com/schedule/bc35c44e"
            target="_blank"
            rel="noopener noreferrer"
          >
            Start with a meet &amp; greet
          </a>
        </Button>
      </section>

      <SiteFooterCompact />
    </main>
  );
}
