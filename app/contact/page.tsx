"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MapPin, Phone, Mail, Clock, Mailbox } from "lucide-react";
import { motion } from "framer-motion";
import { PageHero } from "@/components/shared/page-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/container";
import { contactInfo } from "@/lib/mock-data";
import { ease } from "@/lib/motion";

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
    <div className="flex gap-4 py-4 border-b border-border last:border-b-0">
      <div className="flex-shrink-0 pt-0.5">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div>
        <h3 className="font-semibold text-foreground text-sm mb-1">{title}</h3>
        <div className="text-muted-foreground text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const shouldInvertMap = mounted && resolvedTheme === "inverted";

  return (
    <>
      <main id="main-content">
        <PageHero
          eyebrow="Get in Touch"
          title="Contact Us"
          description="Ready to transform your organization? Let's start a conversation."
        />

        <section style={{ paddingBlock: "var(--space-section-normal)" }}>
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16">

              {/* Contact Form — wider left column */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: ease.out }}
              >
                <div className="mb-8">
                  <h2
                    className="font-serif font-bold text-foreground mb-4"
                    style={{ fontSize: "var(--font-size-heading-2)" }}
                  >
                    Send Us a Message
                  </h2>
                  <p className="text-muted-foreground">
                    Fill out the form below and our team will get back to you within 24 hours.
                  </p>
                </div>
                <ContactForm />
              </motion.div>

              {/* Contact Info — narrower right column */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: ease.out }}
              >
                <div className="mb-8">
                  <h2
                    className="font-serif font-bold text-foreground mb-4"
                    style={{ fontSize: "var(--font-size-heading-2)" }}
                  >
                    Contact Information
                  </h2>
                  <p className="text-muted-foreground">
                    Visit our office or reach out through any of the channels below.
                  </p>
                </div>

                <div className="mb-10">
                  <ContactInfo icon={MapPin} title="Office Address">
                    <p>Gurd Shola, around Century Mall</p>
                    <p>Abenezer Building, 3rd Floor</p>
                    <p>Addis Ababa, Ethiopia</p>
                  </ContactInfo>

                  <ContactInfo icon={Phone} title="Phone">
                    {contactInfo.phones.map((phone) => (
                      <p key={phone}>
                        <a href={`tel:${phone}`} className="hover:text-foreground transition-colors">
                          {phone}
                        </a>
                      </p>
                    ))}
                  </ContactInfo>

                  <ContactInfo icon={Mail} title="Email">
                    {contactInfo.emails.map((email) => (
                      <p key={email}>
                        <a href={`mailto:${email}`} className="hover:text-foreground transition-colors">
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

                {/* Google Maps embed — sharp corners */}
                <div className="aspect-video overflow-hidden border border-border">
                  <iframe
                    title="Map of UCS Ethiopia office in Gurd Shola, Addis Ababa"
                    src="https://maps.google.com/maps?q=9.0227,38.7873&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    className={cn(
                      "w-full h-full transition-[filter] duration-300",
                      shouldInvertMap && "invert hue-rotate-180 brightness-90 saturate-[0.85]",
                    )}
                    style={{ border: 0, colorScheme: "light" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </motion.div>

            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
