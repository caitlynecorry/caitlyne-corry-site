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
        <p className="mb-2 max-w-[600px]
