import { BOOKING_URL } from "@/lib/site";

export const JOURNAL_AUTHOR = "Caitlyne Corry";

export const CATEGORIES = [
  {
    slug: "therapeutic-breathwork",
    name: "Therapeutic Breathwork",
    description:
      "Exploring therapeutic breathwork, the relationship between mind and body, and what becomes possible through curiosity, awareness, and conscious connection.",
    service: { label: "Explore Therapeutic Breathwork", href: "/breathwork" },
  },
  {
    slug: "nervous-system",
    name: "The Nervous System",
    description:
      "Breathwork and the nervous system: regulation, capacity, and the everyday ways the body responds to stress and safety.",
    service: { label: "See offerings", href: "/offerings" },
  },
  {
    slug: "trauma-and-the-body",
    name: "Trauma & The Body",
    description:
      "Somatic awareness, trauma, and recovery: how experience lives in the body, and how breath can meet it with care.",
    service: { label: "Explore Therapeutic Breathwork", href: "/breathwork" },
  },
  {
    slug: "reflections",
    name: "Reflections",
    description:
      "Personal reflections on breath, the body, and the human experience.",
    service: { label: "About Caitlyne", href: "/about" },
  },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug) as [
  CategorySlug,
  ...CategorySlug[],
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

/** Article slugs that would collide with Journal routes. */
export const RESERVED_SLUGS = ["category", "rss", "feed", "admin"];

/** Pages offered as quick internal links in the article editor. */
export const INTERNAL_LINKS = [
  { label: "Therapeutic Breathwork", href: "/breathwork" },
  { label: "Offerings", href: "/offerings" },
  { label: "Seattle Breathwork", href: "/seattle-breathwork" },
  { label: "Online Breathwork", href: "/online-breathwork" },
  { label: "Events", href: "/events" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Book a session", href: BOOKING_URL },
];

export type ArticleSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  featuredImageUrl: string | null;
  featuredImageAlt: string | null;
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
};

export type Article = ArticleSummary & {
  content: string;
  seoTitle: string | null;
  metaDescription: string | null;
};

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
}

export function readingMinutes(html: string): number {
  const words = html
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

export function pickFeatured<T extends { featured: boolean }>(
  articles: T[]
): T | undefined {
  return articles.find((a) => a.featured) ?? articles[0];
}
