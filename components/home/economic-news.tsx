"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMarketNews, type NewsItem } from "@/hooks/use-news";
import { NewsCarouselLayout } from "@/components/ui/news-carousel-layout";
import { NewsModal } from "@/components/home/news-modal";
import { MiniLineChart, Skeleton } from "@/components/ui/charts";
import { cn } from "@/lib/utils";

export const EconomicNews = () => {
  const { data, loading } = useMarketNews();
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollBoundaries = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollNews = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScrollBoundaries, 300);
    }
  };

  const handleNewsClick = (news: NewsItem) => {
    setSelectedNews(news);
    setIsModalOpen(true);
  };

  return (
    <>
      <NewsCarouselLayout
        title="Market Insights"
        titleHighlight="Economic News"
        rightAction={
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scrollNews("left")}
                disabled={!canScrollLeft}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-accent hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous news"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scrollNews("right")}
                disabled={!canScrollRight}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-accent hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next news"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        }
      >
        <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollSnapType: "x mandatory" }}
            onScroll={checkScrollBoundaries}
          >
            {loading
              ? [...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-80 sm:w-96 min-w-[320px]"
                  >
                    <Skeleton className="h-64 w-full rounded-xl" />
                  </div>
                ))
              : data.map((news, index) => (
                  <motion.div
                    key={news.id}
                    className="flex-shrink-0 w-80 sm:w-96 min-w-[320px] bg-card rounded-xl border overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group h-[340px] flex flex-col"
                    style={{ scrollSnapAlign: "start" }}
                    initial={{ opacity: 0, x: 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    onClick={() => handleNewsClick(news)}
                  >
                    <div className="p-6 relative flex-1 flex flex-col">
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                      <div className="relative z-10">
                        {/* Category & Meta */}
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className={cn(
                              "px-3 py-1 text-xs font-medium rounded-full",
                              news.impact === "high"
                                ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                                : news.impact === "medium"
                                  ? "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                                  : "bg-accent/10 text-accent",
                            )}
                          >
                            {news.category}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {news.date}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                          {news.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {news.excerpt}
                        </p>

                        {/* Chart */}
                        <div className="h-20 mt-auto">
                          {news.trend && (
                            <MiniLineChart
                              data={news.trend.map((value, idx) => ({
                                date: `D${idx + 1}`,
                                value,
                              }))}
                              color={
                                news.impact === "high"
                                  ? "var(--color-gold-500)"
                                  : "var(--color-navy-600)"
                              }
                              height={80}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
          </div>
        </div>
      </NewsCarouselLayout>

      {/* Modal */}
      <NewsModal
        news={selectedNews}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
