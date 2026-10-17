"use client";

import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo2,
  Undo2,
  Unlink,
} from "lucide-react";
import { useRef, useState } from "react";
import { INTERNAL_LINKS } from "@/lib/journal-shared";
import { uploadJournalImage } from "@/lib/upload-image";

function ToolButton({
  label,
  active,
  disabled,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`flex size-9 items-center justify-center border border-transparent transition-colors disabled:opacity-40 ${
        active ? "border-ink bg-pink" : "hover:bg-sand-2"
      }`}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      bold: e.isActive("bold"),
      italic: e.isActive("italic"),
      h2: e.isActive("heading", { level: 2 }),
      h3: e.isActive("heading", { level: 3 }),
      bullet: e.isActive("bulletList"),
      ordered: e.isActive("orderedList"),
      quote: e.isActive("blockquote"),
      link: e.isActive("link"),
      canUndo: e.can().undo(),
      canRedo: e.can().redo(),
    }),
  });

  function setLink(href: string | null) {
    if (!href) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    if (editor.state.selection.empty && !editor.isActive("link")) {
      editor.chain().focus().insertContent({ type: "text", text: href, marks: [{ type: "link", attrs: { href } }] }).run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
  }

  function promptLink() {
    const current = (editor.getAttributes("link").href as string | undefined) ?? "";
    const value = window.prompt("Link address (a page like /breathwork, or a full https:// address)", current);
    if (value === null) return;
    const trimmed = value.trim();
    if (trimmed && !/^(https?:\/\/|\/|mailto:)/i.test(trimmed)) {
      setLink(`https://${trimmed}`);
      return;
    }
    setLink(trimmed || null);
  }

  async function onPickImage(file: File | undefined) {
    if (!file) return;
    setUploadError(null);
    const alt = window.prompt("Describe this image for screen readers and search (alt text):", "");
    if (alt === null) return;
    setUploading(true);
    try {
      const src = await uploadJournalImage(file);
      editor.chain().focus().setImage({ src, alt: alt.trim() }).run();
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="sticky top-0 z-10 flex flex-col border-b border-ink bg-cream">
      <div role="toolbar" aria-label="Formatting" className="flex flex-wrap items-center gap-1 p-2">
        <ToolButton label="Heading" active={state.h2} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 className="size-4" />
        </ToolButton>
        <ToolButton label="Subheading" active={state.h3} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <Heading3 className="size-4" />
        </ToolButton>
        <span aria-hidden="true" className="mx-1 h-6 w-px bg-ink/20" />
        <ToolButton label="Bold" active={state.bold} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="size-4" />
        </ToolButton>
        <ToolButton label="Italic" active={state.italic} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="size-4" />
        </ToolButton>
        <span aria-hidden="true" className="mx-1 h-6 w-px bg-ink/20" />
        <ToolButton label="Bulleted list" active={state.bullet} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List className="size-4" />
        </ToolButton>
        <ToolButton label="Numbered list" active={state.ordered} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="size-4" />
        </ToolButton>
        <ToolButton label="Quote" active={state.quote} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote className="size-4" />
        </ToolButton>
        <ToolButton label="Divider" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus className="size-4" />
        </ToolButton>
        <span aria-hidden="true" className="mx-1 h-6 w-px bg-ink/20" />
        <ToolButton label="Add link" active={state.link} onClick={promptLink}>
          <Link2 className="size-4" />
        </ToolButton>
        {state.link ? (
          <ToolButton label="Remove link" onClick={() => setLink(null)}>
            <Unlink className="size-4" />
          </ToolButton>
        ) : null}
        <label className="sr-only" htmlFor="internal-link">
          Link to a page on your site
        </label>
        <select
          id="internal-link"
          value=""
          onChange={(e) => e.target.value && setLink(e.target.value)}
          className="h-9 border border-ink/30 bg-cream px-2 font-grotesk text-sm"
        >
          <option value="">Link to a page…</option>
          {INTERNAL_LINKS.map((l) => (
            <option key={l.href} value={l.href}>
              {l.label}
            </option>
          ))}
        </select>
        <span aria-hidden="true" className="mx-1 h-6 w-px bg-ink/20" />
        <ToolButton label={uploading ? "Uploading image" : "Insert image"} disabled={uploading} onClick={() => fileRef.current?.click()}>
          <ImagePlus className="size-4" />
        </ToolButton>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
          className="hidden"
          onChange={(e) => onPickImage(e.target.files?.[0])}
        />
        <span aria-hidden="true" className="mx-1 h-6 w-px bg-ink/20" />
        <ToolButton label="Undo" disabled={!state.canUndo} onClick={() => editor.chain().focus().undo().run()}>
          <Undo2 className="size-4" />
        </ToolButton>
        <ToolButton label="Redo" disabled={!state.canRedo} onClick={() => editor.chain().focus().redo().run()}>
          <Redo2 className="size-4" />
        </ToolButton>
      </div>
      {uploading || uploadError ? (
        <p role="status" className={`m-0 border-t border-ink/20 px-3 py-2 font-grotesk text-sm ${uploadError ? "text-[#9b3b3f]" : ""}`}>
          {uploadError ?? "Uploading image…"}
        </p>
      ) : null}
    </div>
  );
}

export function RichTextEditor({
  initialHtml,
  onChange,
  labelledBy,
}: {
  initialHtml: string;
  onChange: (html: string) => void;
  labelledBy: string;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        code: false,
        codeBlock: false,
        link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
      }),
      Image.configure({ inline: false }),
    ],
    content: initialHtml,
    editorProps: {
      attributes: {
        class: "journal-prose min-h-[420px] px-5 py-6 focus:outline-none md:px-8",
        "aria-labelledby": labelledBy,
        "aria-multiline": "true",
        role: "textbox",
      },
    },
    onUpdate: ({ editor: e }) => onChange(e.getHTML()),
  });

  return (
    <div className="border border-ink bg-cream">
      {editor ? <Toolbar editor={editor} /> : <div className="h-[53px] border-b border-ink" />}
      <EditorContent editor={editor} />
    </div>
  );
}
