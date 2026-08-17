import { SiteHeader } from "@/components/site-header";
import { SiteFooterCompact } from "@/components/site-footer";
import { BreathworkNotice } from "@/components/breathwork-notice";

export default function LiveStreamPage() {
  return (
    <main className="min-h-screen bg-cream text-ink">
      <SiteHeader active="/live-stream" />

      {/* Hero */}
      <section className="border-b border-ink px-5 pb-14 pt-[70px] md:px-10">
        <div className="mb-[26px] font-mono text-xs uppercase tracking-[0.2em] text-pink-muted">
          <span className="text-pink-deep">●</span> Live every Wednesday
        </div>
        <h1 className="m-0 font-grotesk text-[clamp(48px,11vw,150px)] font-bold uppercase leading-[0.82] tracking-[-0.045em]">
          Breathe
          <br />
          With Us
        </h1>
        <div className="mt-11 flex flex-wrap items-end justify-between gap-10">
          <p className="max-w-[520px] font-grotesk text-xl leading-[1.5] text-[#4a443c]">
            A donation-based group breathwork session, live on Zoom. Come as you
            are — no experience needed. Give what you can, when you can.
          </p>
          <span className="font-mono text-xs tracking-[0.12em] text-[#8a8074]">
            Coming Soon
          </span>
        </div>
      </section>

      {/* Session facts band */}
      <section className="grid grid-cols-2 border-b border-ink md:grid-cols-4">
        {[
          { k: "When", v: "Coming Soon" },
          { k: "Time", v: "TBA" },
          { k: "Where", v: "Live on Zoom" },
          { k: "Length", v: "60 minutes" },
        ].map((f, i) => (
          <div
            key={f.k}
            className={`px-6 py-12 md:px-9 ${
              i < 3 ? "border-r border-ink" : ""
            } ${i < 2 ? "border-b border-ink md:border-b-0" : ""}`}
          >
            <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[#8a8074]">
              {f.k}
            </div>
            <div className="font-grotesk text-[28px] font-semibold leading-none tracking-[-0.01em]">
              {f.v}
            </div>
          </div>
        ))}
      </section>

      {/* Registration paused notice */}
      <section className="flex flex-col items-center border-b border-ink px-6 py-24 text-center md:px-11">
        <div className="mb-[26px] font-mono text-xs uppercase tracking-[0.2em] text-pink-muted">
          Coming soon
        </div>
        <BreathworkNotice />
      </section>

      {/* Closing line */}
      <section className="border-b border-ink px-6 py-24 text-center md:px-11">
        <p className="mx-auto max-w-[1000px] font-grotesk text-[clamp(34px,5vw,60px)] font-bold uppercase leading-[1.05] tracking-[-0.02em]">
          Come home to yourself — one breath at a time.
        </p>
      </section>

      <SiteFooterCompact />
    </main>
  );
}
