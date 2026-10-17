import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { AdminShell } from "@/components/admin/admin-shell";
import { DeleteArticleButton } from "@/components/admin/delete-article-button";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin";
import { db } from "@/lib/db";
import { journalArticles } from "@/lib/db/schema";
import { formatDate, getCategory } from "@/lib/journal-shared";

export default async function AdminArticlesPage() {
  const user = await requireAdmin();
  const articles = await db
    .select({
      id: journalArticles.id,
      title: journalArticles.title,
      slug: journalArticles.slug,
      category: journalArticles.category,
      status: journalArticles.status,
      featured: journalArticles.featured,
      updatedAt: journalArticles.updatedAt,
    })
    .from(journalArticles)
    .where(eq(journalArticles.userId, user.id))
    .orderBy(desc(journalArticles.updatedAt));

  return (
    <AdminShell active="/admin">
      <div className="mx-auto flex max-w-[1100px] flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-pink-muted">Journal</div>
            <h1 className="m-0 font-grotesk text-[clamp(34px,5vw,52px)] font-semibold leading-[1] tracking-[-0.02em]">
              Articles
            </h1>
          </div>
          <Button asChild>
            <Link href="/admin/articles/new">New article</Link>
          </Button>
        </div>

        {articles.length === 0 ? (
          <div className="border border-ink px-6 py-14 md:px-10">
            <p className="m-0 max-w-[520px] font-grotesk text-xl leading-[1.5]">
              No articles yet. Your first one starts as a draft, so nothing appears on the site until you publish.
            </p>
          </div>
        ) : (
          <ul className="border-t border-ink">
            {articles.map((a) => (
              <li
                key={a.id}
                className="flex flex-col gap-4 border-b border-ink py-6 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex min-w-0 flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em]">
                    <span
                      className={
                        a.status === "published"
                          ? "border border-ink bg-pink px-2 py-0.5 text-ink"
                          : "border border-ink/40 px-2 py-0.5 text-[#5a5247]"
                      }
                    >
                      {a.status === "published" ? "Published" : "Draft"}
                    </span>
                    {a.featured ? <span className="text-pink-muted">Featured</span> : null}
                    <span className="text-[#8a8074]">{getCategory(a.category)?.name}</span>
                    <span className="text-[#8a8074]">Edited {formatDate(a.updatedAt.toISOString())}</span>
                  </div>
                  <Link
                    href={`/admin/articles/${a.id}`}
                    className="truncate font-grotesk text-xl font-semibold hover:text-pink-muted"
                  >
                    {a.title}
                  </Link>
                </div>
                <div className="flex shrink-0 items-center gap-5 font-grotesk text-sm font-semibold">
                  <Link href={`/admin/articles/${a.id}`} className="underline-offset-4 hover:underline">
                    Edit
                  </Link>
                  {a.status === "published" ? (
                    <Link href={`/journal/${a.slug}`} target="_blank" className="underline-offset-4 hover:underline">
                      View ↗<span className="sr-only"> (opens in a new tab)</span>
                    </Link>
                  ) : (
                    <Link href={`/admin/articles/${a.id}/preview`} className="underline-offset-4 hover:underline">
                      Preview
                    </Link>
                  )}
                  <DeleteArticleButton id={a.id} title={a.title} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminShell>
  );
}
