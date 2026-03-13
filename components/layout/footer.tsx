import Link from "next/link";
import { Youtube, Linkedin, Send, Facebook } from "lucide-react";
import { Container } from "@/components/shared/container";

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
  { href: "https://youtube.com", icon: Youtube, label: "YouTube" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://t.me", icon: Send, label: "Telegram" },
  { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
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
              <div className="font-serif text-xl font-bold tracking-tight">
                UCS
                <span className="text-gold-500"> Ethiopia</span>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Driving growth and transformation for Ethiopian enterprises since 2011. 
              Your trusted partner for advisory, training, and research services.
            </p>
            {/* Social Links */}
            <div className="mt-6 flex gap-4">
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
            </div>
          </div>

          {/* Company Links */}
          <div>
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
          </div>

          {/* Services Links */}
          <div>
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
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Contact
            </h3>
            <address className="mt-4 space-y-3 text-sm not-italic text-white/70">
              <p>Bole Sub City, Woreda 03</p>
              <p>Addis Ababa, Ethiopia</p>
              <p className="pt-2">
                <a href="tel:+251911234567" className="hover:text-gold-500 transition-colors">
                  +251 911 234 567
                </a>
              </p>
              <p>
                <a href="mailto:info@ucsethiopia.com" className="hover:text-gold-500 transition-colors">
                  info@ucsethiopia.com
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} Ultimate Consultancy Service Ethiopia. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-white/50">
              <Link href="/privacy" className="hover:text-gold-500 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-gold-500 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
