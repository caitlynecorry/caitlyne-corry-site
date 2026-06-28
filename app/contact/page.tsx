"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const INTERESTS = [
  "A 1:1 session",
  "Couples breathwork",
  "Group / workshop",
  "The weekly live stream",
  "Something else",
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="min-h-screen bg-cream text-ink">
      <SiteHeader active="/contact" />

      <section className="grid grid-cols-1 border-b border-ink md:grid-cols-2">
        {/* Left: invite */}
        <div className="flex flex-col justify-between border-ink px-6 py-[72px] md:border-r md:px-11">
          <div>
            <div className="mb-[26px] font-mono text-xs uppercase tracking-[0.2em] text-pink-muted">
              Let&rsquo;s connect
            </div>
            <h1 className="m-0 font-grotesk text-[clamp(44px,10vw,104px)] font-bold uppercase leading-[0.84] tracking-[-0.04em]">
              Say
              <br />
              Hello
            </h1>
            <p className="mt-[34px] max-w-[420px] font-grotesk text-lg leading-[1.6] text-[#5a5247]">
              Questions about sessions, workshops, or working together? Send a
              note — I read every one.
            </p>
          </div>
          <div className="mt-[50px] flex flex-col gap-[26px]">
            <div>
              <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#8a8074]">
                Email
              </div>
              <a
                href="mailto:caitlynecorry@gmail.com"
                className="font-grotesk text-xl font-medium"
              >
                caitlynecorry@gmail.com
              </a>
            </div>
            <div>
              <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#8a8074]">
                Studio
              </div>
              <div className="font-grotesk text-xl font-medium">
                Seattle, WA — United States
              </div>
            </div>
            <div>
              <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#8a8074]">
                Social
              </div>
              <div className="flex gap-4 font-grotesk text-xl font-medium">
                <a href="https://www.instagram.com/caitlynecorry/?hl=en">
                  Instagram
                </a>
                <a href="https://www.linkedin.com/in/caitlynecorry/">LinkedIn</a>
                <a href="https://caitlynecorry.substack.com/">Substack</a>
              </div>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="px-6 py-[72px] md:px-11">
          {sent ? (
            <div className="rounded-[3px] border border-ink bg-pink p-10">
              <div className="mb-3 font-grotesk text-[32px] font-bold uppercase text-[#3a2a2b]">
                Thank you ✺
              </div>
              <p className="m-0 font-grotesk text-base leading-[1.6] text-[#4a2e2f]">
                Your note is on its way. I&rsquo;ll be in touch soon — in the
                meantime, come breathe with us this Thursday.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="flex flex-col gap-[22px]"
            >
              <div className="flex flex-col gap-2.5">
                <Label htmlFor="name">Your name</Label>
                <Input id="name" name="name" placeholder="First and last" required />
              </div>
              <div className="flex flex-col gap-2.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@email.com"
                  required
                />
              </div>
              <div className="flex flex-col gap-2.5">
                <Label>I&rsquo;m interested in</Label>
                <Select defaultValue={INTERESTS[0]}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {INTERESTS.map((i) => (
                      <SelectItem key={i} value={i}>
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2.5">
                <Label htmlFor="message">Your message</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell me what's bringing you here…"
                />
              </div>
              <Button type="submit" className="mt-2 self-start">
                Send message →
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* Footer (Contact variant) */}
      <footer className="bg-ink px-6 pb-11 pt-[70px] text-cream md:px-11">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h2 className="m-0 font-grotesk text-[clamp(44px,8vw,72px)] font-bold uppercase leading-[0.88] tracking-[-0.03em]">
            Enjoy Your
            <br />
            Breath
          </h2>
          <div className="text-right font-grotesk text-base leading-[1.9]">
            <Link href="/offerings">Offerings</Link> ·{" "}
            <Link href="/about">About</Link> ·{" "}
            <Link href="/the-work">The Work</Link>
            <br />
            <Link href="/live-stream">Join the live stream</Link>
          </div>
        </div>
        <div className="mt-14 flex justify-between border-t border-cream/20 pt-6 font-mono text-[11px] uppercase tracking-[0.1em] text-[#b7ad9d]">
          <span>Caitlyne Corry — Breathwork Facilitator</span>
          <span>© 2026 — Form Follows Silence</span>
        </div>
      </footer>
    </main>
  );
}
