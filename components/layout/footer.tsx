import Link from "next/link";
import Image from "next/image";
import { Linkedin, Send } from "lucide-react";
import { Container } from "@/components/shared/container";
import { contactInfo } from "@/lib/mock-data";

const footerLinks = {
  company: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/news", label: "News" },
    { href: "/contact", label: "Contact" },
  ],
  services: [
    { href: "/services#training", label: "Training" },
    { href: "/services#advisory", label: "Advisory" },
    { href: "/services#research", label: "Research" },
    { href: "/services#communication", label: "Communication" },
  ],
};

const socialLinks = [
  { href: contactInfo.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: `https://t.me/${contactInfo.telegram.replace("@", "")}`, icon: Send, label: "Telegram" },
];

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white border-t border-white/10 relative overflow-hidden">
      {/* Ghost motto watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif font-bold text-white/[0.02] whitespace-nowrap leading-none"
        style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}
      >
        Think Agile, Get Inspired
      </div>

      <Container>
        {/* Main Footer — asymmetric 2-column */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 py-16 relative">
          {/* Left — Brand + description + social */}
          <div className="max-w-md">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logos/ucs/logo-white.png"
                alt="Ultimate Consultancy Services"
                width={154}
                height={72}
                className="h-16 sm:h-20 w-auto block [.inverted_&]:hidden"
              />
              <Image
                src="/images/logos/ucs/logo-base.png"
                alt="Ultimate Consultancy Services"
                width={154}
                height={72}
                className="h-16 sm:h-20 w-auto hidden [.inverted_&]:block"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Driving growth and transformation for Ethiopian enterprises since 2012.
              Your trusted partner for advisory, training, and research services.
            </p>
            {/* Social Links — simple text links */}
            <div className="mt-6 flex gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — stacked link groups + contact */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-10 sm:gap-16 lg:gap-8">
            {/* Company links */}
            <nav aria-label="Company">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-3">
                Company
              </h3>
              <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                {footerLinks.company.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Services links */}
            <nav aria-label="Services">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-3">
                Services
              </h3>
              <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                {footerLinks.services.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Contact */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-3">
                Contact
              </h3>
              <address className="text-sm not-italic text-white/60 space-y-1">
                <p>Gurd Shola, near Century Mall</p>
                <p>Addis Ababa, Ethiopia</p>
                <p className="pt-1">
                  <a href={`tel:${contactInfo.phones[0]}`} className="hover:text-white transition-colors">
                    {contactInfo.phones[0]}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${contactInfo.emails[0]}`} className="hover:text-white transition-colors">
                    {contactInfo.emails[0]}
                  </a>
                </p>
              </address>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Ultimate Consultancy Service Ethiopia. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-white/40">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
