import { Button } from "@/components/ui/button";
import { getJournalSettings, safeRead } from "@/lib/journal";

/** Renders only once a Substack URL is saved, so no link is ever a dead end. */
export async function SubstackSection() {
  const { substackUrl } = await safeRead(getJournalSettings, {
    substackUrl: null,
  });
  if (!substackUrl) return null;

  return (
    <section
      aria-labelledby="substack-heading"
      className="grid grid-cols-1 gap-8 border-b border-ink bg-sand-2 px-6 py-16 md:grid-cols-[1fr_auto] md:items-end md:px-11"
    >
      <div className="flex flex-col gap-4">
        <div className="font-mono text-xs uppercase tracking-[0.16em] text-pink-muted">
          Also on Substack
        </div>
        <h2
          id="substack-heading"
          className="m-0 max-w-[620px] text-balance font-grotesk text-[clamp(26px,3.4vw,36px)] font-semibold leading-[1.12] tracking-[-0.01em]"
        >
          Letters and shorter writing, delivered to your inbox.
        </h2>
        <a
          href={substackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit font-grotesk text-sm font-semibold underline underline-offset-4 hover:text-pink-muted"
        >
          Read more writing on Substack
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      <Button asChild variant="outline">
        <a href={substackUrl} target="_blank" rel="noopener noreferrer">
          Subscribe on Substack →
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </Button>
    </section>
  );
}
