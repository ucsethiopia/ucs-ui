"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SafeImage } from "@/components/shared/safe-image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFirmNews, type NewsItem } from "@/hooks/use-news";
import { Container } from "@/components/shared/container";
import { NewsCarouselLayout } from "@/components/ui/news-carousel-layout";
import { NewsModal } from "@/components/home/news-modal";
import { Skeleton } from "@/components/ui/charts";

export const FirmNews = () => {
  const router = useRouter();
  const { data, loading, hasMore } = useFirmNews(9);
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
    }
  };

  const handleNewsClick = (news: NewsItem) => {
    setSelectedNews(news);
    setIsModalOpen(true);
  };

  const handleLoadMore = () => {
    // Navigate to full news page
    router.push("/news");
  };

  return (
    <>
      <NewsCarouselLayout
        title="News & Insights"
        titleHighlight="Firm Updates"
        rightAction={
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scrollNews("left")}
                disabled={!canScrollLeft}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                aria-label="Previous news"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scrollNews("right")}
                disabled={!canScrollRight}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                aria-label="Next news"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:text-accent hover:gap-3"
            >
              Load More News
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        }
      >
        <Container>
          <div ref={ref}>
          <div
            ref={containerRef}
            className="relative flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollSnapType: "x mandatory" }}
            onScroll={checkScrollBoundaries}
          >
            {loading
              ? [...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-80 sm:w-96 min-w-[320px] rounded-xl overflow-hidden h-[500px] flex flex-col"
                  >
                    <Skeleton className="aspect-[3/2] w-full flex-shrink-0" />
                    <div className="p-6 bg-card border border-t-0 flex-1">
                      <Skeleton className="h-4 w-20 mb-3" />
                      <Skeleton className="h-6 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                ))
              : data.map((news, index) => (
                  <motion.article
                    key={news.id}
                    className="flex-shrink-0 w-80 sm:w-96 min-w-[320px] group cursor-pointer flex flex-col h-[500px] outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 rounded-xl overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-xl"
                    style={{ scrollSnapAlign: "start" }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    onClick={() => handleNewsClick(news)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleNewsClick(news);
                      }
                    }}
                  >
                    {/* Image */}
                    <div className="relative aspect-[3/2] flex-shrink-0 overflow-hidden">
                      {(news.images?.[0] ?? news.main_image) ? (
                        <SafeImage
                          src={news.images?.[0] ?? news.main_image ?? ""}
                          alt={news.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index === 0}
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                          fallbackClassName="absolute inset-0"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-navy-900" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Content */}
                    <div className="p-6 bg-card border border-t-0 group-hover:border-gold-500/30 transition-colors duration-300 flex-1 flex flex-col overflow-hidden">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {(news.tags ?? ["News"]).slice(0, 2).map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-gold-500/10 text-gold-600 text-xs font-medium rounded-full capitalize">
                              {tag}
                            </span>
                          ))}
                          {(news.tags?.length ?? 0) > 2 && (
                            <span className="px-2 py-0.5 text-xs text-muted-foreground border border-border rounded-full">
                              +{(news.tags?.length ?? 0) - 2}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground shrink-0">
                          {new Date(news.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {news.title}
                      </h3>

                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {news.subtitle}
                      </p>

                      <span className="inline-flex items-center text-gold-600 font-medium text-sm group-hover:gap-2 transition-all">
                        Read more
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </motion.article>
                ))}
          </div>
          </div>
        </Container>
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
