import { unstable_cache } from "next/cache";
import { NEWS_API_PATH } from "@/lib/news";
import type { NewsItem, PaginatedNewsResponse } from "@/lib/types";

// Server-side news access for article pages and the sitemap.
// Single articles come from GET /news/{company}/items/{public_id}; the full feed
// is only loaded for the sitemap and the "More from UCS" list.

const BASE_URL = process.env.NEXT_PUBLIC_SOCIAL_STREAM_URL ?? "";
const SCAN_PAGE_SIZE = 50; // API rejects page_size > 50
const MAX_SCAN_PAGES = 10; // safety cap: 500 articles
const ARTICLES_TTL_SECONDS = 300;
const NOT_FOUND = 404; // missing or unpublished
const INVALID_ID = 422; // malformed public_id

async function fetchFeedPage(page: number): Promise<PaginatedNewsResponse> {
  const res = await fetch(
    `${BASE_URL}/${NEWS_API_PATH}/feed?page=${page}&page_size=${SCAN_PAGE_SIZE}`
  );
  if (!res.ok) throw new Error(`news feed page ${page}: ${res.status}`);
  return res.json() as Promise<PaginatedNewsResponse>;
}

// Cached in Vercel Data Cache (same pattern as app/api/market-data/route.ts).
// A failed revalidation keeps serving the last good copy.
const getAllArticles = unstable_cache(
  async (): Promise<NewsItem[]> => {
    // First page tells us the total; the rest are fetched in parallel.
    const first = await fetchFeedPage(1);
    const pageCount = Math.min(Math.ceil(first.total / SCAN_PAGE_SIZE), MAX_SCAN_PAGES);
    const rest = await Promise.all(
      Array.from({ length: Math.max(pageCount - 1, 0) }, (_, i) => fetchFeedPage(i + 2))
    );
    return [first, ...rest].flatMap((page) => page.items);
  },
  ["news-all-articles"],
  { revalidate: ARTICLES_TTL_SECONDS, tags: ["news"] }
);

/**
 * One article by public_id, or null if it doesn't exist or isn't published.
 * Server-only (the endpoint isn't open to browsers). Cached in the Vercel Data
 * Cache and deduplicated between generateMetadata and the page render.
 */
export async function getArticle(publicId: string): Promise<NewsItem | null> {
  const res = await fetch(`${BASE_URL}/${NEWS_API_PATH}/items/${encodeURIComponent(publicId)}`, {
    next: { revalidate: ARTICLES_TTL_SECONDS, tags: ["news"] },
  });
  if (res.status === NOT_FOUND || res.status === INVALID_ID) return null;
  if (!res.ok) throw new Error(`news item ${publicId}: ${res.status}`);
  return res.json() as Promise<NewsItem>;
}

export async function getAllArticlesSafe(): Promise<NewsItem[]> {
  try {
    return await getAllArticles();
  } catch (err) {
    console.error("[getAllArticlesSafe]", err);
    return [];
  }
}

/**
 * Other articles to read next: same main tag first, then the most recent.
 * Never throws — a failure just hides the section.
 */
export async function getRelatedArticles(item: NewsItem, limit: number): Promise<NewsItem[]> {
  const others = (await getAllArticlesSafe()).filter((other) => other.public_id !== item.public_id);
  const tag = item.tags?.[0];
  const sameTag = others.filter((other) => other.tags?.[0] === tag);
  const rest = others.filter((other) => other.tags?.[0] !== tag);
  return [...sameTag, ...rest].slice(0, limit);
}
