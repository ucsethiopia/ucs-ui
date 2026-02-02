"use client";

import React from "react"

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Check, Loader2 } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/shared/page-hero";
import { servicePillars, simulateApiDelay } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  message: "",
};

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
        <div className="text-muted-foreground text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await simulateApiDelay(null, 1500);

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData(initialFormData);
  };

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Get in Touch"
          title="Contact Us"
          description="Ready to transform your organization? Let's start a conversation."
        />

        <section className="py-16 lg:py-24 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

                {isSubmitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-8 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                        <Check className="h-8 w-8 text-emerald-600" />
                      </div>
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-emerald-900 mb-2">
                      Thank You!
                    </h3>
                    <p className="text-emerald-700 mb-6">
                      Your message has been sent successfully. We{"'"}ll be in touch soon.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Full Name <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={cn(
                            "w-full rounded-sm border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all",
                            errors.name ? "border-destructive" : "border-input"
                          )}
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-destructive">{errors.name}</p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Email Address <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={cn(
                            "w-full rounded-sm border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all",
                            errors.email ? "border-destructive" : "border-input"
                          )}
                          placeholder="john@company.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-destructive">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Phone & Company Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full rounded-sm border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                          placeholder="+251 911 234 567"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="company"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Company
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full rounded-sm border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                          placeholder="Your Company"
                        />
                      </div>
                    </div>

                    {/* Service of Interest */}
                    <div>
                      <label
                        htmlFor="service"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Service of Interest
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full rounded-sm border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select a service</option>
                        {servicePillars.map((pillar) => (
                          <option key={pillar.id} value={pillar.title}>
                            {pillar.title}
                          </option>
                        ))}
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Message <span className="text-destructive">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={cn(
                          "w-full rounded-sm border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all resize-none",
                          errors.message ? "border-destructive" : "border-input"
                        )}
                        placeholder="Tell us about your needs..."
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-destructive">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-sm bg-gold-500 px-8 py-4 text-base font-semibold text-navy-950 transition-all hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="h-5 w-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
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
                      <a
                        href="mailto:info@ucsethiopia.com"
                        className="hover:text-gold-600 transition-colors"
                      >
                        info@ucsethiopia.com
                      </a>
                    </p>
                    <p>
                      <a
                        href="mailto:training@ucsethiopia.com"
                        className="hover:text-gold-600 transition-colors"
                      >
                        training@ucsethiopia.com
                      </a>
                    </p>
                  </ContactInfo>

                  <ContactInfo icon={Clock} title="Business Hours">
                    <p>Monday - Friday: 8:30 AM - 5:30 PM</p>
                    <p>Saturday: 9:00 AM - 1:00 PM</p>
                    <p>Sunday: Closed</p>
                  </ContactInfo>
                </div>

                {/* Map Placeholder */}
                <div className="aspect-video rounded-lg overflow-hidden bg-muted border border-border">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=1200&auto=format&fit=crop')`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
