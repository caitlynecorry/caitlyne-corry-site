import sanitizeHtml from "sanitize-html";

const OWN_HOSTS = new Set(["caitlynecorry.com", "www.caitlynecorry.com"]);

function isExternal(href: string): boolean {
  if (!/^https?:\/\//i.test(href)) return false;
  try {
    return !OWN_HOSTS.has(new URL(href).hostname);
  } catch {
    return false;
  }
}

/** Restricts article HTML to the formatting the editor can produce. */
export function sanitizeArticleHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "p",
      "h2",
      "h3",
      "strong",
      "em",
      "u",
      "s",
      "a",
      "ul",
      "ol",
      "li",
      "blockquote",
      "img",
      "br",
      "hr",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "loading"],
    },
    allowedSchemes: ["https", "http", "mailto"],
    allowedSchemesByTag: { img: ["https"] },
    allowProtocolRelative: false,
    transformTags: {
      a: (_tag, attribs) => {
        const href = attribs.href ?? "";
        const next: Record<string, string> = { href };
        if (isExternal(href)) {
          next.target = "_blank";
          next.rel = "noopener noreferrer";
        }
        return { tagName: "a", attribs: next };
      },
      img: (_tag, attribs) => ({
        tagName: "img",
        attribs: {
          src: attribs.src ?? "",
          alt: attribs.alt ?? "",
          loading: "lazy",
        },
      }),
    },
  }).trim();
}
