import Link from "next/link";
import { ArticleGrid } from "@/components/journal/article-card";
import { getPublishedArticles, safeRead } from "@/lib/journal";

/** Homepage strip of recent writing; hidden until something is published. */
export async function RecentJournal() {
  const articles = (await safeRead(getPublishedArticles, [])).slice(0, 3);
  if (articles.length === 0) return null;

  return (
    <section aria-labelledby="recent-journal-heading" className="border-b border-ink">
      <div className="flex flex-wrap items-end justify-between gap-6 px-6 pb-10 pt-16 md:px-11">
        <div>
          <div className="mb-6 font-mono text-xs uppercase tracking-[0.16em] text-pink-muted">
            Journal
          </div>
          <h2
            id="recent-journal-heading"
            className="m-0 max-w-[720px] font-grotesk text-[clamp(28px,4vw,40px)] font-semibold leading-[1.1] tracking-[-0.01em]"
          >
            Recent writing
          </h2>
        </div>
        <Link
          href="/journal"
          className="font-grotesk text-sm font-semibold underline-offset-4 hover:underline"
        >
          All writing →
        </Link>
      </div>
      <div className="border-t border-ink">
        <ArticleGrid articles={articles} />
      </div>
    </section>
  );
}
