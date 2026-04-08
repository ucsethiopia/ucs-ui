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

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

// Resolve image url — API has used both `images` and `extra_images` across branches
function resolveImage(item: NewsItem): string | null {
  const images = (item as NewsItem & { images?: string[] }).images;
  return images?.[0] ?? item.extra_images?.[0] ?? item.main_image ?? null;
}

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
      <section
        style={{
          paddingTop: "var(--space-section-normal)",
          paddingBottom: "clamp(3rem, 5vw, 5rem)",
        }}
      >
        <Container>
          {/* Header */}
          <motion.div
            className="flex flex-wrap items-end justify-between gap-y-3 mb-8 lg:mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-2">
                Firm Updates
              </p>
              <h2
                className="font-serif font-bold text-foreground"
                style={{ fontSize: "clamp(2.5rem, 5vw, 3.3rem)" }}
              >
                News &amp; Insights
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
              <Skeleton className="aspect-[3/2] w-full rounded-lg" />
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-lg flex-1" />
                ))}
              </div>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {/* Featured article */}
              {featured && (
                <motion.article
                  variants={staggerItem}
                  className="group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-lg"
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
                    {resolveImage(featured) ? (
                      <SafeImage
                        src={resolveImage(featured)!}
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
                  <div className="mt-5">
                    <time className="text-xs text-muted-foreground">
                      {new Date(featured.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                    <h3
                      className="font-serif font-bold text-foreground mt-2 line-clamp-3 transition-opacity group-hover:opacity-70"
                      style={{ fontSize: "clamp(1.8rem, 1vw, 2.5rem)" }}
                    >
                      {featured.title}
                    </h3>
                  </div>
                </motion.article>
              )}

              {/* Stacked articles */}
              <div className="flex flex-col divide-y divide-border">
                {rest.map((news) => (
                  <motion.article
                    key={news.id}
                    variants={staggerItem}
                    className={`group cursor-pointer py-5 first:pt-0 last:pb-0 outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-sm`}
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
                      <div className="relative w-24 h-20 sm:w-32 sm:h-24 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                        {resolveImage(news) ? (
                          <SafeImage
                            src={resolveImage(news)!}
                            alt={news.title}
                            fill
                            sizes="128px"
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                            fallbackClassName="absolute inset-0"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-navy-900" />
                        )}
                      </div>
                      <div className="min-w-0 flex flex-col justify-center gap-1">
                        <time className="text-xs text-muted-foreground">
                          {new Date(news.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                        <h3 className="font-serif font-semibold text-foreground line-clamp-2 text-base leading-snug transition-opacity group-hover:opacity-70">
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

      <NewsModal
        news={selectedNews}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
