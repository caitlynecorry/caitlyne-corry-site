import { getPublishedArticles, safeRead } from "@/lib/journal";
import { JOURNAL_AUTHOR, getCategory } from "@/lib/journal-shared";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const revalidate = 60;

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = await safeRead(getPublishedArticles, []);

  const items = articles
    .map((a) => {
      const url = `${SITE_URL}/journal/${a.slug}`;
      const category = getCategory(a.category)?.name;
      return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>
      <dc:creator>${escapeXml(JOURNAL_AUTHOR)}</dc:creator>${
        category ? `\n      <category>${escapeXml(category)}</category>` : ""
      }
      <description>${escapeXml(a.excerpt)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(`${SITE_NAME} — Journal`)}</title>
    <link>${SITE_URL}/journal</link>
    <description>Explorations of breath, the body, and the human experience.</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/journal/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
