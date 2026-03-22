"use client";

import { useState, useEffect } from "react";
import type { NewsItem, PaginatedNewsResponse } from "@/lib/types";

export type { NewsItem };

const BASE_URL = process.env.NEXT_PUBLIC_UCS_SERVICE_API_URL ?? "";

export const newsCategories = [
  "All",
  "Strategy",
  "Partnership",
  "Training",
  "Research",
  "Events",
  "Advisory",
  "Company News",
];

// ─── useFirmNews ──────────────────────────────────────────────────────────────
// Fetches the latest 9 news items for the home page FirmNews carousel.

export const useFirmNews = (_limit = 9) => {
  const [data, setData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore] = useState(true); // always show "Load More" → /news

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetch(`${BASE_URL}/news/latest`)
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

    fetch(`${BASE_URL}/news/latest`)
      .then((res) => {
        if (!res.ok) throw new Error(`API error ${res.status}`);
        return res.json() as Promise<{ items: NewsItem[] }>;
      })
      .then(({ items }) => {
        if (!cancelled) {
          setData(items);
          setPage(1);
          // Fetch total count to know if there are more pages
          return fetch(`${BASE_URL}/news?page=1&per_page=${initialLimit}`);
        }
      })
      .then((res) => {
        if (!res || cancelled) return;
        return res.json() as Promise<PaginatedNewsResponse>;
      })
      .then((paginated) => {
        if (!paginated || cancelled) return;
        setTotal(paginated.total);
        setHasMore(paginated.total > initialLimit);
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
        `${BASE_URL}/news?page=${nextPage}&per_page=${initialLimit}`
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

  return { data, loading, isLoadingMore, hasMore, loadMore, total };
};

// ─── useMarketNews (stub — no API endpoint) ───────────────────────────────────
// Market/economic news was removed from the home page in phase 8.4.
// Kept as an empty stub so any remaining imports don't break.
export const useMarketNews = () => {
  return { data: [] as NewsItem[], loading: false };
};
