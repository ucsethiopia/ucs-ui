"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { ease } from "@/lib/motion";

export default function NotFound() {
  return (
    <>
      <main className="relative min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-background overflow-hidden">
        {/* Ghost "404" watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden"
        >
          <span
            className="font-serif font-bold leading-none text-foreground/[0.04]"
            style={{ fontSize: "clamp(10rem, 30vw, 20rem)" }}
          >
            404
          </span>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: ease.out }}
          className="relative z-10 px-6 max-w-lg mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-0.5 h-6 bg-foreground/20" />
            <p className="text-muted-foreground text-sm font-semibold uppercase tracking-[0.2em]">
              Error 404
            </p>
          </div>

          <h1
            className="font-serif font-bold text-foreground mb-5 text-balance"
            style={{ fontSize: "var(--font-size-display)" }}
          >
            Page Not Found
          </h1>

          <p className="text-muted-foreground leading-relaxed mb-4 max-w-sm text-base">
            The page you&apos;re looking for has moved, been removed, or
            doesn&apos;t exist.
          </p>

          <p className="text-sm text-muted-foreground/70 mb-10 max-w-sm">
            Try navigating from the menu above, or return home.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-sm bg-gold-500 text-navy-950 text-sm font-semibold hover:bg-gold-400 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Home
          </Link>
        </motion.div>
      </main>
    </>
  );
}
