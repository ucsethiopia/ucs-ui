"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Container } from "@/components/shared/container";
import { useNavigation } from "@/components/navigation-provider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/news", label: "News" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { triggerNavigation } = useNavigation();

  const handleNavClick = useCallback(() => {
    triggerNavigation();
    window.scrollTo({ top: 0 });
  }, [triggerNavigation]);

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

  const navBgClass = isMobileMenuOpen 
    ? "bg-navy-950 border-b border-white/10"
    : "bg-navy-950/90 backdrop-blur-md border-b border-white/10";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        navBgClass,
      )}
    >
      <Container as="nav">
        <div className="flex h-19 items-center justify-between">
          {/* Logo */}
          <Link href="/" onClick={handleNavClick} className="flex items-center">
            <Image
              src="/images/logos/ucs/logo-white.png"
              alt="Ultimate Consultancy Services"
              width={154}
              height={72}
              className="h-16 sm:h-17 w-auto block [.inverted_&]:hidden"
              priority
            />
            <Image
              src="/images/logos/ucs/logo-base.png"
              alt="Ultimate Consultancy Services"
              width={154}
              height={72}
              className="h-16 sm:h-17 w-auto hidden [.inverted_&]:block"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className={cn(
                  "relative text-sm font-medium tracking-widest uppercase transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 rounded-sm text-white",
                  pathname === link.href &&
                    "after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-white/60",
                )}
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle inheritTextColor={true} className="text-white" />
            <Link
              href="/contact"
              onClick={handleNavClick}
              className="inline-flex items-center justify-center rounded-sm border border-white/40 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10 hover:border-white/60"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 transition-colors text-white"
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
          <div className="md:hidden border-t border-white/10 bg-navy-950">
            <div className="flex flex-col py-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className={cn(
                    "px-4 py-3 text-base font-medium transition-colors hover:bg-white/5",
                    pathname === link.href
                      ? "text-white bg-white/5"
                      : "text-white/90",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-4 pt-4 flex items-center gap-3">
                <ThemeToggle className="flex-shrink-0 text-white" inheritTextColor={true} />
                <Link
                  href="/contact"
                  onClick={handleNavClick}
                  className="flex-1 flex items-center justify-center rounded-sm border border-white/40 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 hover:border-white/60"
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
