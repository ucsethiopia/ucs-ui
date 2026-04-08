"use client";

import { SafeImage } from "@/components/shared/safe-image";
import { notFound } from "next/navigation";
import { useTeamMember, useTeamApi } from "@/hooks/use-team";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Award,
  Linkedin,
  Mail,
  Phone,
  Briefcase,
} from "lucide-react";
import { EducationSection } from "@/components/team/education-section";
import { ExperienceSection } from "@/components/team/experience-section";
import { TrainingsSection } from "@/components/team/trainings-section";
import { ProjectsSection } from "@/components/team/projects-section";
import { BackToTop } from "@/components/shared/back-to-top";
import { use } from "react";

interface TeamMemberPageProps {
  params: Promise<{
    member_name: string;
  }>;
}

function PageSkeleton() {
  return (
    <>
      <main>
        {/* Hero skeleton */}
        <div className="relative bg-navy-950 pt-24 pb-16">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-14">
            <div className="h-4 w-24 bg-white/10 rounded animate-pulse mb-4" />
            <div className="h-12 w-72 bg-white/10 rounded animate-pulse mb-3" />
            <div className="h-6 w-48 bg-white/10 rounded animate-pulse" />
          </div>
        </div>
        {/* Stats skeleton */}
        <div className="bg-navy-900 py-6">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-14 grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-white/5 rounded animate-pulse" />
            ))}
          </div>
        </div>
        {/* Content skeleton */}
        <div className="py-20 bg-background">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-14 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-14">
            <div className="space-y-4">
              <div className="aspect-[3/4] bg-muted rounded-xl animate-pulse" />
              <div className="h-10 bg-muted rounded animate-pulse" />
              <div className="h-10 bg-muted rounded animate-pulse" />
            </div>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-5 bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default function TeamMemberPage({ params }: TeamMemberPageProps) {
  const resolvedParams = use(params);
  const { member, isLoading, notFound: memberNotFound, error } = useTeamMember(
    resolvedParams.member_name,
  );
  const { team } = useTeamApi();

  if (isLoading) return <PageSkeleton />;
  if (memberNotFound || error || !member) notFound();

  const initials = member.name
    .split(" ")
    .filter((n) => /^[A-Za-z]/.test(n))
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // For members with multiple images, use a different shot for the hero background
  const hasMultipleImages = member.image?.length > 1;
  const heroImage = hasMultipleImages ? (member.image?.[1] ?? member.image?.[0]) : member.image?.[0];
  const memberImage = hasMultipleImages ? (member.image?.[3] ?? member.image?.[0]) : member.image?.[0];

  const summaryParagraphs = member.summary.split("\n\n").filter(Boolean);

  // Related team members (exclude current)
  const related = team
    .filter((m) => m.name !== member.name)
    .slice(0, 3);

  return (
    <>
      <main>
        {/* ─── Hero ─── */}
        <section className="relative bg-navy-950 pt-28 pb-20 overflow-hidden">
          {/* Background — member's own image, heavily overlaid */}
          <div className="absolute inset-0">
            {heroImage && (
              <SafeImage
                src={heroImage}
                alt=""
                fill
                sizes="100vw"
                className="object-cover object-top blur-sm scale-105"
                fallbackClassName="absolute inset-0"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/85 to-navy-950" />
          </div>

          {/* Ghost monogram watermark */}
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute right-8 top-1/2 -translate-y-1/2 font-serif font-bold text-white/[0.04] leading-none hidden lg:block"
            style={{ fontSize: "clamp(8rem, 18vw, 16rem)" }} /* dynamic clamp requires style prop */
          >
            {initials}
          </div>

          <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-14">
            <Link
              href="/about#team"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm mb-8 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
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
              <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-4">
                Our Team
              </p>
              <div className="w-10 h-px bg-gold-500/60 mb-6" />
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 text-balance">
                {member.name}
              </h1>
              <p className="text-lg text-gold-400 font-medium">{member.role}</p>
            </motion.div>
          </div>
        </section>

        {/* ─── Stats Strip ─── */}
        <section className="bg-navy-900 border-b border-white/10">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-14">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10"
            >
              {[
                {
                  label: "Years Experience",
                  value: member.years_of_experience
                    ? `${member.years_of_experience}+`
                    : "—",
                },
                {
                  label: "Qualifications",
                  value: member.titles?.length ?? "—",
                },
                {
                  label: "Achievements",
                  value: member.grants_awards?.length
                    ? `${member.grants_awards.length}`
                    : "—",
                },
                {
                  label: "Roles Held",
                  value: member.experiences?.filter((e) => e.type === "job").length || "—",
                },
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
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-14">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-14">
              {/* Left: Image and contact */}
              <div className="lg:sticky lg:top-24 lg:self-start space-y-8">
                {/* Profile image with gold accent frame */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.55, delay: 0.15 }}
                  className="relative"
                >
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted shadow-xl">
                    {memberImage ? (
                      <SafeImage
                        src={memberImage}
                        alt={member.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover object-top"
                        fallbackClassName="absolute inset-0"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-muted dark:bg-navy-900 flex items-center justify-center">
                        <span className="font-serif text-6xl font-bold text-foreground/20">
                          {initials}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
                  </div>
                  {/* Gold corner accents */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-gold-500/60 rounded-tl-sm" />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-gold-500/60 rounded-br-sm" />
                </motion.div>

                {/* Contact links */}
                <div className="space-y-2.5">
                  {member.contact?.linkedin && (
                    <a
                      href={member.contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 w-full px-4 py-3 bg-card border border-border rounded-lg hover:border-gold-500/40 hover:shadow-sm transition-[border-color,box-shadow] duration-200 group outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                    >
                      <Linkedin className="h-4 w-4 text-gold-500" />
                      <span className="text-sm font-medium text-foreground group-hover:text-gold-600 transition-colors">
                        LinkedIn Profile
                      </span>
                    </a>
                  )}
                  {member.contact?.email && (
                    <a
                      href={`mailto:${member.contact.email}`}
                      className="inline-flex items-center gap-3 w-full px-4 py-3 bg-card border border-border rounded-lg hover:border-gold-500/40 hover:shadow-sm transition-[border-color,box-shadow] duration-200 group outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                    >
                      <Mail className="h-4 w-4 text-gold-500" />
                      <span className="text-sm font-medium text-foreground truncate group-hover:text-gold-600 transition-colors">
                        {member.contact.email}
                      </span>
                    </a>
                  )}
                  {member.contact?.phone && (
                    <a
                      href={`tel:${member.contact.phone}`}
                      className="inline-flex items-center gap-3 w-full px-4 py-3 bg-card border border-border rounded-lg hover:border-gold-500/40 hover:shadow-sm transition-[border-color,box-shadow] duration-200 group outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                    >
                      <Phone className="h-4 w-4 text-gold-500" />
                      <span className="text-sm font-medium text-foreground group-hover:text-gold-600 transition-colors">
                        {member.contact.phone}
                      </span>
                    </a>
                  )}
                </div>

                {/* Experience badge */}
                {member.years_of_experience > 0 && (
                  <div className="flex items-center gap-3 px-4 py-3 bg-gold-500/5 border border-gold-500/20 rounded-lg">
                    <Briefcase className="h-5 w-5 text-gold-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Years of Experience
                      </p>
                      <p className="font-serif text-xl font-bold text-foreground">
                        {member.years_of_experience}+
                      </p>
                    </div>
                  </div>
                )}

                {/* Academic titles */}
                {member.titles && member.titles.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Qualifications
                    </p>
                    <ul className="space-y-1">
                      {member.titles.map((t, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right: Summary, skills, grants */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.25 }}
                className="space-y-16"
              >
                {/* Summary / biography */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-gold-500 rounded-full" />
                    <h2 className="font-serif text-2xl font-bold text-foreground">
                      Professional Background
                    </h2>
                  </div>
                  <div className="space-y-5">
                    {summaryParagraphs.map((paragraph, idx) => (
                      <p
                        key={idx}
                        className={
                          idx === 0
                            ? "text-muted-foreground leading-[1.8] text-[17px]"
                            : "text-muted-foreground leading-[1.8] text-base"
                        }
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <EducationSection education={member.education} />

                {/* Work Experience */}
                <ExperienceSection experiences={member.experiences} />

                {/* Technical skills — staggered entrance */}
                {member.technical_skills && member.technical_skills.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-6 bg-gold-500 rounded-full" />
                      <h3 className="font-serif text-2xl font-bold text-foreground">
                        Areas of Expertise
                      </h3>
                    </div>
                    <motion.div
                      className="flex flex-wrap gap-2.5"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-40px" }}
                      variants={{
                        visible: {
                          transition: { staggerChildren: 0.04 },
                        },
                      }}
                    >
                      {member.technical_skills.flatMap((cat) => cat.skills).map((skill, idx) => (
                        <motion.span
                          key={idx}
                          variants={{
                            hidden: { opacity: 0, scale: 0.85 },
                            visible: { opacity: 1, scale: 1 },
                          }}
                          transition={{ duration: 0.3 }}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-foreground hover:border-gold-500/50 hover:text-gold-600 transition-colors cursor-default"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
                          {skill}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                )}

                {/* Grants & awards — dark gradient cards */}
                {member.grants_awards && member.grants_awards.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <Award className="h-6 w-6 text-gold-500" />
                      <h3 className="font-serif text-2xl font-bold text-foreground">
                        Grants &amp; Awards
                      </h3>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      {member.grants_awards.map((award, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: Math.min(idx * 0.08, 0.4) }}
                          viewport={{ once: true }}
                          className="bg-gradient-to-br from-navy-950 to-navy-800 p-6 rounded-lg"
                        >
                          <div className="w-10 h-10 bg-gold-500/15 rounded-full flex items-center justify-center mb-4">
                            <Award className="w-5 h-5 text-gold-500" />
                          </div>
                          <p className="text-sm text-white/90 leading-relaxed mb-3">
                            {award.description}
                          </p>
                          {award.year > 0 && (
                            <p className="text-gold-400 text-sm font-semibold">
                              {award.year}
                            </p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Leadership programs */}
                {member.leadership_programs && member.leadership_programs.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-6 bg-gold-500 rounded-full" />
                      <h3 className="font-serif text-2xl font-bold text-foreground">
                        Leadership Programs
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {member.leadership_programs.map((prog, idx) => (
                        <li key={idx}>
                          <p className="font-semibold text-foreground">{prog.title}</p>
                          {prog.description && (
                            <p className="text-sm text-muted-foreground mt-0.5">{prog.description}</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* Professional Training */}
                <TrainingsSection trainings={member.trainings_taken} />

                {/* Projects */}
                <ProjectsSection projects={member.projects} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Related Team Members ─── */}
        {related.length > 0 && (
          <section className="py-20 bg-secondary/50">
            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-14">
              <div className="text-center mb-12">
                <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-4">
                  Our Leadership
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
                  Meet Other Team Members
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((teamMember, idx) => (
                  <motion.div
                    key={teamMember.name}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                  >
                    <Link
                      href={`/team/${teamMember.name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="group block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                    >
                      <div className="relative bg-card border border-border rounded-lg overflow-hidden transition-[border-color,box-shadow] duration-300 hover:shadow-xl hover:border-gold-500/30">
                        <div className="relative aspect-square overflow-hidden bg-muted">
                          {teamMember.image?.[0] ? (
                            <SafeImage
                              src={teamMember.image[0]}
                              alt={teamMember.name}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                              fallbackClassName="absolute inset-0"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-muted dark:bg-navy-900" />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
                        </div>
                        <div className="p-6">
                          <h3 className="font-serif font-semibold text-foreground mb-1 text-lg group-hover:text-gold-600 transition-colors">
                            {teamMember.name}
                          </h3>
                          <p className="text-gold-600 font-medium text-sm">
                            {teamMember.role}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <BackToTop />
    </>
  );
}
