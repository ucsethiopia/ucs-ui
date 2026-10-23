import type { NewsItem } from "@/lib/types";

// Shared news helpers, safe to import from both client and server code.

// Social-stream API path for the UCS news feed. Shared by the client hook
// (hooks/use-news.ts) and the server loader (lib/news-server.ts).
export const NEWS_API_PATH = "news/ultimate-consultancy-services";

// Article URLs are /news/{id}-{title-slug}. The numeric id is the source of
// truth; the slug is cosmetic, so editing a headline never breaks a shared
// link — the article page redirects stale slugs to the current one.

const MAX_SLUG_LENGTH = 80;

export function slugify(title: string): string {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, MAX_SLUG_LENGTH)
    .replace(/-+$/, "");
}

export function articleSlug(item: Pick<NewsItem, "id" | "title">): string {
  const titleSlug = slugify(item.title);
  return titleSlug ? `${item.id}-${titleSlug}` : String(item.id);
}

export function articleHref(item: Pick<NewsItem, "id" | "title">): string {
  return `/news/${articleSlug(item)}`;
}

/** Leading integer of a slug ("365-ucs-signs…" → 365), or null if absent. */
export function parseArticleId(slug: string): number | null {
  const match = /^(\d+)(?:-|$)/.exec(slug);
  return match ? Number(match[1]) : null;
}

// The one real content tag for display (category pills, filters). Always
// index 0 — never the "highlight" marker at index 1.
export function getMainTag(item: Pick<NewsItem, "tags">): string {
  return item.tags?.[0] ?? "News";
}
