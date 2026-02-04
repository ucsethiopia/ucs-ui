"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, TrendingUp } from "lucide-react";
import { NewsItem } from "@/hooks/use-news";
import { MiniLineChart } from "@/components/ui/charts";
import { cn } from "@/lib/utils";

interface NewsModalProps {
  news: NewsItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const NewsModal = ({ news, isOpen, onClose }: NewsModalProps) => {
  if (!news) return null;

  const isEconomicNews = !!news.trend;

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
            className="fixed inset-x-4 top-[5%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-3xl max-h-[85vh] bg-card rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
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
              {/* Image (Firm News) */}
              {news.image && (
                <div className="relative h-64 md:h-80 w-full overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
              )}

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Category & Meta */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span
                    className={cn(
                      "px-3 py-1 text-xs font-medium rounded-full",
                      isEconomicNews && news.impact === "high"
                        ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                        : "bg-accent/10 text-accent",
                    )}
                  >
                    {news.category}
                  </span>

                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{news.date}</span>
                  </div>

                  {news.author && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <User className="w-3.5 h-3.5" />
                      <span>{news.author}</span>
                    </div>
                  )}

                  {isEconomicNews && news.impact && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span className="capitalize">{news.impact} Impact</span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
                  {news.title}
                </h2>

                {/* Excerpt */}
                <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                  {news.excerpt}
                </p>

                {/* Economic News: Trend Chart */}
                {isEconomicNews && news.trend && (
                  <div className="mb-6 p-4 bg-muted/30 rounded-lg border">
                    <h3 className="text-sm font-semibold text-foreground mb-3">
                      Market Trend
                    </h3>
                    <MiniLineChart
                      data={news.trend.map((value, index) => ({
                        date: `D${index + 1}`,
                        value,
                      }))}
                      height={100}
                      color={
                        news.impact === "high"
                          ? "var(--color-gold-500)"
                          : "var(--color-navy-600)"
                      }
                    />
                  </div>
                )}

                {/* Full Content (Firm News) */}
                {news.content && (
                  <div className="prose prose-sm max-w-none">
                    <p className="text-foreground leading-relaxed whitespace-pre-line">
                      {news.content}
                    </p>
                  </div>
                )}

                {/* Fallback for Economic News without full content */}
                {isEconomicNews && !news.content && (
                  <div className="text-sm text-muted-foreground italic">
                    Full analysis available in our economic reports.
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
