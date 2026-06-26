"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooterCompact } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FLOW = [
  {
    no: "(01)",
    title: "Reserve",
    body: "Claim your spot below. You'll get the Zoom link and a short note on how to prepare your space.",
  },
  {
    no: "(02)",
    title: "Arrive",
    body: "Log on a few minutes early on Thursday. Find a quiet spot where you can lie down and won't be disturbed.",
  },
  {
    no: "(03)",
    title: "Breathe",
    body: "Sixty guided minutes of active breathwork. Come as you are — give what you can, when you can.",
  },
];

const GIVE = ["Pay what you can", "$15 — suggested", "$30 — supporter", "$50 — sustainer"];

export default function LiveStreamPage() {
  const [reserved, setReserved] = useState(false);

  return (
    <main className="min-h-screen bg-cream text-ink">
      <SiteHeader active="/live-stream" />

      {/* Hero */}
      <section className="border-b border-ink px-5 pb-14 pt-[70px] md:px-10">
        <div className="mb-[26px] font-mono text-xs uppercase tracking-[0.2em] text-pink-muted">
          <span className="text-pink-deep">●</span> Live every Thursday
        </div>
        <h1 className="m-0 font-grotesk text-[clamp(48px,11vw,150px)] font-bold uppercase leading-[0.82] tracking-[-0.045em]">
          Breathe
          <br />
          With Us
        </h1>
        <div className="mt-11 flex flex-wrap items-end justify-between gap-10">
          <p className="max-w-[520px] font-grotesk text-xl leading-[1.5] text-[#4a443c]">
            A donation-based group breathwork session, live on Zoom. Come as you
            are — no experience needed. Reserve your spot and breathe with us
            this week.
          </p>
          <span className="font-mono text-xs tracking-[0.12em] text-[#8a8074]">
            ↓ Reserve below
          </span>
        </div>
      </section>

      {/* Session facts band */}
      <section className="grid grid-cols-2 border-b border-ink md:grid-cols-4">
        {[
          { k: "When", v: "Thursdays" },
          { k: "Time", v: "8:00 PM PST" },
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

      {/* How it works */}
      <section className="grid grid-cols-1 border-b border-ink md:grid-cols-3">
        {FLOW.map((f, i) => (
          <div
            key={f.title}
            className={`px-9 py-[54px] ${
              i < 2 ? "border-b border-ink md:border-b-0 md:border-r" : ""
            }`}
          >
            <span className="font-mono text-xs text-[#8a8074]">{f.no}</span>
            <h3 className="mb-3.5 mt-[18px] font-grotesk text-[40px] font-bold uppercase">
              {f.title}
            </h3>
            <p className="m-0 font-grotesk text-[15px] leading-[1.65] text-[#5a5247]">
              {f.body}
            </p>
          </div>
        ))}
      </section>

      {/* Reserve form + time block */}
      <section className="grid grid-cols-1 border-b border-ink md:grid-cols-[1.2fr_1fr]">
        <div className="border-ink px-6 py-[72px] md:border-r md:px-11">
          <div className="mb-[26px] font-mono text-xs uppercase tracking-[0.2em] text-pink-muted">
            Reserve your spot
          </div>
          {reserved ? (
            <div className="rounded-[3px] border border-ink bg-pink p-10">
              <div className="mb-3 font-grotesk text-[32px] font-bold uppercase text-[#3a2a2b]">
                You&rsquo;re in ✺
              </div>
              <p className="m-0 font-grotesk text-base leading-[1.6] text-[#4a2e2f]">
                Check your inbox — the Zoom link and a short preparation note are
                on the way. See you Thursday at 8PM PST.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setReserved(true);
              }}
              className="flex max-w-[520px] flex-col gap-[22px]"
            >
              <div className="flex flex-col gap-2.5">
                <Label htmlFor="ls-name">Your name</Label>
                <Input id="ls-name" placeholder="First and last" required />
              </div>
              <div className="flex flex-col gap-2.5">
                <Label htmlFor="ls-email">Email</Label>
                <Input
                  id="ls-email"
                  type="email"
                  placeholder="you@email.com"
                  required
                />
              </div>
              <div className="flex flex-col gap-2.5">
                <Label>Contribution</Label>
                <Select defaultValue={GIVE[0]}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {GIVE.map((g) => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="mt-2 self-start">
                Reserve my spot →
              </Button>
              <p className="m-0 font-grotesk text-[13px] leading-[1.6] text-[#8a8074]">
                Prefer something private?{" "}
                <Link
                  href="/contact"
                  className="border-b border-pink-deep pb-px text-ink"
                >
                  Book a 1:1 instead
                </Link>
                .
              </p>
            </form>
          )}
        </div>

        <div className="flex flex-col justify-center bg-pink px-6 py-[72px] text-[#3a2a2b] md:px-11">
          <div className="font-mono text-[clamp(56px,9vw,80px)] font-bold leading-none">
            8:00
          </div>
          <div className="mt-2 font-mono text-sm tracking-[0.12em]">
            PM PST — THURSDAYS
          </div>
          <div className="my-7 h-px bg-ink opacity-30" />
          <p className="m-0 font-grotesk text-[17px] leading-[1.6]">
            Donation-based · Live on Zoom · 60 minutes · All levels welcome. No
            one is ever turned away for lack of funds.
          </p>
        </div>
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
