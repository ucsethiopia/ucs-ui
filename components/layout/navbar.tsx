"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Container } from "@/components/shared/container";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/news", label: "News" },
  // { href: "/contact", label: "Contact" }, // Commented out - using "Get in Touch" button instead
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navBgClass =
    isHomePage && !isMobileMenuOpen
      ? "bg-navy-950/80 backdrop-blur-sm border-b border-white/10"
      : "bg-background/95 backdrop-blur-md border-b border-border";

  const textClass =
    isHomePage && !isMobileMenuOpen
      ? "text-white"
      : "text-foreground";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        navBgClass,
      )}
    >
      <Container as="nav">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div
              className={cn(
                "font-serif text-base sm:text-lg font-bold tracking-tight transition-colors",
                textClass,
              )}
            >
              UCS
              <span className="text-gold-500"> Ethiopia</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors hover:text-gold-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 rounded-sm",
                  textClass,
                  pathname === link.href && "text-gold-500",
                )}
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle inheritTextColor={true} className={cn(textClass)} />
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-sm bg-gold-500 px-4 py-2 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn("md:hidden p-3 transition-colors", textClass)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="flex flex-col py-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-3 text-base font-medium transition-colors hover:bg-muted",
                    pathname === link.href
                      ? "text-gold-500 bg-muted"
                      : "text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-4 pt-4 flex items-center gap-3">
                <ThemeToggle className="flex-shrink-0" />
                <Link
                  href="/contact"
                  className="flex-1 flex items-center justify-center rounded-sm bg-gold-500 px-5 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
