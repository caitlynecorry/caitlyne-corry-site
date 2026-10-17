import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { journalArticles } from "@/lib/db/schema";

export type EditableArticle = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  featuredImageUrl: string | null;
  featuredImageAlt: string | null;
  seoTitle: string | null;
  metaDescription: string | null;
  featured: boolean;
  status: "draft" | "published";
  publishedAt: string | null;
};

export async function getEditableArticle(
  rawId: string,
  userId: string
): Promise<EditableArticle | null> {
  const id = Number(rawId);
  if (!Number.isInteger(id) || id <= 0) return null;

  const [row] = await db
    .select()
    .from(journalArticles)
    .where(and(eq(journalArticles.id, id), eq(journalArticles.userId, userId)))
    .limit(1);
  if (!row) return null;

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
    featuredImageUrl: row.featuredImageUrl,
    featuredImageAlt: row.featuredImageAlt,
    seoTitle: row.seoTitle,
    metaDescription: row.metaDescription,
    featured: row.featured,
    status: row.status === "published" ? "published" : "draft",
    publishedAt: row.publishedAt?.toISOString() ?? null,
  };
}
