"use client";

import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Send, Loader2, Check } from "lucide-react";
import { servicePillars } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const INJECTION_RE =
  /(<script[\s>\/]|javascript\s*:|on\w+\s*=|--[\s;]|'\s*(OR|AND)\s+|;\s*(DROP|DELETE|INSERT|UPDATE|SELECT|TRUNCATE|EXEC)\s|UNION\s+SELECT)/i;

const safe = (val?: string): boolean => !val || !INJECTION_RE.test(val);

const contactSchema = z.object({
  fullname: z
    .string()
    .min(1, "Name is required")
    .refine(safe, "Name contains disallowed content"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  subject: z
    .string()
    .optional()
    .refine(safe, "Subject contains disallowed content"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?[\d\s\-()]{7,}$/.test(val),
      "Please enter a valid phone number",
    ),
  company: z
    .string()
    .optional()
    .refine(safe, "Company name contains disallowed content"),
  service: z.string().optional(),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters")
    .refine(safe, "Message contains disallowed content"),
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

  const formatPhone = (value: string): string => {
    const digits = value.replace(/[^\d+]/g, "");
    if (digits.startsWith("+251")) {
      const local = digits.slice(4).replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3").trim();
      return local ? `+251 ${local}` : "+251";
    }
    if (digits.startsWith("0")) {
      return digits.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3").trim();
    }
    return digits;
  };

  const { onChange: phoneRegisterOnChange, ...phoneFieldProps } = register("phone");

  useEffect(() => {
    if (isSubmitSuccessful) {
      successRef.current?.focus();
    }
  }, [isSubmitSuccessful]);

  const BASE_URL = process.env.NEXT_PUBLIC_UCS_SERVICE_API_URL ?? "";

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch(`${BASE_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          subject: data.subject?.trim() || `Inquiry from ${data.fullname} via UCS Ethiopia`,
        }),
      });
      if (res.status === 503) {
        // Saved but email notification failed — still treat as success
        toast.success("Message received!", {
          description: "We'll get back to you shortly.",
        });
      } else if (!res.ok) {
        throw new Error(`API error ${res.status}`);
      } else {
        toast.success("Message sent!", {
          description: "We'll get back to you within 24 hours.",
        });
      }
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
          <label htmlFor="fullname" className="block text-sm font-medium text-foreground mb-2">
            Full Name <span className="text-destructive">*</span>
          </label>
          <input
            {...register("fullname")}
            id="fullname"
            type="text"
            autoFocus
            placeholder="John Doe"
            aria-describedby={errors.fullname ? "fullname-error" : undefined}
            className={cn(inputClass, errors.fullname && "border-destructive")}
          />
          <FieldError id="fullname-error" message={errors.fullname?.message} />
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

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
          Subject
        </label>
        <input
          {...register("subject")}
          id="subject"
          type="text"
          placeholder="How can we help? (optional)"
          className={inputClass}
        />
      </div>

      {/* Phone & Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
            Phone Number
          </label>
          <input
            {...phoneFieldProps}
            id="phone"
            type="tel"
            placeholder="+251 911 234 567"
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={cn(inputClass, errors.phone && "border-destructive")}
            onChange={(e) => {
              e.target.value = formatPhone(e.target.value);
              phoneRegisterOnChange(e);
            }}
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
