import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { JsonLd } from "@/components/journal/json-ld";

export type Crumb = { label: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${SITE_URL}${item.href === "/" ? "/" : item.href}`,
    })),
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className="border-b border-ink">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-[#8a8074] md:px-11">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-2">
                {isLast ? (
                  <span aria-current="page" className="line-clamp-1 text-ink">
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link href={item.href} className="hover:text-pink-muted">
                      {item.label}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={jsonLd} />
    </>
  );
}
