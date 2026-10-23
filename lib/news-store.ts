import type { NewsItem } from "@/lib/types";

// Client-side memory of every article the news hooks have loaded. Lets the
// article modal (app/@modal/(.)news/[slug]) open instantly from data already
// on screen instead of waiting on a server round-trip.
const loaded = new Map<number, NewsItem>();

export function rememberNews(items: NewsItem[]): void {
  for (const item of items) loaded.set(item.id, item);
}

export function getRememberedNews(id: number): NewsItem | null {
  return loaded.get(id) ?? null;
}
