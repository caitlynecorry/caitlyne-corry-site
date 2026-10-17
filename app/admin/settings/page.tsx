import { eq } from "drizzle-orm";
import { AdminShell } from "@/components/admin/admin-shell";
import { SettingsForm } from "@/components/admin/settings-form";
import { requireAdmin } from "@/lib/admin";
import { db } from "@/lib/db";
import { journalSettings } from "@/lib/db/schema";

export default async function SettingsPage() {
  await requireAdmin();
  const [row] = await db
    .select({ substackUrl: journalSettings.substackUrl })
    .from(journalSettings)
    .where(eq(journalSettings.id, 1))
    .limit(1);

  return (
    <AdminShell active="/admin/settings">
      <div className="mx-auto flex max-w-[720px] flex-col gap-10">
        <div className="flex flex-col gap-3">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-pink-muted">Journal</div>
          <h1 className="m-0 font-grotesk text-[clamp(34px,5vw,52px)] font-semibold leading-[1] tracking-[-0.02em]">
            Settings
          </h1>
        </div>
        <SettingsForm initialSubstackUrl={row?.substackUrl ?? ""} />
      </div>
    </AdminShell>
  );
}
