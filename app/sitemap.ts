import type { MetadataRoute } from "next";
import { PUBLIC_ROUTES, SITE_URL } from "@/lib/site";
import { getPublishedArticles, safeRead } from "@/lib/journal";
import { CATEGORIES } from "@/lib/journal-shared";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const staticRoutes: MetadataRoute.Sitemap = PUBLIC_ROUTES.map((route) => ({
    url: route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: route === "/events" || route === "/journal" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));

  // Only published articles exist in this list; drafts never reach the sitemap.
  const articles = await safeRead(getPublishedArticles, []);

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.filter((c) =>
    articles.some((a) => a.category === c.slug)
  ).map((c) => ({
    url: `${SITE_URL}/journal/category/${c.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/journal/${a.slug}`,
    lastModified: new Date(a.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
}
