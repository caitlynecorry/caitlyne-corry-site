"use client";

import { useState, useTransition } from "react";
import { saveSettings } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SettingsForm({ initialSubstackUrl }: { initialSubstackUrl: string }) {
  const [url, setUrl] = useState(initialSubstackUrl);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="flex flex-col gap-6 border border-ink p-6 md:p-9"
      onSubmit={(e) => {
        e.preventDefault();
        setMessage(null);
        startTransition(async () => {
          const result = await saveSettings(url);
          setMessage(
            result.ok
              ? { ok: true, text: url.trim() ? "Saved. The Substack section is live." : "Saved. The Substack section is hidden." }
              : { ok: false, text: result.error }
          );
        });
      }}
    >
      <div className="flex flex-col gap-1">
        <Label htmlFor="substack">Substack URL</Label>
        <Input
          id="substack"
          name="substack"
          inputMode="url"
          placeholder="https://substack.com/@yourname"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <p className="m-0 mt-2 font-grotesk text-sm leading-[1.6] text-[#5a5247]">
          Shown as a subscribe section on the Journal and every article. Leave it empty to hide the section.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-5">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save settings"}
        </Button>
        {message ? (
          <p role="status" className={`m-0 font-grotesk text-sm ${message.ok ? "text-ink" : "text-[#9b3b3f]"}`}>
            {message.text}
          </p>
        ) : null}
      </div>
    </form>
  );
}
