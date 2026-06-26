import Link from "next/link";
import { Button } from "@/components/ui/button";

const NAV = [
  { label: "Offerings", href: "/offerings" },
  { label: "The Work", href: "/the-work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const TICKER_TEXT =
  "Donation-based breathwork — every Thursday 8PM PST — join us live on Zoom";

export function SiteHeader({ active }: { active?: string }) {
  return (
    <header>
      {/* Announcement ticker */}
      <Link
        href="/live-stream"
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
      </Link>

      {/* Mono meta bar */}
      <div className="flex items-center justify-between border-b border-ink px-6 py-3 font-mono text-[11px] uppercase tracking-[0.08em] text-[#46403a] md:px-11">
        <span>Caitlyne Corry</span>
        <span className="hidden opacity-80 sm:inline">Somatic Breathwork</span>
        <span className="hidden opacity-80 sm:inline">Seattle · Est. 2018</span>
        <span>Thu 8PM PST ●</span>
      </div>

      {/* Primary nav */}
      <nav className="flex items-center justify-between border-b border-ink px-6 py-5 md:px-11">
        <Link
          href="/"
          className="font-grotesk text-base font-bold tracking-[0.02em]"
        >
          FORM FOLLOWS SILENCE
        </Link>
        <div className="flex items-center gap-5 md:gap-[30px]">
          <div className="hidden items-center gap-[30px] font-grotesk text-[15px] font-medium md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active === item.href
                    ? "border-b-2 border-pink-deep pb-0.5"
                    : "transition-colors hover:text-pink-muted"
                }
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Button asChild variant="pink" size="sm">
            <Link href="/live-stream">Join Live Stream</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
