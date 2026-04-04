"use client";

import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { CoreValues } from "@/components/home/core-values";
import { Statistics } from "@/components/statistics";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useTeamApi, type TeamMember } from "@/hooks/use-team";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

function TeamMemberCard({
  member,
  index,
  isVisible,
  isOwner,
}: {
  member: TeamMember;
  index: number;
  isVisible: boolean;
  isOwner?: boolean;
}) {
  const memberSlug = member.name.toLowerCase().replace(/\s+/g, "-");

  // CEO/Owner gets a special featured card layout
  if (isOwner) {
    return (
      <Link href={`/team/${memberSlug}`}>
        <div
          className={cn(
            "group relative bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-gold-500/30 hover:-translate-y-1 cursor-pointer",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
          style={{
            transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 lg:min-h-[400px]">
            {/* Image - Takes 2 columns on lg */}
            <div className="relative lg:col-span-2 aspect-[4/3] lg:aspect-auto overflow-hidden bg-muted">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage: member.image
                    ? `url('${member.image}')`
                    : `url('https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-navy-950/10" />
            </div>

            {/* Content - Takes 3 columns on lg */}
            <div className="lg:col-span-3 p-8 lg:p-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-gold-500/10 text-gold-600 rounded-full">
                  Founder & CEO
                </span>
              </div>
              <h3 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-2 transition-colors group-hover:text-gold-600">
                {member.name}
              </h3>
              <p className="text-gold-600 font-medium text-base mb-6">
                {member.role}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-4 lg:line-clamp-none lg:max-h-none">
                {member.summary.split("\n\n")[0]}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6 hidden lg:block line-clamp-2">
                {member.summary.split("\n\n")[1]}
              </p>
              <div className="flex items-center gap-6">
                <span className="inline-flex items-center text-sm font-semibold text-foreground transition-colors group-hover:text-gold-600">
                  View Full Profile →
                </span>
                {member.years_of_experience > 0 && (
                  <span className="text-sm text-muted-foreground">
                    <span className="font-semibold text-gold-600">
                      {member.years_of_experience}+
                    </span>{" "}
                    years experience
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Regular team member card
  return (
    <Link href={`/team/${memberSlug}`}>
      <div
        className={cn(
          "group relative bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gold-500/30 hover:-translate-y-1 cursor-pointer h-full",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        )}
        style={{
          transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
        }}
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage: member.image
                ? `url('${member.image}')`
                : `url('https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-serif font-semibold text-foreground mb-1 text-xl transition-colors group-hover:text-gold-600">
            {member.name}
          </h3>
          <p className="text-gold-600 font-medium text-sm mb-4">
            {member.role}
          </p>
          <span className="inline-flex items-center text-sm font-semibold text-foreground transition-colors group-hover:text-gold-600">
            View Profile →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function AboutPage() {
  const { team, isLoading } = useTeamApi();

  const { ref: teamRef, isVisible: teamVisible } =
    useScrollAnimation<HTMLDivElement>({
      rootMargin: "0px 0px -50px 0px",
    });

  // First team member is shown as the featured "owner/CEO" card
  const owner = team[0] ?? null;
  const otherMembers = team.slice(1);

  return (
    <>
      <main id="main-content">
        {/* Hero Section - Condensed with Taller Height */}
        <PageHero
          eyebrow="About Us"
          title="Our Story"
          description="Established in 2012 G.C. with a mission to make a positive difference in organizations and individuals' life through the provision of value adding advisory and training services."
          backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop"
          condensed
        />

        {/* Our Story Section */}
        <section className="py-10 md:py-16 bg-background">
          <Container>
            {/* Heading — spans full width above both columns */}
            <ScrollReveal>
              <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-4">
                Our Story
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight mb-8">
                Building Ethiopia&apos;s Consulting Profession
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
              {/* Left — prose paragraphs */}
              <ScrollReveal className="h-full">
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p className="text-justify">
                    As bigger wave of changes are looming on the horizon,
                    organizations are likely to face multifaceted challenges
                    that will continue impacting every facet of their
                    activities. The implications of the current winds of change
                    are far reaching unless organizations strategically get
                    prepared both in the near and distant future. Among others,
                    the unprecedented growth in competition and globalization,
                    triggered by recent advances in technology, is demanding
                    organizations to continually renew and modernize the way
                    they do business to compete and thrive on a global scale.
                  </p>
                  <p className="text-justify">
                    UCS, thus, primarily works to support organizations in
                    order to effectively design and implement strategic
                    organizational change and transformation initiatives in
                    response to the profound changes that are taking place in
                    many frontiers. UCS, through its structured and organized
                    approach in its advisory and training services, has the
                    mission to inspire organizations for change and
                    transformation through the integration and application of
                    the latest knowledge, skills, tools and techniques available
                    in the relevant field.
                  </p>
                  <p className="text-justify">
                    While providing its service, UCS brings in the professional
                    expertise (the most up-to-date knowledge, skills, and
                    experiences) needed by organizations in their endeavor to
                    change and transform along the latest developments. UCS
                    believes that its mission will come true as it continually
                    and closely work with its esteemed customers in steering
                    strategic mindset changes that keeps them moving with the
                    changing world.
                  </p>
                </div>
              </ScrollReveal>

              {/* Right — milestone timeline, stretches to match left column height */}
              <ScrollReveal delay={0.15} className="h-full">
                <div className="h-full flex flex-col">
                  {[
                    {
                      year: "2012",
                      title: "Founded",
                      desc: "Established in Addis Ababa with a mission to make a positive difference through value adding advisory and training services.",
                    },
                    {
                      year: "2014",
                      title: "Training Division Launched",
                      desc: "Expanded into professional development, delivering first cohort of executive leadership programs.",
                    },
                    {
                      year: "2017",
                      title: "Research & Publication",
                      desc: "Established dedicated research practice producing landmark sector studies for Ethiopian industry.",
                    },
                    {
                      year: "2020",
                      title: "Regional Expansion",
                      desc: "Extended operations to 5 East African countries through strategic partnerships.",
                    },
                    {
                      year: "2026",
                      title: "150+ Organizations Served",
                      desc: "Milestone: over 150 organizations served across banking, insurance, manufacturing, and government.",
                    },
                  ].map((item, i) => (
                    <div key={item.year} className="flex gap-5 flex-1">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/5 dark:bg-white/5 border border-primary/15 dark:border-white/10 flex-shrink-0">
                          <span className="text-xs font-bold text-foreground dark:text-gold-500">
                            {i + 1}
                          </span>
                        </div>
                        {i < 4 && (
                          <div className="w-px flex-1 bg-border mt-2" />
                        )}
                      </div>
                      <div className="pb-2">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xs font-semibold text-gold-500 tracking-wide">
                            {item.year}
                          </span>
                          <h3 className="font-serif text-base font-bold text-foreground">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </Container>
        </section>

        {/* Mission & Vision */}
        <section className="py-10 md:py-16 bg-secondary/50">
          <Container>
            <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission */}
              <div className="bg-card border border-border rounded-lg p-8 lg:p-10">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gold-500/10 text-gold-600 mb-6">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
                  Our Mission
                </h3>
                <p className="text-muted-foreground leading-relaxed text-justify">
                  To conduct research, deliver trainings, advise and support
                  organizations in the attainment of their corporate strategic
                  goals and objectives both in the short and long term.
                </p>
              </div>

              {/* Vision */}
              <div className="bg-card border border-border rounded-lg p-8 lg:p-10">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gold-500/10 text-gold-600 mb-6">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
                  Our Vision
                </h3>
                <p className="text-muted-foreground leading-relaxed text-justify">
                  To become a change and transformation catalyst within
                  organizations in Ethiopia and beyond.
                </p>
              </div>
            </div>
            </ScrollReveal>
          </Container>
        </section>

        {/* Statistics Section - After Mission/Vision */}
        <Statistics />

        {/* Core Values - Reintegrated */}
        <CoreValues />

        {/* Team Section */}
        <section
          id="team"
          className="py-10 md:py-16 bg-background scroll-mt-20"
        >
          <Container>
            {/* Section Header */}
            <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-4">
                Leadership
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
                Meet Our Team
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our experienced team combines deep local expertise with
                international best practices to deliver exceptional results for
                our clients.
              </p>
            </div>
            </ScrollReveal>

            {/* Team Grid */}
            <div ref={teamRef}>
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="bg-card border border-border rounded-lg overflow-hidden"
                    >
                      <div className="aspect-square bg-muted animate-pulse" />
                      <div className="p-6 space-y-3">
                        <div className="h-6 w-32 bg-muted animate-pulse rounded" />
                        <div className="h-4 w-48 bg-muted animate-pulse rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-16">
                  {/* Owner/CEO - Featured */}
                  {owner && (
                    <TeamMemberCard
                      member={owner}
                      index={0}
                      isVisible={teamVisible}
                      isOwner
                    />
                  )}

                  {/* Divider between CEO and Team */}
                  <div className="flex items-center gap-4 my-4">
                    <div className="flex-1 h-px bg-border" />
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                      Leadership Team
                    </p>
                    <div className="flex-1 h-px bg-border" />
                  </div>

                  {/* Other Team Members */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {otherMembers.map((member, index) => (
                      <TeamMemberCard
                        key={member.name}
                        member={member}
                        index={index + 1}
                        isVisible={teamVisible}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
