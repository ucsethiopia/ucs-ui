"use client";

import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useTeamMember } from "@/hooks/use-team";
import { teamMembers } from "@/lib/mock-data";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Linkedin,
  Mail,
  Award,
  Briefcase,
  Star,
} from "lucide-react";
import { use } from "react";
import { cn } from "@/lib/utils";

interface TeamMemberPageProps {
  params: Promise<{
    member_name: string;
  }>;
}

function PageSkeleton() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero skeleton */}
        <div className="relative bg-navy-950 pt-24 pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="h-4 w-24 bg-white/10 rounded animate-pulse mb-4" />
            <div className="h-12 w-72 bg-white/10 rounded animate-pulse mb-3" />
            <div className="h-6 w-48 bg-white/10 rounded animate-pulse" />
          </div>
        </div>
        {/* Stats skeleton */}
        <div className="bg-navy-900 py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-white/5 rounded animate-pulse" />
            ))}
          </div>
        </div>
        {/* Content skeleton */}
        <div className="py-20 bg-background">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="aspect-[3/4] bg-muted rounded-xl animate-pulse" />
              <div className="h-10 bg-muted rounded animate-pulse" />
              <div className="h-10 bg-muted rounded animate-pulse" />
            </div>
            <div className="lg:col-span-2 space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-5 bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function TeamMemberPage({ params }: TeamMemberPageProps) {
  const resolvedParams = use(params);
  const { member, isLoading, error } = useTeamMember(
    resolvedParams.member_name,
  );

  if (isLoading) return <PageSkeleton />;
  if (error || !member) notFound();

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const bioParagraphs = member.bio.split("\n\n").filter(Boolean);

  return (
    <>
      <Navbar />
      <main>
        {/* ─── Hero ─── */}
        <section className="relative bg-navy-950 pt-28 pb-20 overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1200&auto=format&fit=crop')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/80 to-navy-950" />
          </div>

          {/* Ghost monogram watermark */}
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute right-8 top-1/2 -translate-y-1/2 font-serif font-bold text-white/[0.04] leading-none hidden lg:block"
            style={{ fontSize: "clamp(8rem, 18vw, 16rem)" }}
          >
            {initials}
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/about#team"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Team
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <p className="text-gold-500 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                Our Team
              </p>
              {/* Gold rule */}
              <div className="w-10 h-px bg-gold-500/60 mb-6" />
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 text-balance">
                {member.name}
              </h1>
              <p className="text-lg text-gold-400 font-medium">{member.title}</p>
            </motion.div>
          </div>
        </section>

        {/* ─── Stats Strip ─── */}
        <section className="bg-navy-900 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10"
            >
              {[
                {
                  label: "Years Experience",
                  value: member.yearsOfExperience
                    ? `${member.yearsOfExperience}+`
                    : "—",
                },
                {
                  label: "Expertise Areas",
                  value: member.expertise?.length ?? "—",
                },
                {
                  label: "Key Achievements",
                  value: member.achievements?.length ?? "—",
                },
                ...(member.certifications && member.certifications.length > 0
                  ? [
                      {
                        label: "Certifications",
                        value: member.certifications.length,
                      },
                    ]
                  : [
                      {
                        label: "Industry",
                        value: "Advisory",
                      },
                    ]),
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="px-6 py-5 text-center first:pl-0 last:pr-0"
                >
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-gold-400 tabular-nums">
                    {stat.value}
                  </p>
                  <p className="text-xs text-white/50 mt-1 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── Profile Content ─── */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              {/* Left: Image, contact, certifications */}
              <div className="lg:sticky lg:top-24 lg:self-start space-y-8">
                {/* Profile image with gold accent frame */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.55, delay: 0.15 }}
                  className="relative"
                >
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted shadow-xl">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
                  </div>
                  {/* Gold corner accents */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-gold-500/60 rounded-tl-sm" />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-gold-500/60 rounded-br-sm" />
                </motion.div>

                {/* Contact links */}
                <div className="space-y-2.5">
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 w-full px-4 py-3 bg-card border border-border rounded-lg hover:border-gold-500/40 hover:shadow-sm transition-all group"
                    >
                      <Linkedin className="h-4 w-4 text-gold-500" />
                      <span className="text-sm font-medium text-foreground group-hover:text-gold-600 transition-colors">
                        LinkedIn Profile
                      </span>
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center gap-3 w-full px-4 py-3 bg-card border border-border rounded-lg hover:border-gold-500/40 hover:shadow-sm transition-all group"
                    >
                      <Mail className="h-4 w-4 text-gold-500" />
                      <span className="text-sm font-medium text-foreground truncate group-hover:text-gold-600 transition-colors">
                        {member.email}
                      </span>
                    </a>
                  )}
                </div>

                {/* Experience badge */}
                {member.yearsOfExperience && (
                  <div className="flex items-center gap-3 px-4 py-3 bg-gold-500/5 border border-gold-500/20 rounded-lg">
                    <Briefcase className="h-5 w-5 text-gold-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Years of Experience
                      </p>
                      <p className="font-serif text-xl font-bold text-foreground">
                        {member.yearsOfExperience}+
                      </p>
                    </div>
                  </div>
                )}

                {/* Certifications */}
                {member.certifications && member.certifications.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="h-4 w-4 text-gold-500" />
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Certifications
                      </p>
                    </div>
                    <ul className="space-y-2">
                      {member.certifications.map((cert, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-sm text-muted-foreground"
                        >
                          <Star className="h-3 w-3 text-gold-500 flex-shrink-0 mt-1" />
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right: Bio, expertise, achievements */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.25 }}
                className="lg:col-span-2 space-y-16"
              >
                {/* Biography */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-gold-500 rounded-full" />
                    <h2 className="font-serif text-2xl font-bold text-foreground">
                      Professional Background
                    </h2>
                  </div>
                  <div className="space-y-5">
                    {bioParagraphs.map((paragraph, idx) => (
                      <p
                        key={idx}
                        className={cn(
                          "text-muted-foreground leading-[1.8]",
                          idx === 0 ? "text-[17px]" : "text-base",
                        )}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Expertise tag grid */}
                {member.expertise && member.expertise.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-6 bg-gold-500 rounded-full" />
                      <h3 className="font-serif text-2xl font-bold text-foreground">
                        Areas of Expertise
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {member.expertise.map((skill, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-foreground hover:border-gold-500/50 hover:text-gold-600 transition-colors cursor-default"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements — numbered with large gold serifs */}
                {member.achievements && member.achievements.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-6 bg-gold-500 rounded-full" />
                      <h3 className="font-serif text-2xl font-bold text-foreground">
                        Key Achievements
                      </h3>
                    </div>
                    <div className="space-y-6">
                      {member.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex gap-5 items-start">
                          <span
                            className="font-serif font-bold text-gold-500/30 leading-none flex-shrink-0 select-none"
                            style={{ fontSize: "3.5rem", lineHeight: 1 }}
                          >
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <p className="text-muted-foreground leading-relaxed pt-2 text-[15px]">
                            {achievement}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Related Team Members ─── */}
        <section className="py-20 bg-secondary/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-gold-500 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                Our Leadership
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
                Meet Other Team Members
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers
                .filter((m) => m.id !== member.id)
                .slice(0, 3)
                .map((teamMember, idx) => (
                  <motion.div
                    key={teamMember.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                  >
                    <Link
                      href={`/team/${teamMember.name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="group block"
                    >
                      <div className="relative bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gold-500/30">
                        <div className="relative aspect-square overflow-hidden bg-muted">
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                            style={{
                              backgroundImage: `url('https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop')`,
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
                        </div>
                        <div className="p-6">
                          <h3 className="font-serif font-semibold text-foreground mb-1 text-lg group-hover:text-gold-600 transition-colors">
                            {teamMember.name}
                          </h3>
                          <p className="text-gold-600 font-medium text-sm">
                            {teamMember.title}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
