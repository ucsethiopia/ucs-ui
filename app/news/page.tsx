"use client";

import { useState, useMemo } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { PageHero } from "@/components/shared/page-hero";
import { NewsModal } from "@/components/home/news-modal";
import { useNews, newsCategories, type NewsItem } from "@/hooks/use-news";
import { SafeImage } from "@/components/shared/safe-image";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/container";
import { ease, staggerContainer, staggerItem } from "@/lib/motion";

const INITIAL_ITEMS = 9;

function NewsCard({
  item,
  onReadMore,
  featured,
}: {
  item: NewsItem;
  onReadMore: (item: NewsItem) => void;
  featured?: boolean;
}) {
  const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.article
      variants={staggerItem}
      className={cn(
        "group flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2",
        featured && "md:col-span-2",
      )}
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
      <div className={cn("relative overflow-hidden bg-muted", featured ? "aspect-[2/1]" : "aspect-video")}>
        {(item.images?.[0] ?? item.main_image) ? (
          <SafeImage
            src={item.images?.[0] ?? item.main_image ?? ""}
            alt={item.title}
            fill
            sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            fallbackClassName="absolute inset-0"
          />
        ) : (
          <div className="absolute inset-0 bg-navy-900" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category & Date */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {(item.tags ?? ["News"]).slice(0, 2).map((tag) => (
              <span key={tag} className="px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full capitalize">
                {tag}
              </span>
            ))}
          </div>
          <time className="text-xs text-muted-foreground shrink-0">{formattedDate}</time>
        </div>

        {/* Title */}
        <h3
          className="font-serif font-semibold text-foreground mb-2 line-clamp-2 transition-opacity group-hover:opacity-70"
          style={{ fontSize: featured ? "var(--font-size-heading-3)" : undefined }}
        >
          {item.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
          {item.subtitle}
        </p>
      </div>
    </motion.article>
  );
}

export default function NewsPage() {
  const { data, loading, isLoadingMore, hasMore, loadMore } =
    useNews(INITIAL_ITEMS);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredNews = useMemo(() => {
    if (selectedCategory === "All") return data;
    return data.filter((item) =>
      item.tags?.some((t) => t.toLowerCase() === selectedCategory.toLowerCase())
    );
  }, [data, selectedCategory]);

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

        {/* Filter Section — editorial underline style */}
        <section className="sticky top-19 sm:top-19 z-10 bg-background">
          <Container>
            <div className="py-4 border-b border-border">
              <div className="flex flex-wrap gap-1">
                {newsCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    aria-pressed={selectedCategory === category}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2",
                      selectedCategory === category
                        ? "text-foreground border-b-2 border-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* News Grid */}
        <section style={{ paddingBlock: "var(--space-section-normal)" }} role="region" aria-label="News articles">
          <Container>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: INITIAL_ITEMS }).map((_, i) => (
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
            ) : filteredNews.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-2">
                  No news items found in this category.
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Try browsing a different category, or view all news below.
                </p>
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="text-foreground font-semibold hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 rounded-sm"
                >
                  View all news →
                </button>
              </div>
            ) : (
              <>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                >
                  {filteredNews.map((item, index) => (
                    <NewsCard
                      key={item.id}
                      item={item}
                      onReadMore={handleReadMore}
                      featured={index === 0}
                    />
                  ))}
                </motion.div>

                {/* Load More Button */}
                {hasMore && selectedCategory === "All" && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={loadMore}
                      disabled={isLoadingMore}
                      className="inline-flex items-center justify-center gap-2 rounded-sm border border-border bg-background px-8 py-4 text-base font-semibold text-foreground transition-all hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
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
