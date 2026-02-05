"use client";

import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useTeamMember } from "@/hooks/use-team";
import { teamMembers } from "@/lib/mock-data";
import Link from "next/link";
import { ArrowLeft, Linkedin, Mail, Award, Briefcase } from "lucide-react";
import { use } from "react";

interface TeamMemberPageProps {
  params: Promise<{
    member_name: string;
  }>;
}

export default function TeamMemberPage({ params }: TeamMemberPageProps) {
  const resolvedParams = use(params);
  const { member, isLoading, error } = useTeamMember(
    resolvedParams.member_name,
  );

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gold-500 border-r-transparent" />
            <p className="mt-4 text-muted-foreground">Loading...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !member) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative bg-navy-950 pt-24 pb-16">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1200&auto=format&fit=crop')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/70 to-navy-950/90" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Team
              </Link>
            </div>

            <div className="max-w-2xl">
              <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-4">
                Our Team
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 text-balance">
                {member.name}
              </h1>
              <p className="text-xl text-gold-500 font-semibold">
                {member.title}
              </p>
            </div>
          </div>
        </section>

        {/* Profile Content */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              {/* Left: Image & Quick Links */}
              <div className="lg:sticky lg:top-24 lg:self-start">
                {/* Profile Image */}
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted mb-8 shadow-lg">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop')`,
                    }}
                  />
                  {/* Decorative Element */}
                  <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-gold-500/20 rounded-lg -z-10" />
                </div>

                {/* Contact Links */}
                <div className="space-y-3">
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 w-full px-4 py-3 bg-card border border-border rounded-lg hover:border-gold-500/30 hover:shadow-md transition-all group"
                    >
                      <Linkedin className="h-5 w-5 text-gold-500 group-hover:text-gold-600" />
                      <span className="text-sm font-medium text-foreground">
                        LinkedIn Profile
                      </span>
                    </a>
                  )}

                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center gap-3 w-full px-4 py-3 bg-card border border-border rounded-lg hover:border-gold-500/30 hover:shadow-md transition-all group"
                    >
                      <Mail className="h-5 w-5 text-gold-500 group-hover:text-gold-600" />
                      <span className="text-sm font-medium text-foreground">
                        {member.email}
                      </span>
                    </a>
                  )}
                </div>

                {/* Quick Facts */}
                {member.yearsOfExperience && (
                  <div className="mt-8 pt-8 border-t border-border">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-gold-500/10 flex items-center justify-center">
                          <Briefcase className="h-6 w-6 text-gold-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground font-medium">
                            Years of Experience
                          </p>
                          <p className="text-2xl font-serif font-bold text-foreground">
                            {member.yearsOfExperience}+
                          </p>
                        </div>
                      </div>

                      {member.certifications &&
                        member.certifications.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <Award className="h-5 w-5 text-gold-500" />
                              <p className="text-sm text-muted-foreground font-medium">
                                Certifications
                              </p>
                            </div>
                            <ul className="space-y-2">
                              {member.certifications.map((cert, idx) => (
                                <li
                                  key={idx}
                                  className="text-sm text-foreground pl-4 border-l-2 border-gold-500/30"
                                >
                                  {cert}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Narrative Content */}
              <div className="lg:col-span-2">
                {/* Main Biography */}
                <div className="mb-12">
                  <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                    Professional Background
                  </h2>
                  <div className="prose prose-invert max-w-none">
                    <div className="space-y-5 text-muted-foreground leading-relaxed text-[17px]">
                      {member.bio.split("\n\n").map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Areas of Expertise */}
                {member.expertise && member.expertise.length > 0 && (
                  <div className="mb-12">
                    <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
                      Areas of Expertise
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {member.expertise.map((skill, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg hover:border-gold-500/30 hover:shadow-sm transition-all"
                        >
                          <div className="h-2 w-2 rounded-full bg-gold-500 mt-2 flex-shrink-0" />
                          <span className="text-foreground font-medium">
                            {skill}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements/Highlights */}
                {member.achievements && member.achievements.length > 0 && (
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
                      Key Achievements
                    </h3>
                    <div className="space-y-4">
                      {member.achievements.map((achievement, idx) => (
                        <div
                          key={idx}
                          className="flex gap-4 pb-4 border-b border-border last:border-b-0 last:pb-0"
                        >
                          <div className="h-8 w-8 rounded-full bg-gold-500/10 text-gold-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                            ✓
                          </div>
                          <div className="text-muted-foreground leading-relaxed pt-1">
                            {achievement}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Related Team Members */}
        <section className="py-20 lg:py-28 bg-secondary/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-4">
                Our Leadership
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Meet Other Team Members
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers
                .filter((m) => m.id !== member.id)
                .slice(0, 3)
                .map((teamMember) => (
                  <Link
                    key={teamMember.id}
                    href={`/team/${teamMember.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="group"
                  >
                    <div className="relative bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gold-500/30">
                      {/* Image */}
                      <div className="relative aspect-square overflow-hidden bg-muted">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                          style={{
                            backgroundImage: `url('https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop')`,
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
                      </div>

                      {/* Content */}
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
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
