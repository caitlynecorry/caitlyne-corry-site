import Image from "next/image";
import Link from "next/link";
import {
  formatDate,
  getCategory,
  type ArticleSummary,
} from "@/lib/journal-shared";

export function ArticleMeta({ article }: { article: ArticleSummary }) {
  const category = getCategory(article.category);
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-[#8a8074]">
      {category ? (
        <Link
          href={`/journal/category/${category.slug}`}
          className="relative z-10 text-pink-muted transition-colors hover:text-ink"
        >
          {category.name}
        </Link>
      ) : null}
      <span aria-hidden="true">·</span>
      <time dateTime={article.publishedAt}>
        {formatDate(article.publishedAt)}
      </time>
    </div>
  );
}

export function ArticleCard({
  article,
  headingLevel = "h3",
}: {
  article: ArticleSummary;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <article className="group relative flex flex-col gap-5 border-b border-ink px-6 py-10 md:border-r md:px-9 md:[&:nth-child(3n)]:border-r-0">
      {article.featuredImageUrl ? (
        <div className="relative aspect-[4/3] overflow-hidden border border-ink">
          <Image
            src={article.featuredImageUrl}
            alt={article.featuredImageAlt ?? ""}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      ) : null}
      <ArticleMeta article={article} />
      <Heading className="m-0 text-balance font-grotesk text-[26px] font-semibold leading-[1.1] tracking-[-0.01em]">
        <Link
          href={`/journal/${article.slug}`}
          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
        >
          {article.title}
        </Link>
      </Heading>
      {article.excerpt ? (
        <p className="m-0 text-pretty font-grotesk text-base leading-[1.65] text-[#5a5247]">
          {article.excerpt}
        </p>
      ) : null}
      <span
        aria-hidden="true"
        className="mt-auto font-grotesk text-sm font-semibold underline-offset-4 group-hover:underline group-has-[a:focus-visible]:underline"
      >
        Read Article →
      </span>
    </article>
  );
}

export function ArticleGrid({
  articles,
  headingLevel,
}: {
  articles: ArticleSummary[];
  headingLevel?: "h2" | "h3";
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard
          key={article.slug}
          article={article}
          headingLevel={headingLevel}
        />
      ))}
    </div>
  );
}

export function FeaturedArticle({ article }: { article: ArticleSummary }) {
  return (
    <article
      className={`group relative grid grid-cols-1 border-b border-ink ${
        article.featuredImageUrl ? "md:grid-cols-[1.15fr_1fr]" : ""
      }`}
    >
      {article.featuredImageUrl ? (
        <div className="relative min-h-[320px] border-b border-ink md:min-h-[480px] md:border-b-0 md:border-r">
          <Image
            src={article.featuredImageUrl}
            alt={article.featuredImageAlt ?? ""}
            fill
            priority
            sizes="(min-width: 768px) 55vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="flex flex-col justify-center gap-6 px-6 py-14 md:px-11">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-ink">
          Featured
        </div>
        <ArticleMeta article={article} />
        <h2 className="m-0 max-w-[760px] text-balance font-grotesk text-[clamp(32px,4.4vw,52px)] font-semibold leading-[1.02] tracking-[-0.02em]">
          <Link
            href={`/journal/${article.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {article.title}
          </Link>
        </h2>
        {article.excerpt ? (
          <p className="m-0 max-w-[560px] text-pretty font-grotesk text-lg leading-[1.6] text-[#5a5247]">
            {article.excerpt}
          </p>
        ) : null}
        <span
          aria-hidden="true"
          className="font-grotesk text-sm font-semibold underline-offset-4 group-hover:underline"
        >
          Read Article →
        </span>
      </div>
    </article>
  );
}
