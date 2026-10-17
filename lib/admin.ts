import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth, countAdminAccounts } from "@/lib/auth";

export async function getAdminSession() {
  return auth.api.getSession({ headers: headers() });
}

/** Server-side gate for every admin page and mutation. */
export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session?.user) {
    redirect((await countAdminAccounts()) > 0 ? "/admin/sign-in" : "/admin/setup");
  }
  return session.user;
}
