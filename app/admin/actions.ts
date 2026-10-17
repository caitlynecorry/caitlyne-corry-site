"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { and, eq, ne, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { journalArticles, journalSettings } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/admin";
import { JOURNAL_TAG } from "@/lib/journal";
import { CATEGORY_SLUGS, RESERVED_SLUGS, slugify } from "@/lib/journal-shared";
import { sanitizeArticleHtml } from "@/lib/sanitize";

export type ActionResult =
  | { ok: true; id?: number; slug?: string }
  | { ok: false; error: string };

function optionalHttpsUrl() {
  return z
    .string()
    .trim()
    .max(2000)
    .nullable()
    .transform((v) => (v ? v : null))
    .refine((v) => v === null || /^https:\/\//i.test(v), "Images must use https.");
}

const articleSchema = z.object({
  id: z.number().int().positive().nullable(),
  title: z.string().trim().min(1, "Add a title.").max(200),
  slug: z.string().trim().max(80),
  excerpt: z.string().trim().max(400, "Keep the excerpt under 400 characters."),
  content: z.string().max(500_000),
  category: z.enum(CATEGORY_SLUGS, { message: "Choose a category." }),
  featuredImageUrl: optionalHttpsUrl(),
  featuredImageAlt: z.string().trim().max(300).nullable(),
  seoTitle: z.string().trim().max(120).nullable(),
  metaDescription: z.string().trim().max(320).nullable(),
  featured: z.boolean(),
  status: z.enum(["draft", "published"]),
});

export type ArticleInput = z.input<typeof articleSchema>;

function refreshJournal(slugs: string[]) {
  revalidateTag(JOURNAL_TAG);
  revalidatePath("/");
  revalidatePath("/journal");
  revalidatePath("/journal/category/[category]", "page");
  revalidatePath("/sitemap.xml");
  for (const slug of slugs) revalidatePath(`/journal/${slug}`);
}

export async function saveArticle(input: ArticleInput): Promise<ActionResult> {
  const user = await requireAdmin();
  const parsed = articleSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Check the form." };
  }
  const data = parsed.data;

  const slug = slugify(data.slug || data.title);
  if (!slug) return { ok: false, error: "Add a URL slug using letters or numbers." };
  if (RESERVED_SLUGS.includes(slug)) {
    return { ok: false, error: `"${slug}" is reserved. Choose a different URL slug.` };
  }

  if (data.status === "published") {
    if (!data.excerpt) return { ok: false, error: "Add an excerpt before publishing." };
    if (data.featuredImageUrl && !data.featuredImageAlt) {
      return { ok: false, error: "Describe the featured image (alt text) before publishing." };
    }
  }

  const clash = await db
    .select({ id: journalArticles.id })
    .from(journalArticles)
    .where(
      data.id
        ? and(eq(journalArticles.slug, slug), ne(journalArticles.id, data.id))
        : eq(journalArticles.slug, slug)
    )
    .limit(1);
  if (clash.length > 0) {
    return { ok: false, error: "Another article already uses this URL slug." };
  }

  const values = {
    title: data.title,
    slug,
    excerpt: data.excerpt,
    content: sanitizeArticleHtml(data.content),
    category: data.category,
    featuredImageUrl: data.featuredImageUrl,
    featuredImageAlt: data.featuredImageUrl ? data.featuredImageAlt : null,
    seoTitle: data.seoTitle || null,
    metaDescription: data.metaDescription || null,
    featured: data.featured,
    status: data.status,
    updatedAt: new Date(),
  };

  let id = data.id;
  let previousSlug: string | null = null;

  if (id) {
    const [existing] = await db
      .select({ slug: journalArticles.slug, publishedAt: journalArticles.publishedAt })
      .from(journalArticles)
      .where(and(eq(journalArticles.id, id), eq(journalArticles.userId, user.id)))
      .limit(1);
    if (!existing) return { ok: false, error: "That article no longer exists." };
    previousSlug = existing.slug;

    await db
      .update(journalArticles)
      .set({
        ...values,
        publishedAt:
          data.status === "published" ? (existing.publishedAt ?? new Date()) : existing.publishedAt,
      })
      .where(and(eq(journalArticles.id, id), eq(journalArticles.userId, user.id)));
  } else {
    const [created] = await db
      .insert(journalArticles)
      .values({
        ...values,
        userId: user.id,
        publishedAt: data.status === "published" ? new Date() : null,
      })
      .returning({ id: journalArticles.id });
    id = created.id;
  }

  if (data.featured) {
    await db
      .update(journalArticles)
      .set({ featured: false })
      .where(
        and(
          eq(journalArticles.userId, user.id),
          ne(journalArticles.id, id),
          eq(journalArticles.featured, true)
        )
      );
  }

  refreshJournal([slug, ...(previousSlug && previousSlug !== slug ? [previousSlug] : [])]);
  revalidatePath("/admin");
  return { ok: true, id, slug };
}

export async function deleteArticle(id: number): Promise<ActionResult> {
  const user = await requireAdmin();
  if (!Number.isInteger(id) || id <= 0) return { ok: false, error: "Invalid article." };

  const [deleted] = await db
    .delete(journalArticles)
    .where(and(eq(journalArticles.id, id), eq(journalArticles.userId, user.id)))
    .returning({ slug: journalArticles.slug });

  if (deleted) refreshJournal([deleted.slug]);
  revalidatePath("/admin");
  return { ok: true };
}

function normalizeSubstackUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const url = new URL(withScheme);
  url.protocol = "https:";
  return url.toString().replace(/\/$/, "");
}

export async function saveSettings(substackUrl: string): Promise<ActionResult> {
  await requireAdmin();
  let value: string | null;
  try {
    value = normalizeSubstackUrl(substackUrl.slice(0, 500));
  } catch {
    return { ok: false, error: "That doesn't look like a web address." };
  }

  await db
    .insert(journalSettings)
    .values({ id: 1, substackUrl: value, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: journalSettings.id,
      set: { substackUrl: value, updatedAt: sql`now()` },
    });

  refreshJournal([]);
  revalidatePath("/journal/[slug]", "page");
  revalidatePath("/admin/settings");
  return { ok: true };
}
