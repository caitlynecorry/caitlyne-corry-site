"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteArticle } from "@/app/admin/actions";

export function DeleteArticleButton({
  id,
  title,
  redirectTo,
}: {
  id: number;
  title: string;
  redirectTo?: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;
        startTransition(async () => {
          await deleteArticle(id);
          if (redirectTo) router.push(redirectTo);
          router.refresh();
        });
      }}
      className="font-grotesk text-sm font-semibold text-[#9b3b3f] underline-offset-4 hover:underline disabled:opacity-50"
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
