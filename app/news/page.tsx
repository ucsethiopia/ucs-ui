"use client";

import { useState, useMemo, useEffect } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { NewsModal } from "@/components/home/news-modal";
import { HighlightsSpotlight } from "./highlights-spotlight";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useNews, isHighlight, getMainTag, type NewsItem } from "@/hooks/use-news";
import { NewsCard } from "./news-card";
import { NewsFilterBar, type LocationFilter } from "./news-filter-bar";
import { Container } from "@/components/shared/container";

// Fetch in pages of 18 but reveal 9 (a 3×3 grid) per click, so there's always
// a buffer of already-loaded articles ready to show the instant Load More is
// pressed while the next page is prefetched behind it.
const FETCH_PAGE_SIZE = 18;
const REVEAL_STEP = 9;

function isLocal(item: NewsItem): boolean {
  return !item.scope || item.scope === "local";
}

export default function NewsPage() {
  const { data, loading, isFetchingMore, hasMore, fetchFailed, fetchNextPage, categories } =
    useNews(FETCH_PAGE_SIZE);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState<LocationFilter>("All");
  // Reveal cursor into the filtered list. Resets on any filter change so a
  // new view always starts at one clean 3×3 grid.
  const [visibleCount, setVisibleCount] = useState(REVEAL_STEP);
  useEffect(() => {
    setVisibleCount(REVEAL_STEP);
  }, [selectedCategory, selectedLocation]);

  const { ref, isVisible } = useScrollAnimation<HTMLElement>({
    threshold: 0.05,
    rootMargin: "0px 0px -50px 0px",
  });

  const highlightedItems = useMemo(
    () => data.filter(isHighlight).slice(0, 6),
    [data]
  );

  const filteredNews = useMemo(() => {
    let result = data;
    if (selectedLocation === "Local") {
      result = result.filter(isLocal);
    } else if (selectedLocation === "Overseas") {
      result = result.filter((item) => !isLocal(item));
    }
    // Highlighted items stay in the grid too — the spotlight shows one at a
    // time, so excluding them here would hide every highlight not on screen.
    if (selectedCategory !== "All") {
      result = result.filter(
        (item) => getMainTag(item).toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    return result;
  }, [data, selectedCategory, selectedLocation]);

  const displayedItems = useMemo(
    () => filteredNews.slice(0, visibleCount),
    [filteredNews, visibleCount]
  );

  // Keep at least one more step of unseen matches buffered. Each fetch grows
  // `data`, which re-runs this, so a sparse filter back-fills page by page
  // until it has enough or the API runs out. Paused after a failed fetch
  // (clicking Load More retries).
  const bufferShort = filteredNews.length - visibleCount < REVEAL_STEP;
  useEffect(() => {
    if (!loading && hasMore && bufferShort && !isFetchingMore && !fetchFailed) {
      fetchNextPage();
    }
  }, [loading, hasMore, bufferShort, isFetchingMore, fetchFailed, fetchNextPage]);

  const canShowMore = displayedItems.length < filteredNews.length || hasMore;
  // Only spin when the user has outrun the buffer and is waiting on the network.
  const isWaitingForMore = visibleCount > filteredNews.length && isFetchingMore;

  const handleLoadMore = () => {
    if (fetchFailed && bufferShort) fetchNextPage();
    setVisibleCount((c) => Math.min(c, filteredNews.length) + REVEAL_STEP);
  };

  const handleReadMore = (item: NewsItem) => {
    setSelectedNews(item);
    setIsModalOpen(true);
  };

  return (
    <>
      <main id="main-content">
        <PageHero
          eyebrow="Stay Informed"
          title="News & Insights"
          description="The latest updates, achievements, and insights from UCS Ethiopia."
        />

        <NewsFilterBar
          loading={loading}
          categories={categories}
          selectedLocation={selectedLocation}
          selectedCategory={selectedCategory}
          onLocationChange={setSelectedLocation}
          onCategoryChange={setSelectedCategory}
        />

        {/* News Grid */}
        <section ref={ref} className="pt-6 pb-10 sm:pb-16 lg:pb-20 bg-background" role="region" aria-label="News articles">
          <Container>
            {selectedLocation === "All" && selectedCategory === "All" && !loading && (
              <HighlightsSpotlight
                items={highlightedItems}
                onReadMore={handleReadMore}
                paused={isModalOpen}
              />
            )}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-card border border-border rounded-lg overflow-hidden"
                  >
                    <div className="aspect-[3/2] bg-muted animate-pulse" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                      <div className="h-6 w-full bg-muted animate-pulse rounded" />
                      <div className="h-4 w-full bg-muted animate-pulse rounded" />
                      <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : displayedItems.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  No news items found in this category.
                </p>
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="mt-4 text-gold-600 font-semibold hover:text-gold-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 rounded-sm"
                >
                  View all news
                </button>
              </div>
            ) : (
              <>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {displayedItems.map((item, index) => (
                    <NewsCard
                      key={item.id}
                      item={item}
                      onReadMore={handleReadMore}
                      index={index}
                      isVisible={isVisible}
                    />
                  ))}
                </div>

                {/* Load More Button */}
                {canShowMore && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={handleLoadMore}
                      disabled={isWaitingForMore}
                      className="inline-flex items-center justify-center gap-2 rounded-sm border border-border bg-background px-8 py-4 text-base font-semibold text-foreground transition-all hover:bg-muted hover:border-gold-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {isWaitingForMore ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>
                          Load More Articles
                          <ArrowRight className="h-5 w-5" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </Container>
        </section>
      </main>

      {/* News Modal */}
      <NewsModal
        news={selectedNews}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedNews(null);
        }}
      />
    </>
  );
}
