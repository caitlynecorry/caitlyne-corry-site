import { redirect } from "next/navigation";
import { AuthForm } from "@/components/admin/auth-form";
import { AuthFrame } from "@/components/admin/auth-frame";
import { getAdminSession } from "@/lib/admin";
import { countAdminAccounts } from "@/lib/auth";

export default async function SignInPage() {
  if (await getAdminSession()) redirect("/admin");
  if ((await countAdminAccounts()) === 0) redirect("/admin/setup");

  return (
    <AuthFrame
      eyebrow="Journal · Admin"
      title="Sign in"
      intro="Write, edit, and publish Journal articles."
    >
      <AuthForm mode="sign-in" />
    </AuthFrame>
  );
}
