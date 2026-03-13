"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <main className="relative min-h-[85vh] flex items-center justify-center bg-background overflow-hidden">
        {/* Decorative top accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

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

        {/* Decorative corner lines */}
        <div aria-hidden="true" className="absolute top-16 left-12 w-12 h-12 border-l-2 border-t-2 border-gold-500/20" />
        <div aria-hidden="true" className="absolute bottom-16 right-12 w-12 h-12 border-r-2 border-b-2 border-gold-500/20" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center px-6 max-w-lg mx-auto"
        >
          <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-5">
            Error 404
          </p>

          <div className="mx-auto mb-8 w-12 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-5 text-balance">
            Page Not Found
          </h1>

          <p className="text-muted-foreground leading-relaxed mb-10 max-w-sm mx-auto text-base">
            The page you&apos;re looking for has moved, been removed, or
            doesn&apos;t exist.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-sm bg-gold-500 text-navy-950 text-sm font-semibold hover:bg-gold-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Home
          </Link>
        </motion.div>
      </main>
    </>
  );
}
