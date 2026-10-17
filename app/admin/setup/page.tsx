import { redirect } from "next/navigation";
import { AuthForm } from "@/components/admin/auth-form";
import { AuthFrame } from "@/components/admin/auth-frame";
import { getAdminSession } from "@/lib/admin";
import { countAdminAccounts } from "@/lib/auth";

export default async function SetupPage() {
  if (await getAdminSession()) redirect("/admin");
  if ((await countAdminAccounts()) > 0) redirect("/admin/sign-in");

  return (
    <AuthFrame
      eyebrow="Journal · First-time setup"
      title="Create your admin login"
      intro="This one-time step creates the only login for the Journal. Once it exists, nobody else can sign up."
    >
      <AuthForm mode="setup" />
    </AuthFrame>
  );
}
