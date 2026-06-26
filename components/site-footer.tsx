import Link from "next/link";

const INSTAGRAM = "https://www.instagram.com/caitlynecorry/";
const LINKEDIN = "https://www.linkedin.com/feed/";
const SUBSTACK = "https://substack.com/@caitlynecorry";

/**
 * Full footer — used on the Home page. Three meta columns + big "Let's Connect".
 */
export function SiteFooterFull() {
  return (
    <footer className="bg-ink px-6 pb-11 pt-20 text-cream md:px-11">
      <h2 className="m-0 font-grotesk text-[clamp(56px,9vw,96px)] font-bold uppercase leading-[0.88] tracking-[-0.035em]">
        Let&rsquo;s
        <br />
        Connect
      </h2>
      <div className="mt-12 flex flex-wrap items-end justify-between gap-8">
        <div className="flex flex-wrap gap-[60px]">
          <div>
            <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-pink-deep">
              Email
            </div>
            <Link href="/contact" className="font-grotesk text-[17px]">
              caitlynecorry@gmail.com
            </Link>
          </div>
          <div>
            <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-pink-deep">
              Studio
            </div>
            <div className="font-grotesk text-[17px]">
              Seattle, WA — United States
            </div>
          </div>
          <div>
            <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-pink-deep">
              Social
            </div>
            <div className="flex gap-4 font-grotesk text-[17px]">
              <a href={INSTAGRAM}>Instagram</a>
              <a href={LINKEDIN}>LinkedIn</a>
              <a href={SUBSTACK}>Substack</a>
            </div>
          </div>
        </div>
      </div>
      <FooterBaseline />
    </footer>
  );
}

/**
 * Compact footer — used on inner content pages (About, Offerings, The Work).
 */
export function SiteFooterCompact() {
  return (
    <footer className="bg-ink px-6 pb-11 pt-[70px] text-cream md:px-11">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <h2 className="m-0 font-grotesk text-[clamp(44px,8vw,72px)] font-bold uppercase leading-[0.88] tracking-[-0.03em]">
          Let&rsquo;s
          <br />
          Connect
        </h2>
        <div className="text-right font-grotesk text-base leading-[1.9]">
          <Link href="/contact">caitlynecorry@gmail.com</Link>
          <br />
          Seattle, WA — United States
          <br />
          <a href={INSTAGRAM}>Instagram</a> · <a href={LINKEDIN}>LinkedIn</a> · <a href={SUBSTACK}>Substack</a>
        </div>
      </div>
      <FooterBaseline />
    </footer>
  );
}

function FooterBaseline() {
  return (
    <div className="mt-14 flex justify-between border-t border-cream/20 pt-6 font-mono text-[11px] uppercase tracking-[0.1em] text-[#b7ad9d]">
      <span>Caitlyne Corry — Breathwork Facilitator</span>
      <span>© 2026 — Form Follows Silence</span>
    </div>
  );
}
