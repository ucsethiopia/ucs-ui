"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=2070&auto=format&fit=crop')`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/70 to-navy-950/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Eyebrow */}
          <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Ultimate Consultancy Service
          </p>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8 text-balance animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            Driving Growth for
            <span className="block text-gold-400">Ethiopian Enterprises</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            Strategic advisory, world-class training, and insightful research to 
            transform your organization and achieve sustainable success.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-gold-500 px-8 py-4 text-base font-semibold text-navy-950 transition-all hover:bg-gold-400 hover:gap-3"
            >
              Explore Our Services
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/30 bg-transparent px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10 hover:border-white/50"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-14 w-8 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
          <div className="h-3 w-1 rounded-full bg-gold-500 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
