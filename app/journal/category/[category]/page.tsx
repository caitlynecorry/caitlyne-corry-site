import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JournalListing } from "@/components/journal/journal-listing";
import { getPublishedArticles, safeRead } from "@/lib/journal";
import { CATEGORIES, getCategory } from "@/lib/journal-shared";
import { pageMetadata } from "@/lib/site";

export const revalidate = 60;
export const dynamicParams = false;

type Props = { params: { category: string } };

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategory(params.category);
  if (!category) return {};
  const articles = await safeRead(getPublishedArticles, []);
  const hasArticles = articles.some((a) => a.category === category.slug);

  return {
    ...pageMetadata({
      title: `${category.name} | Journal | Caitlyne Corry`,
      description: category.description,
      path: `/journal/category/${category.slug}`,
    }),
    // Empty category pages stay out of search results until they have writing.
    ...(hasArticles ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function CategoryPage({ params }: Props) {
  const category = getCategory(params.category);
  if (!category) notFound();

  const articles = (await safeRead(getPublishedArticles, [])).filter(
    (a) => a.category === category.slug
  );

  return (
    <JournalListing
      eyebrow="Journal · Category"
      title={category.name}
      intro={category.description}
      articles={articles}
      activeCategory={category.slug}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Journal", href: "/journal" },
        { label: category.name, href: `/journal/category/${category.slug}` },
      ]}
      emptyMessage="Nothing has been published in this category yet."
    />
  );
}
