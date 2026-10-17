import type { Metadata } from "next";
import { JournalListing } from "@/components/journal/journal-listing";
import { JsonLd } from "@/components/journal/json-ld";
import { getPublishedArticles, safeRead } from "@/lib/journal";
import { JOURNAL_AUTHOR } from "@/lib/journal-shared";
import { SITE_NAME, SITE_URL, pageMetadata } from "@/lib/site";

export const revalidate = 3600;

const TITLE = "Journal: Breathwork, the Body & the Nervous System | Caitlyne Corry";
const DESCRIPTION =
  "Essays and educational writing by Caitlyne Corry on therapeutic breathwork, somatic awareness, the nervous system, trauma, and recovery.";

export const metadata: Metadata = {
  ...pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/journal" }),
  alternates: {
    canonical: "/journal",
    types: { "application/rss+xml": `${SITE_URL}/journal/rss.xml` },
  },
};

export default async function JournalPage() {
  const articles = await safeRead(getPublishedArticles, []);

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} Journal`,
    description: DESCRIPTION,
    url: `${SITE_URL}/journal`,
    author: { "@type": "Person", name: JOURNAL_AUTHOR, url: `${SITE_URL}/about` },
    blogPost: articles.slice(0, 20).map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      url: `${SITE_URL}/journal/${a.slug}`,
      datePublished: a.publishedAt,
      dateModified: a.updatedAt,
    })),
  };

  return (
    <>
      <JsonLd data={blogJsonLd} />
      <JournalListing
        eyebrow="Journal · Writing"
        title="Journal"
        intro="Explorations of breath, the body, and the human experience."
        articles={articles}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Journal", href: "/journal" },
        ]}
        emptyMessage="The first essays are being written. Until then, you can read more about the work itself."
      />
    </>
  );
}
