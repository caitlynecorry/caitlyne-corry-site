import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { ArticleEditor } from "@/components/admin/article-editor";
import { requireAdmin } from "@/lib/admin";
import { getEditableArticle } from "@/lib/admin-articles";

export default async function EditArticlePage({ params }: { params: { id: string } }) {
  const user = await requireAdmin();
  const article = await getEditableArticle(params.id, user.id);
  if (!article) notFound();

  return (
    <AdminShell active="editor">
      <ArticleEditor key={article.id} initial={article} />
    </AdminShell>
  );
}
