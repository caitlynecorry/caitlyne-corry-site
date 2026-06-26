import type { Metadata } from "next";
import { Familjen_Grotesk, Space_Mono } from "next/font/google";
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
  title: "Caitlyne Corry — Form Follows Silence",
  description:
    "Somatic breathwork facilitator, movement practitioner, and intuitive guide based in Seattle. The work of coming home to yourself.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${familjen.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
