import Link from "next/link";
import { SignOutButton } from "@/components/admin/sign-out-button";

const NAV = [
  { href: "/admin", label: "Articles" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminShell({
  active,
  children,
}: {
  active: "/admin" | "/admin/settings" | "editor";
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-ink">
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-11">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="font-grotesk text-base font-bold uppercase tracking-[0.02em]">
              Journal Admin
            </Link>
            <nav aria-label="Admin">
              <ul className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.14em]">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active === item.href ? "page" : undefined}
                      className={
                        active === item.href
                          ? "border-b-2 border-pink-deep pb-1"
                          : "text-[#5a5247] hover:text-pink-muted"
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.14em]">
            <Link href="/journal" target="_blank" className="text-[#5a5247] hover:text-pink-muted">
              View Journal ↗<span className="sr-only"> (opens in a new tab)</span>
            </Link>
            <SignOutButton />
          </div>
        </div>
      </header>
      <main className="px-6 py-10 md:px-11 md:py-14">{children}</main>
    </>
  );
}
