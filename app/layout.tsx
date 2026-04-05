import React from "react";
import type { Metadata, Viewport } from "next";
import { Source_Sans_3, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { NavigationProvider } from "@/components/navigation-provider";
import { PageRemountWrapper } from "@/components/page-remount-wrapper";

import "./globals.css";

const _sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const _playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UCS Ethiopia | Ultimate Consultancy Service",
  description:
    "Driving growth and transformation for Ethiopian enterprises. Strategic advisory, training, research, and communications services based in Bole, Addis Ababa.",

  keywords: [
    "consultancy",
    "Ethiopia",
    "business advisory",
    "training",
    "Addis Ababa",
    "enterprise",
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a2744",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${_sourceSans.variable} ${_playfairDisplay.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="blue-black"
          themes={["blue-black", "inverted"]}
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <NavigationProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-gold-500 focus:text-navy-950 focus:font-semibold focus:rounded-sm"
            >
              Skip to content
            </a>
            <div className="relative mx-auto max-w-[1440px] xl:border-x xl:border-border/20">
              {/* Left edge — only visible when viewport > 1440px (gutters exist) */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden min-[1441px]:block" aria-hidden="true">
                {/* Full-height dashed line */}
                <div className="absolute inset-y-0 left-0 border-l-2 border-dashed border-border/40" />
                {/* Top-left L-bracket */}
                <div className="absolute left-0 top-0 h-10 border-l-2 border-dashed border-border/60" />
                <div className="absolute left-0 top-0 w-10 border-t-2 border-dashed border-border/60" />
                <div className="absolute -left-[4px] -top-[4px] h-2.5 w-2.5 rounded-full border-2 border-border/50 bg-background" />
                {/* Bottom-left — vertical only, no horizontal close */}
                <div className="absolute bottom-0 left-0 h-10 border-l-2 border-dashed border-border/40" />
              </div>
              {/* Right edge */}
              <div className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden min-[1441px]:block" aria-hidden="true">
                {/* Full-height dashed line */}
                <div className="absolute inset-y-0 right-0 border-r-2 border-dashed border-border/40" />
                {/* Top-right L-bracket */}
                <div className="absolute right-0 top-0 h-10 border-r-2 border-dashed border-border/60" />
                <div className="absolute right-0 top-0 w-10 border-t-2 border-dashed border-border/60" />
                <div className="absolute -right-[4px] -top-[4px] h-2.5 w-2.5 rounded-full border-2 border-border/50 bg-background" />
                {/* Bottom-right — vertical only, no horizontal close */}
                <div className="absolute bottom-0 right-0 h-10 border-r-2 border-dashed border-border/40" />
              </div>
              <Navbar />
              <PageRemountWrapper>
                {children}
              </PageRemountWrapper>
            </div>
            <Footer />
          </NavigationProvider>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
