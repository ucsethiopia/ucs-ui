import { unstable_cache } from "next/cache";
import { NEWS_API_PATH } from "@/lib/news";
import type { NewsItem, PaginatedNewsResponse } from "@/lib/types";

// Server-side news access for article pages and the sitemap.
//
// WORKAROUND: the social-stream API has no public single-article endpoint, so
// we load the whole public feed (it's small) and look the id up in memory.
// When the backend adds GET /news/{company}/{id}, replace getArticleById with
// a direct fetch and keep getAllArticles for the sitemap only.

const BASE_URL = process.env.NEXT_PUBLIC_SOCIAL_STREAM_URL ?? "";
const SCAN_PAGE_SIZE = 50; // API rejects page_size > 50
const MAX_SCAN_PAGES = 10; // safety cap: 500 articles
const ARTICLES_TTL_SECONDS = 300;

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

export async function getArticleById(id: number): Promise<NewsItem | null> {
  const items = await getAllArticles();
  return items.find((item) => item.id === id) ?? null;
}

export async function getAllArticlesSafe(): Promise<NewsItem[]> {
  try {
    return await getAllArticles();
  } catch (err) {
    console.error("[getAllArticlesSafe]", err);
    return [];
  }
}
