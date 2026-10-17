import Link from "next/link";
import { CATEGORIES } from "@/lib/journal-shared";

export function CategoryNav({ active }: { active?: string }) {
  const items = [
    { href: "/journal", label: "All writing", key: undefined },
    ...CATEGORIES.map((c) => ({
      href: `/journal/category/${c.slug}`,
      label: c.name,
      key: c.slug as string,
    })),
  ];

  return (
    <nav
      aria-label="Journal categories"
      className="overflow-x-auto border-b border-ink"
    >
      <ul className="flex min-w-max items-center gap-8 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.14em] md:px-11">
        {items.map((item) => {
          const isActive = item.key === active;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "border-b-2 border-pink-deep pb-1 text-ink"
                    : "text-[#5a5247] transition-colors hover:text-pink-muted"
                }
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
