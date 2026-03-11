"use client";

import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Send, Loader2, Check } from "lucide-react";
import { servicePillars, simulateApiDelay } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?[\d\s\-()]{7,}$/.test(val),
      "Please enter a valid phone number",
    ),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const inputClass =
  "w-full rounded-sm border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1 text-sm text-destructive">
      {message}
    </p>
  );
}

export function ContactForm() {
  const successRef = useRef<HTMLHeadingElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  useEffect(() => {
    if (isSubmitSuccessful) {
      successRef.current?.focus();
    }
  }, [isSubmitSuccessful]);

  const onSubmit = async (data: ContactFormData) => {
    try {
      await simulateApiDelay(data, 1500);
      toast.success("Message sent!", {
        description: "We'll get back to you within 24 hours.",
      });
    } catch {
      toast.error("Something went wrong", {
        description: "Please try again or email us directly.",
      });
    }
  };

  if (isSubmitSuccessful) {
    return (
      <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
            <Check className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>
        <h3
          ref={successRef}
          tabIndex={-1}
          className="font-serif text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-2 focus:outline-none"
        >
          Thank You!
        </h3>
        <p className="text-emerald-700 dark:text-emerald-300 mb-6">
          Your message has been sent. We&apos;ll be in touch soon.
        </p>
        <button
          onClick={() => reset(undefined, { keepIsSubmitSuccessful: false })}
          className="text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-700 transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            Full Name <span className="text-destructive">*</span>
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            placeholder="John Doe"
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(inputClass, errors.name && "border-destructive")}
          />
          <FieldError id="name-error" message={errors.name?.message} />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email Address <span className="text-destructive">*</span>
          </label>
          <input
            {...register("email")}
            id="email"
            type="email"
            placeholder="john@company.com"
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(inputClass, errors.email && "border-destructive")}
          />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>
      </div>

      {/* Phone & Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
            Phone Number
          </label>
          <input
            {...register("phone")}
            id="phone"
            type="tel"
            placeholder="+251 911 234 567"
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={cn(inputClass, errors.phone && "border-destructive")}
          />
          <FieldError id="phone-error" message={errors.phone?.message} />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
            Company
          </label>
          <input
            {...register("company")}
            id="company"
            type="text"
            placeholder="Your Company"
            className={inputClass}
          />
        </div>
      </div>

      {/* Service */}
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
          Service of Interest
        </label>
        <select {...register("service")} id="service" className={inputClass}>
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
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          Message <span className="text-destructive">*</span>
        </label>
        <textarea
          {...register("message")}
          id="message"
          rows={5}
          placeholder="Tell us about your needs..."
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(inputClass, "resize-none", errors.message && "border-destructive")}
        />
        <FieldError id="message-error" message={errors.message?.message} />
      </div>

      {/* Submit */}
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
  );
}
