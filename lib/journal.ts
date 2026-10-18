import { unstable_cache } from "next/cache";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { journalArticles, journalSettings } from "@/lib/db/schema";
import type { Article, ArticleSummary } from "@/lib/journal-shared";

export const JOURNAL_TAG = "journal";
// Posts are often published from the v0 Preview, whose revalidateTag calls
// can't clear production's cache, so production must refresh on its own.
const REVALIDATE_SECONDS = 60;

const summaryColumns = {
  slug: journalArticles.slug,
  title: journalArticles.title,
  excerpt: journalArticles.excerpt,
  category: journalArticles.category,
  featuredImageUrl: journalArticles.featuredImageUrl,
  featuredImageAlt: journalArticles.featuredImageAlt,
  featured: journalArticles.featured,
  publishedAt: journalArticles.publishedAt,
  createdAt: journalArticles.createdAt,
  updatedAt: journalArticles.updatedAt,
};

type SummaryRow = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  featuredImageUrl: string | null;
  featuredImageAlt: string | null;
  featured: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

function toSummary(row: SummaryRow): ArticleSummary {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    featuredImageUrl: row.featuredImageUrl,
    featuredImageAlt: row.featuredImageAlt,
    featured: row.featured,
    publishedAt: (row.publishedAt ?? row.createdAt).toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export const getPublishedArticles = unstable_cache(
  async (): Promise<ArticleSummary[]> => {
    const rows = await db
      .select(summaryColumns)
      .from(journalArticles)
      .where(eq(journalArticles.status, "published"))
      .orderBy(desc(journalArticles.publishedAt), desc(journalArticles.id));
    return rows.map(toSummary);
  },
  ["journal-published-articles-v2"],
  { tags: [JOURNAL_TAG], revalidate: REVALIDATE_SECONDS }
);

export const getPublishedArticle = unstable_cache(
  async (slug: string): Promise<Article | null> => {
    const [row] = await db
      .select({
        ...summaryColumns,
        content: journalArticles.content,
        seoTitle: journalArticles.seoTitle,
        metaDescription: journalArticles.metaDescription,
      })
      .from(journalArticles)
      .where(
        and(
          eq(journalArticles.slug, slug),
          eq(journalArticles.status, "published")
        )
      )
      .limit(1);
    if (!row) return null;
    return {
      ...toSummary(row),
      content: row.content,
      seoTitle: row.seoTitle,
      metaDescription: row.metaDescription,
    };
  },
  ["journal-published-article-v2"],
  { tags: [JOURNAL_TAG], revalidate: REVALIDATE_SECONDS }
);

export const getJournalSettings = unstable_cache(
  async (): Promise<{ substackUrl: string | null }> => {
    const [row] = await db
      .select({ substackUrl: journalSettings.substackUrl })
      .from(journalSettings)
      .where(eq(journalSettings.id, 1))
      .limit(1);
    return { substackUrl: row?.substackUrl || null };
  },
  ["journal-settings-v2"],
  { tags: [JOURNAL_TAG], revalidate: REVALIDATE_SECONDS }
);

/**
 * Public pages must still render (e.g. during a build without database
 * access), so read failures fall back to an empty Journal.
 */
export async function safeRead<T>(read: () => Promise<T>, fallback: T) {
  try {
    return await read();
  } catch (error) {
    console.error("[journal] read failed", error);
    return fallback;
  }
}

export function relatedArticles(
  current: { slug: string; category: string },
  all: ArticleSummary[],
  limit = 3
): ArticleSummary[] {
  const others = all.filter((a) => a.slug !== current.slug);
  const sameCategory = others.filter((a) => a.category === current.category);
  const rest = others.filter((a) => a.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
