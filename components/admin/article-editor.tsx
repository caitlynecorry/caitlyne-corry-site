"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { saveArticle } from "@/app/admin/actions";
import { DeleteArticleButton } from "@/components/admin/delete-article-button";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { EditableArticle } from "@/lib/admin-articles";
import { CATEGORIES, slugify } from "@/lib/journal-shared";
import { uploadJournalImage } from "@/lib/upload-image";

type FormState = Omit<EditableArticle, "id" | "publishedAt">;

const EMPTY: FormState = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  featuredImageUrl: null,
  featuredImageAlt: null,
  seoTitle: null,
  metaDescription: null,
  featured: false,
  status: "draft",
};

function Counter({ value, ideal }: { value: string; ideal: number }) {
  return (
    <span className={`font-mono text-[11px] ${value.length > ideal ? "text-[#9b3b3f]" : "text-[#8a8074]"}`}>
      {value.length}/{ideal}
    </span>
  );
}

const fieldHint = "m-0 mt-2 font-grotesk text-sm leading-[1.55] text-[#5a5247]";
const sectionHeading = "m-0 font-mono text-xs font-normal uppercase tracking-[0.16em] text-pink-muted";

export function ArticleEditor({ initial }: { initial: EditableArticle | null }) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initial ?? EMPTY);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();
  const [imageUploading, setImageUploading] = useState(false);
  const imageInput = useRef<HTMLInputElement>(null);

  const isPublished = initial?.status === "published";
  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  function submit(status: "draft" | "published") {
    setMessage(null);
    startTransition(async () => {
      const result = await saveArticle({
        id: initial?.id ?? null,
        ...form,
        category: form.category as never,
        status,
      });
      if (!result.ok) {
        setMessage({ ok: false, text: result.error });
        return;
      }
      setForm((f) => ({ ...f, status, slug: result.slug ?? f.slug }));
      setMessage({
        ok: true,
        text: status === "published" ? "Published. It's live on the Journal." : "Draft saved. It isn't visible on the site.",
      });
      if (!initial) router.replace(`/admin/articles/${result.id}`);
      router.refresh();
    });
  }

  async function onFeaturedImage(file: File | undefined) {
    if (!file) return;
    setMessage(null);
    setImageUploading(true);
    try {
      update("featuredImageUrl", await uploadJournalImage(file));
    } catch (error) {
      setMessage({ ok: false, text: error instanceof Error ? error.message : "Upload failed." });
    } finally {
      setImageUploading(false);
      if (imageInput.current) imageInput.current.value = "";
    }
  }

  const previewTitle = form.seoTitle || form.title || "Article title";
  const previewDescription = form.metaDescription || form.excerpt || "Your excerpt appears here in search results.";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit(form.status);
      }}
      className="mx-auto flex max-w-[1200px] flex-col gap-10"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-3">
          <Link href="/admin" className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#5a5247] hover:text-pink-muted">
            ← All articles
          </Link>
          <h1 className="m-0 font-grotesk text-[clamp(30px,4vw,44px)] font-semibold leading-[1] tracking-[-0.02em]">
            {initial ? "Edit article" : "New article"}
          </h1>
        </div>
        <span
          className={`font-mono text-[11px] uppercase tracking-[0.14em] ${
            isPublished ? "border border-ink bg-pink px-2 py-1" : "border border-ink/40 px-2 py-1 text-[#5a5247]"
          }`}
        >
          {isPublished ? "Published" : "Draft"}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
        <div className="flex min-w-0 flex-col gap-8">
          <div className="flex flex-col gap-1">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => {
                update("title", e.target.value);
                if (!slugTouched) update("slug", slugify(e.target.value));
              }}
              className="text-2xl font-semibold"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="slug">URL slug</Label>
            <div className="flex items-baseline gap-1 border-b border-ink">
              <span className="shrink-0 font-mono text-sm text-[#8a8074]">/journal/</span>
              <Input
                id="slug"
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  update("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"));
                }}
                className="border-b-0 font-mono text-base"
              />
            </div>
            {isPublished ? (
              <p className={fieldHint}>Changing the slug of a published article changes its address, and old links will stop working.</p>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Counter value={form.excerpt} ideal={200} />
            </div>
            <Textarea id="excerpt" rows={3} value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} />
            <p className={fieldHint}>One or two sentences shown on the Journal page and under the article title.</p>
          </div>

          <div className="flex flex-col gap-2">
            <span id="content-label" className="font-grotesk text-sm font-semibold">
              Article
            </span>
            <RichTextEditor
              initialHtml={form.content}
              onChange={(html) => update("content", html)}
              labelledBy="content-label"
            />
            <p className={fieldHint}>
              Use “Heading” for main sections and “Subheading” inside them. The article title is already the page’s top heading.
            </p>
          </div>
        </div>

        <aside className="flex flex-col gap-8 lg:sticky lg:top-6 lg:self-start">
          <section className="flex flex-col gap-4 border border-ink p-5">
            <div className="flex flex-col gap-3">
              <Button type="button" disabled={pending || imageUploading} onClick={() => submit("published")}>
                {pending ? "Saving…" : isPublished ? "Update published article" : "Publish"}
              </Button>
              <Button type="button" variant="outline" disabled={pending || imageUploading} onClick={() => submit("draft")}>
                {isPublished ? "Unpublish (move to drafts)" : "Save draft"}
              </Button>
            </div>
            {message ? (
              <p role="status" className={`m-0 font-grotesk text-sm leading-[1.5] ${message.ok ? "" : "text-[#9b3b3f]"}`}>
                {message.text}
              </p>
            ) : null}
            {initial ? (
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/20 pt-4 font-grotesk text-sm font-semibold">
                {isPublished ? (
                  <Link href={`/journal/${initial.slug}`} target="_blank" className="underline-offset-4 hover:underline">
                    View live ↗<span className="sr-only"> (opens in a new tab)</span>
                  </Link>
                ) : (
                  <Link href={`/admin/articles/${initial.id}/preview`} className="underline-offset-4 hover:underline">
                    Preview saved draft
                  </Link>
                )}
                <DeleteArticleButton id={initial.id} title={form.title || "this article"} redirectTo="/admin" />
              </div>
            ) : null}
          </section>

          <section className="flex flex-col gap-5">
            <h2 className={sectionHeading}>Details</h2>
            <div className="flex flex-col gap-1">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className="w-full border-0 border-b border-ink bg-transparent py-3 font-grotesk text-base focus-visible:border-pink-deep focus-visible:outline-none"
              >
                <option value="" disabled>
                  Choose a category
                </option>
                {CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <label className="flex items-start gap-3 font-grotesk text-sm leading-[1.5]">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => update("featured", e.target.checked)}
                className="mt-0.5 size-4 accent-[#26221C]"
              />
              <span>
                <span className="font-semibold">Feature this article</span>
                <br />
                <span className="text-[#5a5247]">Shown large at the top of the Journal. Featuring it un-features any other article.</span>
              </span>
            </label>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className={sectionHeading}>Featured image</h2>
            {form.featuredImageUrl ? (
              <div className="relative aspect-[4/3] border border-ink">
                <Image src={form.featuredImageUrl} alt={form.featuredImageAlt ?? ""} fill sizes="340px" className="object-cover" />
              </div>
            ) : (
              <div className="hatch flex aspect-[4/3] items-center justify-center border border-ink/40 font-mono text-[11px] uppercase tracking-[0.14em] text-[#5a5247]">
                No image
              </div>
            )}
            <div className="flex flex-wrap gap-3">
              <Button type="button" size="sm" variant="outline" disabled={imageUploading} onClick={() => imageInput.current?.click()}>
                {imageUploading ? "Uploading…" : form.featuredImageUrl ? "Replace image" : "Upload image"}
              </Button>
              {form.featuredImageUrl ? (
                <Button type="button" size="sm" variant="ghost" onClick={() => update("featuredImageUrl", null)}>
                  Remove
                </Button>
              ) : null}
            </div>
            <input
              ref={imageInput}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
              className="hidden"
              aria-label="Upload featured image"
              onChange={(e) => onFeaturedImage(e.target.files?.[0])}
            />
            {form.featuredImageUrl ? (
              <div className="flex flex-col gap-1">
                <Label htmlFor="alt">Image description (alt text)</Label>
                <Textarea
                  id="alt"
                  rows={2}
                  value={form.featuredImageAlt ?? ""}
                  onChange={(e) => update("featuredImageAlt", e.target.value)}
                />
                <p className={fieldHint}>Describe what’s in the photo, for screen readers and search engines.</p>
              </div>
            ) : null}
          </section>

          <section className="flex flex-col gap-5">
            <h2 className={sectionHeading}>Search engines</h2>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="seo-title">SEO title</Label>
                <Counter value={form.seoTitle ?? ""} ideal={60} />
              </div>
              <Input
                id="seo-title"
                value={form.seoTitle ?? ""}
                placeholder={form.title ? `${form.title} | Caitlyne Corry` : "Defaults to the article title"}
                onChange={(e) => update("seoTitle", e.target.value)}
                className="text-base"
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="meta">Meta description</Label>
                <Counter value={form.metaDescription ?? ""} ideal={160} />
              </div>
              <Textarea
                id="meta"
                rows={3}
                value={form.metaDescription ?? ""}
                placeholder="Defaults to the excerpt"
                onChange={(e) => update("metaDescription", e.target.value)}
              />
            </div>
            <div aria-label="Search result preview" className="flex flex-col gap-1 border border-ink/30 bg-sand-2 p-4">
              <span className="truncate font-mono text-[11px] text-[#5a5247]">
                caitlynecorry.com › journal › {form.slug || "your-article"}
              </span>
              <span className="line-clamp-2 font-grotesk text-base font-semibold leading-[1.3] text-[#1a3d8f]">{previewTitle}</span>
              <span className="line-clamp-3 font-grotesk text-sm leading-[1.5] text-[#5a5247]">{previewDescription}</span>
            </div>
          </section>
        </aside>
      </div>
    </form>
  );
}
