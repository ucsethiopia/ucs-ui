"use client";

import { useState, useMemo } from "react";
import { ArrowRight, Calendar, Loader2 } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/shared/page-hero";
import { NewsModal } from "@/components/home/news-modal";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useNews, newsCategories, type NewsItem } from "@/hooks/use-news";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/container";

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
        "group flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-gold-500/30 cursor-pointer",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
      style={{
        transitionDelay: isVisible ? `${Math.min(index, 8) * 75}ms` : "0ms",
      }}
      onClick={() => onReadMore(item)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onReadMore(item);
        }
      }}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-navy-900" />
        )}
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
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-all group-hover:text-gold-600 group-hover:gap-3">
          Read More
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </article>
  );
}

export default function NewsPage() {
  const { data, loading, isLoadingMore, hasMore, loadMore } =
    useNews(INITIAL_ITEMS);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { ref, isVisible } = useScrollAnimation<HTMLElement>({
    threshold: 0.05,
    rootMargin: "0px 0px -50px 0px",
  });

  const filteredNews = useMemo(() => {
    if (selectedCategory === "All") return data;
    return data.filter((item) => item.category === selectedCategory);
  }, [data, selectedCategory]);

  const handleReadMore = (item: NewsItem) => {
    setSelectedNews(item);
    setIsModalOpen(true);
  };

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Stay Informed"
          title="News & Insights"
          description="The latest updates, achievements, and insights from UCS Ethiopia."
        />

        {/* Filter Section */}
        <section className="py-8 bg-background border-b border-border sticky top-20 z-30">
          <Container>
            <div className="flex flex-wrap gap-2">
              {newsCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2",
                    selectedCategory === category
                      ? "bg-navy-900 text-white"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </Container>
        </section>

        {/* News Grid */}
        <section ref={ref} className="py-10 sm:py-16 lg:py-20 bg-background" role="region" aria-label="News articles">
          <Container>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: INITIAL_ITEMS }).map((_, i) => (
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
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredNews.map((item, index) => (
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
                {hasMore && selectedCategory === "All" && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={loadMore}
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
          </Container>
        </section>
      </main>
      <Footer />

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
