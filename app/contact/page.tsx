"use client";

import React from "react";
import { useTheme } from "next-themes";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/container";

function ContactInfo({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold-500/10 text-gold-600">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        <div className="text-muted-foreground text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <>
      <main id="main-content">
        <PageHero
          eyebrow="Get in Touch"
          title="Contact Us"
          description="Ready to transform your organization? Let's start a conversation."
        />

        <section className="py-10 sm:py-16 lg:py-20 bg-background">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

              {/* Contact Form */}
              <div>
                <div className="mb-8">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
                    Send Us a Message
                  </h2>
                  <p className="text-muted-foreground">
                    Fill out the form below and our team will get back to you within 24 hours.
                  </p>
                </div>
                <ContactForm />
              </div>

              {/* Contact Info */}
              <div className="lg:pl-8">
                <div className="mb-8">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
                    Contact Information
                  </h2>
                  <p className="text-muted-foreground">
                    Visit our office or reach out through any of the channels below.
                  </p>
                </div>

                <div className="space-y-6 mb-10">
                  <ContactInfo icon={MapPin} title="Office Address">
                    <p>Bole Sub City, Woreda 03</p>
                    <p>Near Bole Medhane Alem Church</p>
                    <p>Addis Ababa, Ethiopia</p>
                  </ContactInfo>

                  <ContactInfo icon={Phone} title="Phone">
                    <p>
                      <a href="tel:+251911234567" className="hover:text-gold-600 transition-colors">
                        +251 911 234 567
                      </a>
                    </p>
                    <p>
                      <a href="tel:+251116184567" className="hover:text-gold-600 transition-colors">
                        +251 116 18 45 67
                      </a>
                    </p>
                  </ContactInfo>

                  <ContactInfo icon={Mail} title="Email">
                    <p>
                      <a href="mailto:info@ucsethiopia.com" className="hover:text-gold-600 transition-colors">
                        info@ucsethiopia.com
                      </a>
                    </p>
                    <p>
                      <a href="mailto:training@ucsethiopia.com" className="hover:text-gold-600 transition-colors">
                        training@ucsethiopia.com
                      </a>
                    </p>
                  </ContactInfo>

                  <ContactInfo icon={Clock} title="Business Hours">
                    <p>Monday – Friday: 8:30 AM – 5:30 PM</p>
                    <p>Saturday: 9:00 AM – 1:00 PM</p>
                    <p>Sunday: Closed</p>
                  </ContactInfo>
                </div>

                {/* OpenStreetMap embed — Bole, Addis Ababa */}
                <div className="aspect-video rounded-lg overflow-hidden border border-border">
                  <iframe
                    title="Map of UCS Ethiopia office in Bole, Addis Ababa"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=38.740%2C8.995%2C38.780%2C9.025&layer=mapnik&marker=9.009%2C38.758"
                    width="100%"
                    height="100%"
                    className={cn(
                      "w-full h-full transition-[filter] duration-300",
                      isDark && "invert hue-rotate-180 brightness-90 saturate-[0.85]",
                    )}
                    loading="lazy"
                  />
                </div>
              </div>

            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
