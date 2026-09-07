import Link from "next/link";
import Image from "next/image";
import { Linkedin, Send, Facebook, Instagram } from "lucide-react";
import { Container } from "@/components/shared/container";
import { contactInfo } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <span className={cn("relative block overflow-hidden rounded-full opacity-40", className)}>
      <Image
        src="/images/icons/tik-tok.png"
        alt=""
        fill
        className="object-cover"
        sizes="20px"
      />
    </span>
  );
}

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
    { href: "/services#advisory", label: "Consulting & Advisory" },
    { href: "/services#research", label: "Research & Publication" },
    { href: "/services#communication", label: "Communication & Promotion" },
  ],
};

const socialLinks = [
  { href: contactInfo.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: `https://t.me/${contactInfo.telegram.replace("@", "")}`, icon: Send, label: "Telegram" },
];

// Accounts not live yet — render as non-interactive placeholders (no href, not
// focusable) so we never ship dead "#" links. TODO: once each account exists,
// move it into `socialLinks` above with its real URL.
const placeholderSocials = [
  { icon: TikTokIcon, label: "TikTok", iconClassName: "h-5 w-5" }, // TODO: add real TikTok URL
  { icon: Facebook, label: "Facebook" }, // TODO: add real Facebook URL
  { icon: Instagram, label: "Instagram" }, // TODO: add real Instagram URL
];

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white border-t-2 border-white/10">
      <Container>
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logos/ucs/logo-white.png"
                alt="Ultimate Consultancy Services"
                width={154}
                height={72}
                className="h-16 sm:h-20 md:h-24 w-auto block [.inverted_&]:hidden"
              />
              <Image
                src="/images/logos/ucs/logo-base.png"
                alt="Ultimate Consultancy Services"
                width={154}
                height={72}
                className="h-16 sm:h-20 md:h-24 w-auto hidden [.inverted_&]:block"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Driving growth and transformation for Ethiopian organizations since 2012.
              Your trusted partner for advisory, consultancy, research and training
              services.
            </p>
          </div>

          {/* Company Links */}
          <nav aria-label="Company">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-gold-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services Links */}
          <nav aria-label="Services">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-gold-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Contact
            </h3>
            <address className="mt-4 space-y-3 text-sm not-italic text-white/70">
              <p>Gurd Shola, near Century Mall</p>
              <p>Abenezer Building, 3rd Floor</p>
              <p>Addis Ababa, Ethiopia</p>
              <p>P.O. Box {contactInfo.poBox}</p>
              <p className="pt-2">
                <a href={`tel:${contactInfo.phones[0]}`} className="hover:text-gold-500 transition-colors">
                  {contactInfo.phones[0]}
                </a>
              </p>
              <p>
                <a href={`mailto:${contactInfo.emails[0]}`} className="hover:text-gold-500 transition-colors">
                  {contactInfo.emails[0]}
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Social Links — centered across the full footer width */}
        <div className="flex justify-center gap-4 pb-10">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-gold-500 hover:text-gold-500"
              aria-label={social.label}
            >
              <social.icon className="h-4 w-4" />
            </a>
          ))}
          {placeholderSocials.map((social) => (
            <span
              key={social.label}
              tabIndex={-1}
              aria-disabled="true"
              role="img"
              aria-label={`${social.label} (coming soon)`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/30 cursor-not-allowed"
            >
              <social.icon className={social.iconClassName ?? "h-4 w-4"} />
            </span>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} Ultimate Consultancy Services Ethiopia. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-white/50">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
