import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooterCompact } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { ArticleGrid } from "@/components/journal/article-card";
import { Breadcrumbs } from "@/components/journal/breadcrumbs";
import { JsonLd } from "@/components/journal/json-ld";
import { SubstackSection } from "@/components/journal/substack-section";
import {
  getPublishedArticle,
  getPublishedArticles,
  relatedArticles,
  safeRead,
} from "@/lib/journal";
import {
  JOURNAL_AUTHOR,
  formatDate,
  getCategory,
  readingMinutes,
} from "@/lib/journal-shared";
import { sanitizeArticleHtml } from "@/lib/sanitize";
import { BOOKING_URL, SITE_NAME, SITE_URL } from "@/lib/site";

export const revalidate = 3600;

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const articles = await safeRead(getPublishedArticles, []);
  return articles.map((a) => ({ slug: a.slug }));
}

function isMeaningfullyUpdated(publishedAt: string, updatedAt: string) {
  return new Date(updatedAt).getTime() - new Date(publishedAt).getTime() > 86_400_000;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await safeRead(() => getPublishedArticle(params.slug), null);
  if (!article) return { title: "Article not found", robots: { index: false } };

  const title = article.seoTitle || `${article.title} | ${SITE_NAME}`;
  const description = article.metaDescription || article.excerpt;
  const path = `/journal/${article.slug}`;
  const images = article.featuredImageUrl
    ? [{ url: article.featuredImageUrl, alt: article.featuredImageAlt ?? "" }]
    : undefined;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    authors: [{ name: JOURNAL_AUTHOR, url: `${SITE_URL}/about` }],
    openGraph: {
      type: "article",
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [JOURNAL_AUTHOR],
      section: getCategory(article.category)?.name,
      images,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title,
      description,
      images: images?.map((i) => i.url),
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = await safeRead(() => getPublishedArticle(params.slug), null);
  if (!article) notFound();

  const all = await safeRead(getPublishedArticles, []);
  const related = relatedArticles(article, all);
  const category = getCategory(article.category);
  const html = sanitizeArticleHtml(article.content);
  const url = `${SITE_URL}/journal/${article.slug}`;
  const updated = isMeaningfullyUpdated(article.publishedAt, article.updatedAt);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.metaDescription || article.excerpt,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { "@type": "Person", name: JOURNAL_AUTHOR, url: `${SITE_URL}/about` },
    publisher: { "@type": "Person", name: JOURNAL_AUTHOR, url: SITE_URL },
    articleSection: category?.name,
    ...(article.featuredImageUrl ? { image: [article.featuredImageUrl] } : {}),
  };

  return (
    <main className="min-h-screen bg-cream text-ink">
      <SiteHeader active="/journal" />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Journal", href: "/journal" },
          ...(category
            ? [{ label: category.name, href: `/journal/category/${category.slug}` }]
            : []),
          { label: article.title, href: `/journal/${article.slug}` },
        ]}
      />
      <JsonLd data={articleJsonLd} />

      <article>
        <header className="border-b border-ink px-6 pb-14 pt-16 md:px-11 md:pt-24">
          <div className="mx-auto flex max-w-[860px] flex-col gap-8">
            {category ? (
              <Link
                href={`/journal/category/${category.slug}`}
                className="w-fit font-mono text-xs uppercase tracking-[0.2em] text-pink-muted hover:text-ink"
              >
                {category.name}
              </Link>
            ) : null}
            <h1 className="m-0 text-balance font-grotesk text-[clamp(38px,6.2vw,76px)] font-semibold leading-[1] tracking-[-0.03em]">
              {article.title}
            </h1>
            {article.excerpt ? (
              <p className="m-0 max-w-[640px] text-pretty font-grotesk text-[20px] leading-[1.55] text-[#5a5247]">
                {article.excerpt}
              </p>
            ) : null}
            <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-ink/20 pt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#5a5247]">
              <span>
                By{" "}
                <Link href="/about" rel="author" className="text-ink hover:text-pink-muted">
                  {JOURNAL_AUTHOR}
                </Link>
              </span>
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              {updated ? (
                <span>
                  Updated <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
                </span>
              ) : null}
              <span>{readingMinutes(html)} min read</span>
            </div>
          </div>
        </header>

        {article.featuredImageUrl ? (
          <figure className="m-0 border-b border-ink">
            <div className="relative aspect-[16/9] max-h-[720px] w-full">
              <Image
                src={article.featuredImageUrl}
                alt={article.featuredImageAlt ?? ""}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </figure>
        ) : null}

        <div className="px-6 py-16 md:px-11 md:py-20">
          <div
            className="journal-prose mx-auto max-w-[680px]"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </article>

      <section
        aria-labelledby="work-with-me-heading"
        className="border-y border-ink bg-pink px-6 py-20 text-[#3a2a2b] md:px-11"
      >
        <div className="mx-auto flex max-w-[680px] flex-col gap-6">
          <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#4a2e2f]">
            Work with me
          </div>
          <h2
            id="work-with-me-heading"
            className="m-0 text-balance font-grotesk text-[clamp(28px,4vw,40px)] font-semibold leading-[1.1] tracking-[-0.01em]"
          >
            Explore this in your own body.
          </h2>
          <p className="m-0 font-grotesk text-lg leading-[1.6] text-[#4a2e2f]">
            Private therapeutic breathwork sessions are available in Seattle and
            online.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href={category?.service.href ?? "/breathwork"}>
                {category?.service.label ?? "Explore Therapeutic Breathwork"}
              </Link>
            </Button>
            <Button asChild variant="outline">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Book a session
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Button>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section aria-labelledby="related-heading" className="border-b border-ink">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-ink px-6 py-8 md:px-11">
            <h2
              id="related-heading"
              className="m-0 font-grotesk text-[clamp(24px,3vw,32px)] font-semibold leading-[1.1]"
            >
              Keep reading
            </h2>
            <Link
              href="/journal"
              className="font-grotesk text-sm font-semibold underline-offset-4 hover:underline"
            >
              All writing →
            </Link>
          </div>
          <ArticleGrid articles={related} />
        </section>
      ) : null}

      <SubstackSection />
      <SiteFooterCompact />
    </main>
  );
}
