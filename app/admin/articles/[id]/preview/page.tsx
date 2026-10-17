import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { getEditableArticle } from "@/lib/admin-articles";
import { getCategory } from "@/lib/journal-shared";
import { sanitizeArticleHtml } from "@/lib/sanitize";

export default async function PreviewArticlePage({ params }: { params: { id: string } }) {
  const user = await requireAdmin();
  const article = await getEditableArticle(params.id, user.id);
  if (!article) notFound();
  const html = sanitizeArticleHtml(article.content);

  return (
    <>
      <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4 border-b border-ink bg-pink px-6 py-3 font-mono text-[11px] uppercase tracking-[0.14em] md:px-11">
        <span>
          Preview · {article.status === "published" ? "Published" : "Draft, not visible on the site"}
        </span>
        <Link href={`/admin/articles/${article.id}`} className="underline underline-offset-4">
          ← Back to editing
        </Link>
      </div>
      <article>
        <header className="border-b border-ink px-6 pb-14 pt-16 md:px-11">
          <div className="mx-auto flex max-w-[860px] flex-col gap-8">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-pink-muted">
              {getCategory(article.category)?.name}
            </div>
            <h1 className="m-0 text-balance font-grotesk text-[clamp(38px,6.2vw,76px)] font-semibold leading-[1] tracking-[-0.03em]">
              {article.title}
            </h1>
            {article.excerpt ? (
              <p className="m-0 max-w-[640px] font-grotesk text-[20px] leading-[1.55] text-[#5a5247]">
                {article.excerpt}
              </p>
            ) : null}
          </div>
        </header>
        {article.featuredImageUrl ? (
          <div className="relative aspect-[16/9] max-h-[720px] w-full border-b border-ink">
            <Image
              src={article.featuredImageUrl}
              alt={article.featuredImageAlt ?? ""}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ) : null}
        <div className="px-6 py-16 md:px-11">
          <div className="journal-prose mx-auto max-w-[680px]" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </article>
    </>
  );
}
