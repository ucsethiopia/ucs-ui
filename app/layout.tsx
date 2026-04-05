import React from "react";
import type { Metadata, Viewport } from "next";
import { Source_Sans_3, Fraunces } from "next/font/google";
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

const _fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "WONK"],
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
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${_sourceSans.variable} ${_fraunces.variable} font-sans antialiased bg-background text-foreground`}
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
