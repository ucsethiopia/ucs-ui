"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
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
// Server-paginated hook for the /news archive page: GET /feed?page=N&page_size=M.
// The page owns *when* to fetch (it keeps a buffer of unseen items ahead of
// what's on screen); this hook only owns fetching, merging and end detection.
// The total is read from each response, never assumed.

function fetchFeedPage(page: number, pageSize: number): Promise<PaginatedNewsResponse> {
  return fetch(`${BASE_URL}/${NEWS_PATH}/feed?page=${page}&page_size=${pageSize}`).then((res) => {
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return res.json() as Promise<PaginatedNewsResponse>;
  });
}

// Appends a page, skipping ids already loaded — an article published between
// requests shifts the server's offsets, which would otherwise repeat an item.
function mergeUnique(prev: NewsItem[], next: NewsItem[]): NewsItem[] {
  const seen = new Set(prev.map((item) => item.id));
  return [...prev, ...next.filter((item) => !seen.has(item.id))];
}

export const useNews = (pageSize = 18) => {
  const [data, setData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  // Set when a "more" fetch fails, so the page stops auto-prefetching (which
  // would otherwise retry in a tight loop) until the user clicks to retry.
  const [fetchFailed, setFetchFailed] = useState(false);
  // Refs, not state: the guard must flip synchronously so back-to-back calls
  // (double click, or the page's prefetch effect re-running) can't request
  // the same page twice.
  const lastPageRef = useRef(0);
  const inFlightRef = useRef(false);

  const applyPage = useCallback(
    (paginated: PaginatedNewsResponse, page: number, loadedBefore: number) => {
      lastPageRef.current = page;
      setTotal(paginated.total);
      setHasMore(
        paginated.items.length > 0 &&
          loadedBefore + paginated.items.length < paginated.total
      );
    },
    []
  );

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    inFlightRef.current = true;

    fetchFeedPage(1, pageSize)
      .then((paginated) => {
        if (cancelled) return;
        setData(mergeUnique([], paginated.items));
        applyPage(paginated, 1, 0);
      })
      .catch((err) => {
        console.error("[useNews]", err);
        if (!cancelled) {
          setData([]);
          setHasMore(false);
        }
      })
      .finally(() => {
        inFlightRef.current = false;
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [pageSize, applyPage]);

  // Offsets come from the server's page number, so `loadedBefore` is the
  // count of server rows consumed (pages × size), not the de-duplicated length.
  const fetchNextPage = useCallback(async () => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setIsFetchingMore(true);
    const nextPage = lastPageRef.current + 1;

    try {
      const paginated = await fetchFeedPage(nextPage, pageSize);
      setFetchFailed(false);
      setData((prev) => mergeUnique(prev, paginated.items));
      applyPage(paginated, nextPage, lastPageRef.current * pageSize);
    } catch (err) {
      // hasMore is left untouched so the button stays and can retry.
      console.error("[useNews fetchNextPage]", err);
      setFetchFailed(true);
    } finally {
      inFlightRef.current = false;
      setIsFetchingMore(false);
    }
  }, [pageSize, applyPage]);

  const categories = useMemo(() => deriveCategories(data), [data]);

  return { data, loading, isFetchingMore, hasMore, fetchFailed, fetchNextPage, total, categories };
};

// ─── useMarketNews (stub — no API endpoint) ───────────────────────────────────
// Market/economic news was removed from the home page in phase 8.4.
// Kept as an empty stub so any remaining imports don't break.
export const useMarketNews = () => {
  return { data: [] as NewsItem[], loading: false };
};
