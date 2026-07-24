"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Each nav item maps to a full page (for direct navigation from anywhere)
 * and to an on-page section anchor (used when the visitor is on the homepage,
 * which is a long-scroll edition of the whole site).
 */
const NAV = [
  { label: "Offerings", href: "/offerings", anchor: "#offerings" },
  { label: "Events", href: "/events", anchor: "#events" },
  { label: "The Work", href: "/the-work", anchor: "#the-work" },
  { label: "About", href: "/about", anchor: "#about" },
  { label: "Contact", href: "/contact", anchor: "#contact" },
];

const TICKER_TEXT =
  "Wednesday Virtual Breathwork returns August 5 at 8:00 PM PST.";

export function SiteHeader({ active }: { active?: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";

  // On the homepage, nav scrolls to the matching section; elsewhere it links
  // to the standalone page. The live-stream CTA always targets the homepage
  // Virtual Breathwork section.
  const navTarget = (item: (typeof NAV)[number]) =>
    onHome ? item.anchor : item.href;
  const liveTarget = onHome ? "#virtual-breathwork" : "/#virtual-breathwork";

  return (
    <header>
      {/* Announcement banner */}
      <a
        href={liveTarget}
        className="block overflow-hidden whitespace-nowrap border-b border-ink bg-pink"
      >
        <div className="inline-block animate-ticker py-2.5 font-mono text-xs tracking-[0.12em] text-[#4a2e2f]">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i}>
              <span className="px-[26px]">{TICKER_TEXT}</span>
              <span className="px-[26px]">✺</span>
            </span>
          ))}
        </div>
      </a>

      {/* Mono meta bar */}
      <div className="flex items-center justify-between border-b border-ink px-6 py-3 font-mono text-[11px] uppercase tracking-[0.08em] text-[#46403a] md:px-11">
        <span>Enjoy Your Breath</span>
        <span className="hidden opacity-80 sm:inline">Somatic Breathwork</span>
        <span className="hidden opacity-80 sm:inline">Seattle · Est. 2018</span>
        <span>Wed 8PM PST ●</span>
      </div>

      {/* Primary nav */}
      <nav className="flex items-center justify-between border-b border-ink px-6 py-5 md:px-11">
        <Link
          href="/"
          className="font-grotesk text-base font-bold tracking-[0.02em]"
        >
          CAITLYNE CORRY
        </Link>
        <div className="flex items-center gap-5 md:gap-[30px]">
          <div className="hidden items-center gap-[30px] font-grotesk text-[15px] font-medium md:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={navTarget(item)}
                className={
                  active === item.href
                    ? "border-b-2 border-pink-deep pb-0.5"
                    : "transition-colors hover:text-pink-muted"
                }
              >
                {item.label}
              </a>
            ))}
          </div>
          <Button asChild variant="pink" size="sm">
            <a href={liveTarget}>Join Live Stream</a>
          </Button>
          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex items-center justify-center p-1 text-ink md:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile nav panel */}
      {open ? (
        <div
          id="mobile-nav"
          className="border-b border-ink bg-cream md:hidden"
        >
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.href} className="border-b border-ink/15 last:border-b-0">
                <a
                  href={navTarget(item)}
                  onClick={() => setOpen(false)}
                  className={`block px-6 py-4 font-grotesk text-lg font-medium ${
                    active === item.href ? "text-pink-deep" : "text-ink"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
