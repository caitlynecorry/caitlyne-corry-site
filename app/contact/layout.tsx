import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact | Caitlyne Corry",
  description:
    "Questions about private, couples, or group breathwork, or hosting a gathering in Seattle? Send Caitlyne a note. She reads every one.",
  path: "/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
