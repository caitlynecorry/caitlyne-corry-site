import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Temporary notice shown until the weekly donation-based Zoom gathering
 * launches. Designed to read as an intentional, brand-consistent state —
 * not a broken control.
 */
export function BreathworkNotice({ className }: { className?: string }) {
  return (
    <div
      className={
        className ??
        "max-w-[560px] rounded-[3px] border border-ink bg-pink p-8 md:p-10"
      }
    >
      <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[#5a3a3b]">
        Coming soon
      </div>
      <p className="mb-5 font-grotesk text-[22px] font-semibold leading-[1.3] text-[#3a2a2b]">
        Weekly Zoom breathwork
      </p>
      <p className="mb-4 font-grotesk text-base leading-[1.65] text-[#4a2e2f]">
        Weekly donation-based Zoom breathwork is coming soon. I&rsquo;m putting
        a few thoughtful touches in place before we begin gathering.
      </p>
      <p className="mb-7 font-grotesk text-base leading-[1.65] text-[#4a2e2f]">
        Looking for support in the meantime? Private virtual sessions are
        available now.
      </p>
      <Button asChild variant="outline">
        <Link href="/online-breathwork">Private online sessions →</Link>
      </Button>
    </div>
  );
}
