"use client";

import { useState, useEffect, useMemo } from "react";
import type { NewsItem, PaginatedNewsResponse } from "@/lib/types";

export type { NewsItem };

const BASE_URL = process.env.NEXT_PUBLIC_SOCIAL_STREAM_URL ?? "";
const NEWS_PATH = "news/ultimate-consultancy-services";

// Each item carries exactly one content tag at tags[0]; a second tag
// ("highlight") may follow it to mark the item for the Highlights spotlight
// rather than describing its content. See isHighlight/getMainTag below.

// True when this item belongs in the Highlights spotlight — i.e. it has a
// second tag beyond its main category tag. Works for local or international
// items alike; scope no longer decides spotlight membership.
export function isHighlight(item: NewsItem): boolean {
  return (item.tags?.length ?? 0) > 1;
}

// The one real content tag for display (category pills, filters). Always
// index 0 — never the "highlight" marker at index 1.
export function getMainTag(item: NewsItem): string {
  return item.tags?.[0] ?? "News";
}

// Derives the category filter list from each item's main tag (tags[0]) —
// never the "highlight" marker — so the UI never offers a filter with zero
// matching articles, and "Highlight" never shows up as a fake category.
// Recomputes whenever `data` grows (e.g. after loadMore).
function deriveCategories(items: NewsItem[]): string[] {
  const seen = new Map<string, string>();
  for (const item of items) {
    const tag = getMainTag(item);
    const key = tag.toLowerCase();
    if (!seen.has(key)) seen.set(key, tag);
  }
  const sorted = Array.from(seen.values()).sort((a, b) => a.localeCompare(b));
  return ["All", ...sorted];
}

// ─── useFirmNews ──────────────────────────────────────────────────────────────
// Fetches the latest 9 news items for the home page FirmNews carousel.

export const useFirmNews = (_limit = 9) => {
  const [data, setData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore] = useState(true); // always show "Load More" → /news

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetch(`${BASE_URL}/${NEWS_PATH}/latest`)
      .then((res) => {
        if (!res.ok) throw new Error(`API error ${res.status}`);
        return res.json() as Promise<{ items: NewsItem[] }>;
      })
      .then(({ items }) => {
        if (!cancelled) setData(items);
      })
      .catch((err) => {
        console.error("[useFirmNews]", err);
        if (!cancelled) setData([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  return { data, loading, hasMore };
};

// ─── useNews ──────────────────────────────────────────────────────────────────
// Paginated hook for the /news archive page.
// Initial load: GET /news/latest (first 9).
// Load more: GET /news?page=N&per_page=9.

export const useNews = (initialLimit = 9) => {
  const [data, setData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // Initial load via /news/latest
  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetch(`${BASE_URL}/${NEWS_PATH}/feed?page=1&page_size=${initialLimit}`)
      .then((res) => {
        if (!res.ok) throw new Error(`API error ${res.status}`);
        return res.json() as Promise<PaginatedNewsResponse>;
      })
      .then((paginated) => {
        if (cancelled) return;
        setData(paginated.items);
        setPage(1);
        setTotal(paginated.total);
        setHasMore(paginated.items.length < paginated.total);
      })
      .catch((err) => {
        console.error("[useNews]", err);
        if (!cancelled) setData([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [initialLimit]);

  const loadMore = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    const nextPage = page + 1;

    try {
      const res = await fetch(
        `${BASE_URL}/${NEWS_PATH}/feed?page=${nextPage}&page_size=${initialLimit}`
      );
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const paginated: PaginatedNewsResponse = await res.json();
      setData((prev) => [...prev, ...paginated.items]);
      setPage(nextPage);
      setTotal(paginated.total);
      setHasMore(data.length + paginated.items.length < paginated.total);
    } catch (err) {
      console.error("[useNews loadMore]", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const categories = useMemo(() => deriveCategories(data), [data]);

  return { data, loading, isLoadingMore, hasMore, loadMore, total, categories };
};

// ─── useMarketNews (stub — no API endpoint) ───────────────────────────────────
// Market/economic news was removed from the home page in phase 8.4.
// Kept as an empty stub so any remaining imports don't break.
export const useMarketNews = () => {
  return { data: [] as NewsItem[], loading: false };
};
