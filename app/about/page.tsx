"use client";

import { PageHero } from "@/components/shared/page-hero";
import { CoreValues } from "@/components/home/core-values";
import { Statistics } from "@/components/statistics";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useTeamApi } from "@/hooks/use-team";
import { Container } from "@/components/shared/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { VisionMissionTabs } from "@/components/about/vision-mission-tabs";
import { OrbitalPartners } from "@/components/about/orbital-partners";
import { TeamMemberCard } from "@/components/about/team-member-card";

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
        <Statistics />

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
