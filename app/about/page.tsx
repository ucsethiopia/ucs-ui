"use client";

import { PageHero } from "@/components/shared/page-hero";
import { CoreValues } from "@/components/home/core-values";
import { HomeStatsStrip } from "@/components/home/home-stats-strip";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useTeamApi } from "@/hooks/use-team";
import { Container } from "@/components/shared/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { VisionMissionTabs } from "@/components/about/vision-mission-tabs";
import { OrbitalPartners } from "@/components/about/orbital-partners";
import { TeamMemberCard } from "@/components/about/team-member-card";
import { AnimatedCounter } from "@/components/shared/animated-counter";

export default function AboutPage() {
  const { team, isLoading } = useTeamApi();

  const { ref: teamRef, isVisible: teamVisible } =
    useScrollAnimation<HTMLDivElement>({
      rootMargin: "0px 0px -50px 0px",
    });

  const sortedTeam = [...team].sort(
    (a, b) => (a.org_order_index ?? 999) - (b.org_order_index ?? 999),
  );
  const owner = sortedTeam[0] ?? null;
  const otherMembers = sortedTeam.slice(1);

  return (
    <>
      <main id="main-content">
        {/* Hero Section - Condensed with Taller Height */}
        <PageHero
          eyebrow="About Us"
          title="Our Story"
          description="Established in 2012 G.C. with a mission to make a positive difference in organizations and individuals' life through the provision of value adding advisory, consultancy, research, and training services."
          backgroundImage="/images/hero/about-hero-background.png"
          backgroundPositionClass="bg-right-top sm:bg-top"
          contentWrapperClassName="ml-4 lg:mr-30"
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
                    UCS, thus, primarily works to support organizations in order
                    to effectively design and implement strategic organizational
                    change and transformation initiatives in response to the
                    profound changes that are taking place in many frontiers.
                    UCS, through its structured and organized approach in its
                    advisory and training services, has the mission to inspire
                    organizations for change and transformation through the
                    integration and application of the latest knowledge, skills,
                    tools and techniques available in the relevant field.
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
                      desc: "Established dedicated research and publication unit producing landmark sector studies and anniversary publications for Ethiopian Financial Sector.",
                    },
                    {
                      year: "2020",
                      title: "Regional Partnership",
                      desc: "Partnered with established consulting firms and multidisciplinary experts from around the world.",
                    },
                    {
                      year: "2026",
                      title: "50+ Organizations Served",
                      desc: "Milestone: over 50 organizations served across banking, insurance, manufacturing, and government.",
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
                        <p className="text-sm text-muted-foreground leading-relaxed">
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
              <div className="text-center mb-2">
                <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-3">
                  Purpose & Direction
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
                  What Guides Us
                </h2>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <VisionMissionTabs />
            </ScrollReveal>
          </Container>
        </section>

        {/* Statistics Section - After Mission/Vision */}
        <HomeStatsStrip showHeader />

        {/* Core Values - Reintegrated */}
        <CoreValues />

        {/* Strategic Partners - Orbital Visualization */}
        <OrbitalPartners />

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
                  international best practices to deliver exceptional results
                  for our clients.
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
                <div className="space-y-10">
                  {/* Owner/CEO - Featured with Years of Service stat */}
                  {owner && (
                    <div className="flex flex-col lg:flex-row gap-8 items-center">
                      {/* Years of Service — dark navy stage with animated ring */}
                      <div className="w-full lg:w-1/4 flex-shrink-0">
                        <div className="relative flex flex-col items-center justify-center bg-navy-950 border border-navy-800 rounded-2xl px-6 py-8 shadow-xl overflow-hidden">
                          {/* Corner accents */}
                          <span className="absolute top-0 left-0 w-7 h-7 border-t-2 border-l-2 border-gold-500/40 rounded-tl-2xl pointer-events-none" />
                          <span className="absolute bottom-0 right-0 w-7 h-7 border-b-2 border-r-2 border-gold-500/40 rounded-br-2xl pointer-events-none" />
                          {/* Subtle radial glow behind ring */}
                          <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span
                              className="w-36 h-36 rounded-full bg-gold-500/5 blur-2xl"
                              style={{
                                opacity: teamVisible ? 1 : 0,
                                transition: "opacity 1200ms ease",
                              }}
                            />
                          </span>

                          {/* SVG progress ring */}
                          <div className="relative mb-5">
                            <svg
                              className="-rotate-90 w-32 h-32"
                              viewBox="0 0 120 120"
                              aria-hidden="true"
                            >
                              {/* Track */}
                              <circle
                                cx="60"
                                cy="60"
                                r="50"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                className="text-navy-800"
                              />
                              {/* Animated arc — fills to ~75% representing 14 of ~18 possible years */}
                              <circle
                                cx="60"
                                cy="60"
                                r="50"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                className="text-gold-500"
                                strokeDasharray="314.16"
                                strokeDashoffset={
                                  teamVisible ? 314.16 * 0.25 : 314.16
                                }
                                style={{
                                  transition:
                                    "stroke-dashoffset 1800ms cubic-bezier(0.16,1,0.3,1)",
                                }}
                              />
                              {/* Trailing dot at arc end */}
                              <circle
                                cx="60"
                                cy="10"
                                r="3"
                                fill="currentColor"
                                className="text-gold-500"
                                style={{
                                  transformOrigin: "60px 60px",
                                  transform: teamVisible
                                    ? "rotate(270deg)"
                                    : "rotate(0deg)",
                                  transition:
                                    "transform 1800ms cubic-bezier(0.16,1,0.3,1)",
                                  opacity: teamVisible ? 1 : 0,
                                }}
                              />
                            </svg>

                            {/* Counter centered in ring */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <p className="font-serif font-bold tracking-tight text-gold-500 text-5xl leading-none">
                                <AnimatedCounter
                                  target={14}
                                  suffix="+"
                                  isVisible={teamVisible}
                                />
                              </p>
                            </div>
                          </div>

                          <p className="text-xs sm:text-sm text-white/70 font-medium uppercase tracking-widest text-center">
                            Years of Service
                          </p>
                          <p className="mt-1.5 text-xs text-white/30 uppercase tracking-[0.2em] text-center">
                            Est. 2012
                          </p>
                        </div>
                      </div>

                      <div className="w-full lg:w-3/4">
                        <TeamMemberCard
                          member={owner}
                          index={0}
                          isVisible={teamVisible}
                          isOwner
                        />
                      </div>
                    </div>
                  )}

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
