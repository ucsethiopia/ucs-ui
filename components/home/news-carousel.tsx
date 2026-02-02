"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Calendar } from "lucide-react";
import { newsItems, simulateApiDelay, type NewsItem } from "@/lib/mock-data";
import { Modal } from "@/components/ui/modal";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

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
        transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
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

export function NewsCarousel() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  });

  const itemsPerPage = 3;
  const totalPages = Math.ceil(news.length / itemsPerPage);

  useEffect(() => {
    async function fetchNews() {
      const data = await simulateApiDelay(newsItems.slice(0, 9), 1000);
      setNews(data);
      setIsLoading(false);
    }
    fetchNews();
  }, []);

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const visibleNews = news.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section className="py-24 lg:py-32 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-4">
              Latest Updates
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              News & Insights
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={handlePrevious}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-gold-500 hover:text-gold-500 disabled:opacity-50"
                aria-label="Previous news"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-gold-500 hover:text-gold-500 disabled:opacity-50"
                aria-label="Next news"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900 transition-all hover:text-gold-600 hover:gap-3"
            >
              View All News
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* News Grid */}
        <div ref={ref}>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card border border-border rounded-lg overflow-hidden">
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
          ) : (
            <div
              ref={carouselRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {visibleNews.map((item, index) => (
                <NewsCard
                  key={item.id}
                  item={item}
                  onReadMore={setSelectedNews}
                  index={index}
                  isVisible={isVisible}
                />
              ))}
            </div>
          )}
        </div>

        {/* Pagination Dots - Mobile */}
        <div className="flex justify-center gap-2 mt-8 sm:hidden">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                currentPage === index
                  ? "w-6 bg-gold-500"
                  : "bg-border hover:bg-gold-500/50"
              )}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* News Modal */}
      <Modal
        isOpen={!!selectedNews}
        onClose={() => setSelectedNews(null)}
        title={selectedNews?.title}
      >
        {selectedNews && (
          <article className="prose prose-lg max-w-none">
            {/* Image */}
            <div className="relative aspect-video mb-6 overflow-hidden rounded-lg bg-muted -mx-6 -mt-2">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=1200&auto=format&fit=crop')`,
                }}
              />
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6 not-prose">
              <span className="px-3 py-1 bg-gold-500/10 text-gold-600 font-semibold rounded-sm">
                {selectedNews.category}
              </span>
              <span>{new Date(selectedNews.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}</span>
              <span>By {selectedNews.author}</span>
            </div>

            {/* Content */}
            <div className="text-foreground leading-relaxed whitespace-pre-line">
              {selectedNews.content}
            </div>
          </article>
        )}
      </Modal>
    </section>
  );
}
