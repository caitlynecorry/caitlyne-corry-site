import { AdminShell } from "@/components/admin/admin-shell";
import { ArticleEditor } from "@/components/admin/article-editor";
import { requireAdmin } from "@/lib/admin";

export default async function NewArticlePage() {
  await requireAdmin();
  return (
    <AdminShell active="editor">
      <ArticleEditor initial={null} />
    </AdminShell>
  );
}
