import type { NewsItem } from "@/lib/types";

// Shared news helpers, safe to import from both client and server code.

// Social-stream API path for the UCS news feed. Shared by the client hook
// (hooks/use-news.ts) and the server loader (lib/news-server.ts).
export const NEWS_API_PATH = "news/ultimate-consultancy-services";

// Article URLs are /news/{public_id}/{title-words}. The public_id (a UUID that
// survives re-imports) is the source of truth; the title words are cosmetic, so
// editing a headline never breaks a shared link — the article page redirects
// outdated title words to the current ones.

const MAX_SLUG_LENGTH = 80;
const PUBLIC_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

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

export function articleHref(item: Pick<NewsItem, "public_id" | "title">): string {
  const titleSlug = slugify(item.title);
  return titleSlug ? `/news/${item.public_id}/${titleSlug}` : `/news/${item.public_id}`;
}

/** True for a well-formed public_id; anything else can skip the API call. */
export function isPublicId(value: string): boolean {
  return PUBLIC_ID_PATTERN.test(value);
}

// The one real content tag for display (category pills, filters). Always
// index 0 — never the "highlight" marker at index 1.
export function getMainTag(item: Pick<NewsItem, "tags">): string {
  return item.tags?.[0] ?? "News";
}
