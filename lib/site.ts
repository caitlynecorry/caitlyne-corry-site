import type { Metadata } from "next";

export const SITE_URL = "https://www.caitlynecorry.com";
export const SITE_NAME = "Caitlyne Corry";
export const BOOKING_URL = "https://app.acuityscheduling.com/schedule/bc35c44e";

// Vercel sets VERCEL_ENV to "preview" or "development" outside production;
// those deployments must stay out of search indexes.
export const IS_INDEXABLE =
  !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";

export const PUBLIC_ROUTES = [
  "/",
  "/offerings",
  "/seattle-breathwork",
  "/online-breathwork",
  "/events",
  "/breathwork",
  "/about",
  "/contact",
  "/live-stream",
  "/journal",
] as const;

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}
