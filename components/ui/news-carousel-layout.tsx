"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NewsCarouselLayoutProps {
  title: string;
  subtitle?: string;
  titleHighlight?: string;
  children: React.ReactNode;
  rightAction?: React.ReactNode;
}

export const NewsCarouselLayout = ({
  title,
  subtitle,
  titleHighlight,
  children,
  rightAction,
}: NewsCarouselLayoutProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-10 lg:py-14 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-14">
        <motion.div
          className="flex items-end justify-between mb-6 lg:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            {titleHighlight && (
              <span className="text-accent font-medium text-sm tracking-wider uppercase block mb-2">
                {titleHighlight}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg text-muted-foreground mt-1 font-medium">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">{rightAction}</div>
        </motion.div>
      </div>
      {children}
    </section>
  );
};
