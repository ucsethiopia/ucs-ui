"use client";

import { useState, useEffect, useMemo } from "react";
import { ArrowRight, Calendar, Loader2 } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/shared/page-hero";
import { Modal } from "@/components/ui/modal";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import {
  newsItems,
  newsCategories,
  simulateApiDelay,
  type NewsItem,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const INITIAL_ITEMS = 9;

function NewsCard({
  item,
  onReadMore,
  index,
  isVisible,
}: {
  item: NewsItem;
  onReadMore: (item: NewsItem) => void;
  index: number;
  isVisible: boolean;
}) {
  const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article
      className={cn(
        "group flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-gold-500/30",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{
        transitionDelay: isVisible ? `${(index % 9) * 75}ms` : "0ms",
      }}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=800&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />

        {/* Category Tag */}
        <span className="absolute top-4 left-4 px-3 py-1 bg-gold-500 text-navy-950 text-xs font-semibold rounded-sm uppercase tracking-wide">
          {item.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Date */}
        <div className="flex items-center gap-2 text-muted-foreground mb-3">
          <Calendar className="h-3.5 w-3.5" />
          <time className="text-xs">{formattedDate}</time>
        </div>

        {/* Title */}
        <h3 className="font-serif text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-gold-600 transition-colors">
          {item.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
          {item.excerpt}
        </p>

        {/* Read More */}
        <button
          onClick={() => onReadMore(item)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900 transition-all hover:text-gold-600 hover:gap-3"
        >
          Read More
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hasLoadedAll, setHasLoadedAll] = useState(false);

  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.05,
    rootMargin: "0px 0px -50px 0px",
  });

  // Initial load - first 9 items
  useEffect(() => {
    async function fetchInitialNews() {
      const data = await simulateApiDelay(newsItems.slice(0, INITIAL_ITEMS), 800);
      setNews(data);
      setAllNews(data);
      setIsLoading(false);
    }
    fetchInitialNews();
  }, []);

  // Load more handler
  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    const moreNews = await simulateApiDelay(newsItems.slice(INITIAL_ITEMS), 600);
    setAllNews((prev) => [...prev, ...moreNews]);
    setHasLoadedAll(true);
    setIsLoadingMore(false);
  };

  // Filter news based on selected category
  const filteredNews = useMemo(() => {
    if (selectedCategory === "All") {
      return allNews;
    }
    return allNews.filter((item) => item.category === selectedCategory);
  }, [allNews, selectedCategory]);

  // Check if there are more items to load
  const hasMore = !hasLoadedAll && allNews.length < newsItems.length;

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Stay Informed"
          title="News & Insights"
          description="The latest updates, achievements, and insights from UCS Ethiopia."
        />

        {/* Filter Section */}
        <section className="py-8 bg-background border-b border-border sticky top-20 z-30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2">
              {newsCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-sm transition-all",
                    selectedCategory === category
                      ? "bg-navy-900 text-white"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-card border border-border rounded-lg overflow-hidden"
                  >
                    <div className="aspect-video bg-muted animate-pulse" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                      <div className="h-6 w-full bg-muted animate-pulse rounded" />
                      <div className="h-4 w-full bg-muted animate-pulse rounded" />
                      <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredNews.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  No news items found in this category.
                </p>
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="mt-4 text-gold-600 font-semibold hover:text-gold-500 transition-colors"
                >
                  View all news
                </button>
              </div>
            ) : (
              <>
                <div
                  ref={ref}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredNews.map((item, index) => (
                    <NewsCard
                      key={item.id}
                      item={item}
                      onReadMore={setSelectedNews}
                      index={index}
                      isVisible={isVisible}
                    />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && selectedCategory === "All" && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={handleLoadMore}
                      disabled={isLoadingMore}
                      className="inline-flex items-center justify-center gap-2 rounded-sm border border-border bg-background px-8 py-4 text-base font-semibold text-foreground transition-all hover:bg-muted hover:border-gold-500 disabled:opacity-50"
                    >
                      {isLoadingMore ? (
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
          </div>
        </section>
      </main>
      <Footer />

      {/* News Modal */}
      <Modal
        isOpen={!!selectedNews}
        onClose={() => setSelectedNews(null)}
        title={selectedNews?.title}
      >
        {selectedNews && (
          <article className="space-y-6">
            {/* Image */}
            <div className="relative aspect-video overflow-hidden rounded-lg bg-muted -mx-6 -mt-2">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=1200&auto=format&fit=crop')`,
                }}
              />
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="px-3 py-1 bg-gold-500/10 text-gold-600 font-semibold rounded-sm">
                {selectedNews.category}
              </span>
              <span>
                {new Date(selectedNews.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span>By {selectedNews.author}</span>
            </div>

            {/* Content */}
            <div className="text-foreground leading-relaxed whitespace-pre-line">
              {selectedNews.content}
            </div>
          </article>
        )}
      </Modal>
    </>
  );
}
