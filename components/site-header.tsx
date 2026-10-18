"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

/**
 * Each nav item links to its own dedicated, standalone page. The homepage
 * remains a separate long-scroll overview of everything.
 */
const NAV: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Breathwork",
    href: "/breathwork",
    children: [
      { label: "Offerings", href: "/offerings" },
    ],
  },
  { label: "Events", href: "/events" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

const TICKER_TEXT =
  "Monthly donation-based Zoom breathwork · Last Sunday of every month · Coming soon";

function isActive(item: NavItem, active?: string) {
  if (!active) return false;
  if (item.href === active) return true;
  return item.children?.some((child) => child.href === active) ?? false;
}

function DesktopDropdown({ item, active }: { item: NavItem; active?: string }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuId = `nav-menu-${item.label.toLowerCase()}`;
  const highlighted = isActive(item, active);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(event) => {
        if (!wrapperRef.current?.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggleRef.current?.focus();
        }
      }}
    >
      <div className="flex items-center gap-1">
        <Link
          href={item.href}
          aria-current={active === item.href ? "page" : undefined}
          className={
            highlighted
              ? "border-b-2 border-pink-deep pb-0.5"
              : "transition-colors hover:text-pink-muted"
          }
        >
          {item.label}
        </Link>
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={`${open ? "Hide" : "Show"} ${item.label} pages`}
          className="flex items-center justify-center rounded-[2px] p-0.5 text-ink transition-colors hover:text-pink-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-deep"
        >
          <ChevronDown
            size={14}
            strokeWidth={1.75}
            aria-hidden="true"
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Top padding bridges the gap so hover isn't lost moving into the panel */}
      <div
        id={menuId}
        className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition-all duration-200 ease-out ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <ul className="flex min-w-[168px] flex-col rounded-[3px] border border-ink bg-cream py-2">
          {item.children?.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                onClick={() => setOpen(false)}
                aria-current={active === child.href ? "page" : undefined}
                className={`block px-5 py-2.5 font-grotesk text-[15px] font-medium transition-colors hover:text-pink-muted focus-visible:text-pink-muted focus-visible:outline-none ${
                  active === child.href ? "text-pink-deep" : "text-ink"
                }`}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MobileItem({
  item,
  active,
  onNavigate,
}: {
  item: NavItem;
  active?: string;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(
    () => item.children?.some((child) => child.href === active) ?? false,
  );
  const submenuId = `mobile-nav-${item.label.toLowerCase()}`;
  const linkClass = (href: string) =>
    `block px-6 py-4 font-grotesk text-lg font-medium ${
      active === href ? "text-pink-deep" : "text-ink"
    }`;

  if (!item.children) {
    return (
      <li className="border-b border-ink/15 last:border-b-0">
        <Link href={item.href} onClick={onNavigate} className={linkClass(item.href)}>
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li className="border-b border-ink/15 last:border-b-0">
      <div className="flex items-stretch justify-between">
        <Link
          href={item.href}
          onClick={onNavigate}
          className={`flex-1 ${linkClass(item.href)}`}
        >
          {item.label}
        </Link>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls={submenuId}
          aria-label={`${expanded ? "Hide" : "Show"} ${item.label} pages`}
          className="flex min-w-14 items-center justify-center border-l border-ink/15 text-ink"
        >
          <ChevronDown
            size={20}
            strokeWidth={1.75}
            aria-hidden="true"
            className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      <div
        id={submenuId}
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <ul className="flex flex-col overflow-hidden" hidden={!expanded}>
          {item.children.map((child) => (
            <li key={child.href} className="border-t border-ink/10">
              <Link
                href={child.href}
                onClick={onNavigate}
                className={`block py-3.5 pl-10 pr-6 font-grotesk text-base font-medium ${
                  active === child.href ? "text-pink-deep" : "text-ink/80"
                }`}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export function SiteHeader({ active }: { active?: string }) {
  const [open, setOpen] = useState(false);

  // Navigation always opens the standalone page for each topic. The live
  // stream CTA opens the dedicated Virtual Breathwork page.
  const liveTarget = "/live-stream";

  return (
    <header>
      {/* Announcement banner */}
      <a
        href={liveTarget}
        className="block overflow-hidden whitespace-nowrap border-b border-ink bg-pink"
      >
        <div className="inline-block animate-ticker py-2.5 font-mono text-xs tracking-[0.12em] text-[#4a2e2f]">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i}>
              <span className="px-[26px]">{TICKER_TEXT}</span>
              <span className="px-[26px]">✺</span>
            </span>
          ))}
        </div>
      </a>

      {/* Primary nav */}
      <nav
        aria-label="Main"
        className="flex items-center justify-between border-b border-ink px-6 py-5 md:px-11"
      >
        <Link
          href="/"
          className="font-grotesk text-base font-bold tracking-[0.02em]"
        >
          CAITLYNE CORRY
        </Link>
        <div className="flex items-center gap-5 md:gap-[30px]">
          <div className="hidden items-center gap-[30px] font-grotesk text-[15px] font-medium md:flex">
            {NAV.map((item) =>
              item.children ? (
                <DesktopDropdown key={item.href} item={item} active={active} />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active === item.href ? "page" : undefined}
                  className={
                    active === item.href
                      ? "border-b-2 border-pink-deep pb-0.5"
                      : "transition-colors hover:text-pink-muted"
                  }
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>
          <Button asChild variant="pink" size="sm">
            <a href={liveTarget}>Monthly Zoom</a>
          </Button>
          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex items-center justify-center p-1 text-ink md:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile nav panel */}
      {open ? (
        <div
          id="mobile-nav"
          className="border-b border-ink bg-cream md:hidden"
        >
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <MobileItem
                key={item.href}
                item={item}
                active={active}
                onNavigate={() => setOpen(false)}
              />
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
