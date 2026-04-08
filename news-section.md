```tsx components/home/firm-news.tsx
"use client";

import { useEffect, useId, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { SafeImage } from "@/components/shared/safe-image";
import { NewsItem } from "@/hooks/use-news";
import { cn } from "@/lib/utils";

interface NewsModalProps {
  news: NewsItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const NewsModal = ({ news, isOpen, onClose }: NewsModalProps) => {
  const titleId = useId();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [slideIndex, setSlideIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const modalRef = useRef<HTMLDivElement>(null);

  // Keyboard close and focus trap
  useEffect(() => {
    if (!isOpen) return;

    // Small delay to ensure elements are rendered
    const timer = setTimeout(() => {
      const focusable = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>;
      
      if (focusable && focusable.length > 0) {
        // Focus the close button (which is often the first button)
        focusable[0].focus();
      }
    }, 10);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>;
        
        if (!focusable || focusable.length === 0) return;
        
        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  // Track active slide + prev/next availability
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSlideIndex(emblaApi.selectedScrollSnap());
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => { emblaApi.off("select", onSelect); emblaApi.off("reInit", onSelect); };
  }, [emblaApi]);

  // Reset carousel when article changes
  useEffect(() => {
    setSlideIndex(0);
    emblaApi?.scrollTo(0, true);
  }, [news?.id, emblaApi]);

  if (!news) return null;

  const images = news.images?.length ? news.images : news.main_image ? [news.main_image] : [];
  const isCarousel = images.length > 1;

  const formattedDate = new Date(news.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const tags = news.tags ?? [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="fixed inset-x-4 top-[5%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-3xl max-h-[85vh] bg-card rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-card/90 backdrop-blur-sm border flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto">
              {/* Images */}
              {images.length > 0 && (
                <div className="relative h-64 md:h-80 w-full flex-shrink-0 overflow-hidden">
                  {isCarousel ? (
                    <>
                      <div className="overflow-hidden h-full" ref={emblaRef}>
                        <div className="flex h-full">
                          {images.map((src, i) => (
                            <div key={i} className="relative flex-[0_0_100%] h-full">
                              <SafeImage
                                src={src}
                                alt={`${news.title} — ${i + 1} of ${images.length}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 640px"
                                className="object-contain"
                                fallbackClassName="absolute inset-0"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                      {/* Prev / Next buttons */}
                      <button
                        onClick={() => emblaApi?.scrollPrev()}
                        disabled={!canPrev}
                        aria-label="Previous image"
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all hover:bg-black/60 disabled:opacity-0 disabled:pointer-events-none"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => emblaApi?.scrollNext()}
                        disabled={!canNext}
                        aria-label="Next image"
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all hover:bg-black/60 disabled:opacity-0 disabled:pointer-events-none"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      {/* Counter */}
                      <div className="absolute top-3 left-4 bg-black/40 backdrop-blur-sm text-white text-[10px] font-medium px-2.5 py-1 rounded-full">
                        {slideIndex + 1} / {images.length}
                      </div>
                      {/* Dot indicators */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                        {images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => emblaApi?.scrollTo(i)}
                            aria-label={`Go to image ${i + 1}`}
                            className={cn(
                              "h-1.5 rounded-full transition-all duration-200",
                              i === slideIndex
                                ? "w-5 bg-white"
                                : "w-1.5 bg-white/50 hover:bg-white/80",
                            )}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <SafeImage
                        src={images[0]}
                        alt={news.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 640px"
                        className="object-contain"
                        fallbackClassName="absolute inset-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    </>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Category & Meta */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent">
                      {tag}
                    </span>
                  ))}
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formattedDate}</span>
                  </div>
                  {news.team && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <User className="w-3.5 h-3.5" />
                      <span>{news.team}</span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h2 id={titleId} className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
                  {news.title}
                </h2>

                {/* Subtitle / excerpt */}
                {news.subtitle && (
                  <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                    {news.subtitle}
                  </p>
                )}

                {/* Full body text */}
                {news.news && (
                  <div className="prose prose-sm max-w-none pb-8 text-foreground/90">
                    {news.news.split(/\n\n+/).filter(Boolean).map((paragraph, idx) => {
                      const trimmed = paragraph.trim();
                      const isQuote = /^["“][\s\S]*["”]$/.test(trimmed);

                      if (isQuote) {
                        return (
                          <blockquote
                            key={idx}
                            className="border-l-4 border-gold-500 pl-5 py-2 my-8 italic text-muted-foreground font-serif text-lg md:text-xl leading-relaxed bg-muted/30 rounded-r-lg"
                          >
                            {trimmed.replace(/^["“]|["”]$/g, "")}
                          </blockquote>
                        );
                      }

                      const isFirst = idx === 0;
                      return (
                        <p
                          key={idx}
                          className={cn(
                            "leading-relaxed mb-5",
                            isFirst &&
                              "first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-gold-600 first-letter:mt-1.5 first-letter:leading-[0.8]"
                          )}
                        >
                          {trimmed}
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  variant?: "default" | "narrow" | "wide";
}

const variantClasses = {
  default: "max-w-[1440px]",
  narrow: "max-w-[1080px]",
  wide: "max-w-[1600px]",
} as const;

export function Container({
  children,
  className,
  as: Tag = "div",
  variant = "default",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto px-4 sm:px-6 lg:px-8 xl:px-14", variantClasses[variant], className)}>
      {children}
    </Tag>
  );
}
```

```tsx components/home/news-modal.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SafeImage } from "@/components/shared/safe-image";
import Link from "next/link";
import { useFirmNews, type NewsItem } from "@/hooks/use-news";
import { Container } from "@/components/shared/container";
import { NewsModal } from "@/components/home/news-modal";
import { Skeleton } from "@/components/ui/charts";
import { ease, staggerContainer, staggerItem } from "@/lib/motion";

export const FirmNews = () => {
  const { data, loading } = useFirmNews(4);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewsClick = (news: NewsItem) => {
    setSelectedNews(news);
    setIsModalOpen(true);
  };

  const featured = data[0] ?? null;
  const rest = data.slice(1, 4);

  return (
    <>
      <section style={{ paddingBlock: "var(--space-section-normal)" }}>
        <Container>
          {/* Header */}
          <motion.div
            className="flex items-end justify-between mb-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: ease.out }}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-2">
                Firm Updates
              </p>
              <h2 className="font-serif font-bold text-foreground" style={{ fontSize: "var(--font-size-heading-1)" }}>
                News & Insights
              </h2>
            </div>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-opacity hover:opacity-70"
            >
              All News
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Skeleton className="aspect-[3/2] w-full rounded-lg" />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-lg" />
                ))}
              </div>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {/* Featured article — large */}
              {featured && (
                <motion.article
                  variants={staggerItem}
                  className="group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-lg overflow-hidden"
                  onClick={() => handleNewsClick(featured)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleNewsClick(featured);
                    }
                  }}
                >
                  <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-muted">
                    {(featured.images?.[0] ?? featured.main_image) ? (
                      <SafeImage
                        src={featured.images?.[0] ?? featured.main_image ?? ""}
                        alt={featured.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        fallbackClassName="absolute inset-0"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-navy-900" />
                    )}
                  </div>
                  <div className="mt-4">
                    <time className="text-xs text-muted-foreground">
                      {new Date(featured.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </time>
                    <h3
                      className="font-serif font-bold text-foreground mt-1 line-clamp-2 transition-opacity group-hover:opacity-70"
                      style={{ fontSize: "var(--font-size-heading-2)" }}
                    >
                      {featured.title}
                    </h3>
                  </div>
                </motion.article>
              )}

              {/* Smaller articles — stacked */}
              <div className="flex flex-col divide-y divide-border">
                {rest.map((news) => (
                  <motion.article
                    key={news.id}
                    variants={staggerItem}
                    className="group cursor-pointer py-4 first:pt-0 last:pb-0 outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-sm"
                    onClick={() => handleNewsClick(news)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleNewsClick(news);
                      }
                    }}
                  >
                    <div className="flex gap-4">
                      {/* Thumbnail */}
                      <div className="relative w-24 h-24 sm:w-32 sm:h-24 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                        {(news.images?.[0] ?? news.main_image) ? (
                          <SafeImage
                            src={news.images?.[0] ?? news.main_image ?? ""}
                            alt={news.title}
                            fill
                            sizes="128px"
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                            fallbackClassName="absolute inset-0"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-navy-900" />
                        )}
                      </div>
                      {/* Text */}
                      <div className="min-w-0 flex flex-col justify-center">
                        <time className="text-xs text-muted-foreground">
                          {new Date(news.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </time>
                        <h3 className="font-serif font-semibold text-foreground mt-0.5 line-clamp-2 text-base transition-opacity group-hover:opacity-70">
                          {news.title}
                        </h3>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          )}
        </Container>
      </section>

      {/* Modal */}
      <NewsModal
        news={selectedNews}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
```

```tsx components/home/news-modal.tsx
"use client";

import { useEffect, useId, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { SafeImage } from "@/components/shared/safe-image";
import { NewsItem } from "@/hooks/use-news";
import { cn } from "@/lib/utils";

interface NewsModalProps {
  news: NewsItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const NewsModal = ({ news, isOpen, onClose }: NewsModalProps) => {
  const titleId = useId();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [slideIndex, setSlideIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const modalRef = useRef<HTMLDivElement>(null);

  // Keyboard close and focus trap
  useEffect(() => {
    if (!isOpen) return;

    // Small delay to ensure elements are rendered
    const timer = setTimeout(() => {
      const focusable = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>;
      
      if (focusable && focusable.length > 0) {
        // Focus the close button (which is often the first button)
        focusable[0].focus();
      }
    }, 10);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>;
        
        if (!focusable || focusable.length === 0) return;
        
        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  // Track active slide + prev/next availability
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSlideIndex(emblaApi.selectedScrollSnap());
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => { emblaApi.off("select", onSelect); emblaApi.off("reInit", onSelect); };
  }, [emblaApi]);

  // Reset carousel when article changes
  useEffect(() => {
    setSlideIndex(0);
    emblaApi?.scrollTo(0, true);
  }, [news?.id, emblaApi]);

  if (!news) return null;

  const images = news.images?.length ? news.images : news.main_image ? [news.main_image] : [];
  const isCarousel = images.length > 1;

  const formattedDate = new Date(news.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const tags = news.tags ?? [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="fixed inset-x-4 top-[5%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-3xl max-h-[85vh] bg-card rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-card/90 backdrop-blur-sm border flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto">
              {/* Images */}
              {images.length > 0 && (
                <div className="relative h-64 md:h-80 w-full flex-shrink-0 overflow-hidden">
                  {isCarousel ? (
                    <>
                      <div className="overflow-hidden h-full" ref={emblaRef}>
                        <div className="flex h-full">
                          {images.map((src, i) => (
                            <div key={i} className="relative flex-[0_0_100%] h-full">
                              <SafeImage
                                src={src}
                                alt={`${news.title} — ${i + 1} of ${images.length}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 640px"
                                className="object-contain"
                                fallbackClassName="absolute inset-0"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                      {/* Prev / Next buttons */}
                      <button
                        onClick={() => emblaApi?.scrollPrev()}
                        disabled={!canPrev}
                        aria-label="Previous image"
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all hover:bg-black/60 disabled:opacity-0 disabled:pointer-events-none"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => emblaApi?.scrollNext()}
                        disabled={!canNext}
                        aria-label="Next image"
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all hover:bg-black/60 disabled:opacity-0 disabled:pointer-events-none"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      {/* Counter */}
                      <div className="absolute top-3 left-4 bg-black/40 backdrop-blur-sm text-white text-[10px] font-medium px-2.5 py-1 rounded-full">
                        {slideIndex + 1} / {images.length}
                      </div>
                      {/* Dot indicators */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                        {images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => emblaApi?.scrollTo(i)}
                            aria-label={`Go to image ${i + 1}`}
                            className={cn(
                              "h-1.5 rounded-full transition-all duration-200",
                              i === slideIndex
                                ? "w-5 bg-white"
                                : "w-1.5 bg-white/50 hover:bg-white/80",
                            )}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <SafeImage
                        src={images[0]}
                        alt={news.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 640px"
                        className="object-contain"
                        fallbackClassName="absolute inset-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    </>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Category & Meta */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent">
                      {tag}
                    </span>
                  ))}
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formattedDate}</span>
                  </div>
                  {news.team && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <User className="w-3.5 h-3.5" />
                      <span>{news.team}</span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h2 id={titleId} className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
                  {news.title}
                </h2>

                {/* Subtitle / excerpt */}
                {news.subtitle && (
                  <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                    {news.subtitle}
                  </p>
                )}

                {/* Full body text */}
                {news.news && (
                  <div className="prose prose-sm max-w-none pb-8 text-foreground/90">
                    {news.news.split(/\n\n+/).filter(Boolean).map((paragraph, idx) => {
                      const trimmed = paragraph.trim();
                      const isQuote = /^["“][\s\S]*["”]$/.test(trimmed);

                      if (isQuote) {
                        return (
                          <blockquote
                            key={idx}
                            className="border-l-4 border-gold-500 pl-5 py-2 my-8 italic text-muted-foreground font-serif text-lg md:text-xl leading-relaxed bg-muted/30 rounded-r-lg"
                          >
                            {trimmed.replace(/^["“]|["”]$/g, "")}
                          </blockquote>
                        );
                      }

                      const isFirst = idx === 0;
                      return (
                        <p
                          key={idx}
                          className={cn(
                            "leading-relaxed mb-5",
                            isFirst &&
                              "first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-gold-600 first-letter:mt-1.5 first-letter:leading-[0.8]"
                          )}
                        >
                          {trimmed}
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  variant?: "default" | "narrow" | "wide";
}

const variantClasses = {
  default: "max-w-[1440px]",
  narrow: "max-w-[1080px]",
  wide: "max-w-[1600px]",
} as const;

export function Container({
  children,
  className,
  as: Tag = "div",
  variant = "default",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto px-4 sm:px-6 lg:px-8 xl:px-14", variantClasses[variant], className)}>
      {children}
    </Tag>
  );
}
```