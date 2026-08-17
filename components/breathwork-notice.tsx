import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Temporary notice shown while weekly Virtual Breathwork registration is paused.
 * Registration returns Wednesday, August 5, 2026. Designed to read as an
 * intentional, brand-consistent state — not a broken control.
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
        Virtual Breathwork
      </p>
      <p className="mb-4 font-grotesk text-base leading-[1.65] text-[#4a2e2f]">
        Weekly Virtual Breathwork is coming soon. I&rsquo;m putting a few
        thoughtful touches in place before we begin gathering on Zoom.
      </p>
      <p className="mb-7 font-grotesk text-base leading-[1.65] text-[#4a2e2f]">
        If you&rsquo;re looking for support in the meantime, please reach out.
      </p>
      <Button asChild variant="outline">
        <Link href="/contact">Reach out →</Link>
      </Button>
    </div>
  );
}
