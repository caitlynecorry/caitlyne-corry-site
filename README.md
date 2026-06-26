# Caitlyne Corry — Form Follows Silence

A complete **Next.js 14 (App Router)** website for Caitlyne Corry, somatic breathwork
facilitator. Built with **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

Bold, type-forward grotesque aesthetic on a warm cream canvas with a soft-pink accent.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build && npm run start   # production build
```

> Requires Node 18.17+.

## Pages

| Route          | File                          | What it is                                            |
| -------------- | ----------------------------- | ----------------------------------------------------- |
| `/`            | `app/page.tsx`                | Home — hero, offerings grid, statement, about, the work, live CTA |
| `/offerings`   | `app/offerings/page.tsx`      | The four ways to work together                        |
| `/the-work`    | `app/the-work/page.tsx`       | The method — Body → Story → Breath                    |
| `/about`       | `app/about/page.tsx`          | Meet Caitlyne — story + timeline                      |
| `/contact`     | `app/contact/page.tsx`        | Contact form (client component)                       |
| `/live-stream` | `app/live-stream/page.tsx`    | Weekly live session info + reservation form           |

## Architecture

```
app/
  layout.tsx        Root layout — loads Familjen Grotesk + Space Mono via next/font
  globals.css       Tailwind layers + shadcn CSS variables (tuned to brand) + .hatch utility
  page.tsx          Home
  <route>/page.tsx  One folder per page
components/
  site-header.tsx   Ticker + mono meta bar + nav (active-link aware)
  site-footer.tsx   SiteFooterFull (home) and SiteFooterCompact (inner pages)
  ui/               shadcn/ui primitives: button, input, textarea, label, select
lib/
  utils.ts          cn() class-merge helper
tailwind.config.ts  Brand color tokens + font families + ticker keyframes
components.json      shadcn/ui config — run `npx shadcn@latest add <component>` to add more
```

### Design tokens (Tailwind colors)

| Token        | Hex       | Use                                  |
| ------------ | --------- | ------------------------------------ |
| `cream`      | `#F6F2EA` | Page background                      |
| `ink`        | `#26221C` | Text, hairline borders, dark footer  |
| `pink`       | `#E3ABAE` | Accent bands, buttons, ticker        |
| `pink-deep`  | `#C98388` | Accent highlight (focus ring, hero word) |
| `pink-muted` | `#C07F84` | Eyebrow / label text                 |
| `sand`       | `#E9E2D4` | Image area base                      |
| `sand-2`     | `#EFE8DA` | Hover / alt panel                    |

Typography: **Familjen Grotesk** (`font-grotesk`) for everything, **Space Mono**
(`font-mono`) for meta labels, eyebrows, and numerals.

## Notes for the developer

- These pages were ported from HTML design prototypes. Layout, type scale, spacing,
  and color are production-faithful. Large headings use `clamp()` for responsive
  scaling; the grid sections collapse to a single column under the `md` breakpoint.
- The **Contact** and **Live Stream** forms are client components with local
  `useState` and a faked success state. Wire them to your real backend / email
  service (e.g. a route handler, Resend, Formspree) where marked by `onSubmit`.
- **Photos are placeholders.** The offerings/about image areas use the brand
  `cc02.webp` / `cc03.webp` from the live site or a diagonal `.hatch` fill. Drop in
  final photography by replacing the `backgroundImage` URLs (or swap to `next/image`).
  Remote images from `www.caitlynecorry.com` are already allowlisted in
  `next.config.mjs`.
- shadcn/ui is fully wired (`components.json`): add more primitives any time with
  `npx shadcn@latest add <component>`.
