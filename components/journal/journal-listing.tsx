import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooterCompact } from "@/components/site-footer";
import {
  ArticleGrid,
  FeaturedArticle,
} from "@/components/journal/article-card";
import { Breadcrumbs, type Crumb } from "@/components/journal/breadcrumbs";
import { CategoryNav } from "@/components/journal/category-nav";
import { SubstackSection } from "@/components/journal/substack-section";
import { pickFeatured, type ArticleSummary } from "@/lib/journal-shared";

export function JournalListing({
  eyebrow,
  title,
  intro,
  articles,
  activeCategory,
  crumbs,
  emptyMessage,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  articles: ArticleSummary[];
  activeCategory?: string;
  crumbs: Crumb[];
  emptyMessage: string;
}) {
  const featured = pickFeatured(articles);
  const rest = articles.filter((a) => a.slug !== featured?.slug);

  return (
    <main className="min-h-screen bg-cream text-ink">
      <SiteHeader active="/journal" />
      <Breadcrumbs items={crumbs} />

      <section className="border-b border-ink px-6 pb-16 pt-[72px] md:px-11">
        <div className="mb-[26px] font-mono text-xs uppercase tracking-[0.2em] text-pink-muted">
          {eyebrow}
        </div>
        <h1 className="m-0 text-balance font-grotesk text-[clamp(48px,11vw,128px)] font-bold uppercase leading-[0.84] tracking-[-0.04em]">
          {title}
        </h1>
        <p className="mt-[34px] max-w-[560px] text-pretty font-grotesk text-[19px] leading-[1.55] text-[#5a5247]">
          {intro}
        </p>
      </section>

      <CategoryNav active={activeCategory} />

      {featured ? (
        <>
          <FeaturedArticle article={featured} />
          {rest.length > 0 ? (
            <section aria-labelledby="more-writing-heading">
              <h2
                id="more-writing-heading"
                className="m-0 border-b border-ink px-6 py-5 font-mono text-xs font-normal uppercase tracking-[0.16em] text-pink-muted md:px-11"
              >
                Recent articles
              </h2>
              <ArticleGrid articles={rest} />
            </section>
          ) : null}
        </>
      ) : (
        <section className="border-b border-ink px-6 py-20 md:px-11">
          <p className="m-0 max-w-[560px] font-grotesk text-[clamp(20px,2.6vw,26px)] font-medium leading-[1.4] tracking-[-0.01em]">
            {emptyMessage}
          </p>
          <div className="mt-8 flex flex-wrap gap-6 font-grotesk text-sm font-semibold">
            <Link href="/breathwork" className="underline-offset-4 hover:underline">
              Explore Therapeutic Breathwork →
            </Link>
            <Link href="/offerings" className="underline-offset-4 hover:underline">
              See offerings →
            </Link>
          </div>
        </section>
      )}

      <SubstackSection />
      <SiteFooterCompact />
    </main>
  );
}
