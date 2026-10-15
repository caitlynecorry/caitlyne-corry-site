import type { Metadata } from "next";
import { Familjen_Grotesk, Space_Mono } from "next/font/google";
import { IS_INDEXABLE, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const familjen = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Caitlyne Corry | Therapeutic Breathwork, In Person & Online",
    template: "%s | Caitlyne Corry",
  },
  description:
    "Therapeutic breathwork with Caitlyne Corry: conscious connected breathing, somatic tools, and integration, with sessions in Seattle and online.",
  applicationName: SITE_NAME,
  robots: IS_INDEXABLE
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${familjen.variable} ${spaceMono.variable} scroll-smooth bg-cream`}
    >
      <body>{children}</body>
    </html>
  );
}
