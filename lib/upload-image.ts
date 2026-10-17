"use client";

import { upload } from "@vercel/blob/client";

const MAX_BYTES = 10 * 1024 * 1024;

export async function uploadJournalImage(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("Choose an image file.");
  if (file.size > MAX_BYTES) throw new Error("Images must be under 10 MB.");

  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
  const blob = await upload(`journal/${safeName}`, file, {
    access: "public",
    handleUploadUrl: "/api/admin/upload",
  });
  return blob.url;
}
