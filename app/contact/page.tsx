"use client";

import React from "react";
import { useTheme } from "next-themes";
import { MapPin, Phone, Mail, Clock, Mailbox } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/container";
import { contactInfo } from "@/lib/mock-data";

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
  const shouldInvertMap = resolvedTheme === "inverted";

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
                    <p>Gurd Shola, around Century Mall</p>
                    <p>Abenezer Building, 3rd Floor</p>
                    <p>Addis Ababa, Ethiopia</p>
                  </ContactInfo>

                  <ContactInfo icon={Phone} title="Phone">
                    {contactInfo.phones.map((phone) => (
                      <p key={phone}>
                        <a href={`tel:${phone}`} className="hover:text-gold-600 transition-colors">
                          {phone}
                        </a>
                      </p>
                    ))}
                  </ContactInfo>

                  <ContactInfo icon={Mail} title="Email">
                    {contactInfo.emails.map((email) => (
                      <p key={email}>
                        <a href={`mailto:${email}`} className="hover:text-gold-600 transition-colors">
                          {email}
                        </a>
                      </p>
                    ))}
                  </ContactInfo>

                  <ContactInfo icon={Mailbox} title="P.O. Box">
                    <p>{contactInfo.poBox}, Addis Ababa, Ethiopia</p>
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
                    src="https://www.openstreetmap.org/export/embed.html?bbox=38.770%2C9.010%2C38.805%2C9.035&layer=mapnik&marker=9.0227%2C38.7873"
                    width="100%"
                    height="100%"
                    className={cn(
                      "w-full h-full transition-[filter] duration-300",
                      shouldInvertMap && "invert hue-rotate-180 brightness-90 saturate-[0.85]",
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
