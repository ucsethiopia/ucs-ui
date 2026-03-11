"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/shared/page-hero";
import { CoreValues } from "@/components/home/core-values";
import { Statistics } from "@/components/statistics";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useTeamApi } from "@/hooks/use-team";
import { type TeamMember } from "@/lib/mock-data";
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
            "group relative bg-card border border-border rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-gold-500/30 cursor-pointer",
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
                  backgroundImage: `url('https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop')`,
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
                {member.title}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-4 lg:line-clamp-none lg:max-h-none">
                {member.bio.split("\n\n")[0]}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6 hidden lg:block line-clamp-2">
                {member.bio.split("\n\n")[1]}
              </p>
              <div className="flex items-center gap-6">
                <span className="inline-flex items-center text-sm font-semibold text-foreground transition-colors group-hover:text-gold-600">
                  View Full Profile →
                </span>
                {member.yearsOfExperience && (
                  <span className="text-sm text-muted-foreground">
                    <span className="font-semibold text-gold-600">
                      {member.yearsOfExperience}+
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
          "group relative bg-card border border-border rounded-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-gold-500/30 cursor-pointer h-full",
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
              backgroundImage: `url('https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop')`,
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
            {member.title}
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

  const { ref: storyRef, isVisible: storyVisible } =
    useScrollAnimation<HTMLDivElement>();
  const { ref: teamRef, isVisible: teamVisible } =
    useScrollAnimation<HTMLDivElement>({
      rootMargin: "0px 0px -50px 0px",
    });

  const owner = team.find((m) => m.isOwner);
  const otherMembers = team.filter((m) => !m.isOwner);

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Hero Section - Condensed with Taller Height */}
        <PageHero
          eyebrow="About Us"
          title="Our Story"
          description="For over 15 years, UCS Ethiopia has been a trusted partner for organizations seeking to transform and grow."
          backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop"
          condensed
        />

        {/* Our Story Section */}
        <section className="py-12 sm:py-20 lg:py-28 bg-background">
          <Container>
            <div
              ref={storyRef}
              className={cn(
                "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-700",
                storyVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8",
              )}
            >
              {/* Image */}
              <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-muted">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop')`,
                  }}
                />
                {/* Decorative Element */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gold-500/20 rounded-lg -z-10" />
              </div>

              {/* Content */}
              <div>
                <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-4">
                  Who We Are
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
                  Driving Excellence in Ethiopian Business
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Founded in 2011, Ultimate Consultancy Service (UCS) Ethiopia
                    has grown to become one of the country{"'"}s most trusted
                    management consulting firms. Based in the heart of Bole,
                    Addis Ababa, we serve a diverse portfolio of clients
                    including major banks, leading corporations, and government
                    institutions.
                  </p>
                  <p>
                    Our mission is to drive sustainable growth and
                    transformation for Ethiopian enterprises by delivering
                    world-class advisory, training, and research services. We
                    combine deep local expertise with international best
                    practices to help our clients achieve their strategic
                    objectives.
                  </p>
                  <p>
                    Over the years, we have partnered with more than 150
                    organizations, trained thousands of professionals, and
                    contributed to some of the most significant business
                    transformations in the country. Our success is measured by
                    the success of our clients.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Mission & Vision */}
        <section className="py-12 sm:py-20 lg:py-28 bg-secondary/50">
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
                <p className="text-muted-foreground leading-relaxed">
                  To empower Ethiopian organizations with the knowledge, tools,
                  and strategies they need to compete effectively in a rapidly
                  evolving business landscape, while fostering a culture of
                  excellence and continuous improvement.
                </p>
              </div>

              {/* Vision */}
              <div className="bg-card border border-border rounded-lg p-8 lg:p-10">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-6">
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
                <p className="text-muted-foreground leading-relaxed">
                  To be the premier consultancy partner for organizations across
                  Ethiopia and East Africa, recognized for our integrity,
                  excellence, and the measurable impact we deliver for our
                  clients and the communities they serve.
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
          className="py-12 sm:py-20 lg:py-28 bg-background scroll-mt-20"
        >
          <Container>
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
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
                  {/* Owner/CEO - Featured with extra bottom margin */}
                  {owner && (
                    <div className="mb-8">
                      <TeamMemberCard
                        member={owner}
                        index={0}
                        isVisible={teamVisible}
                        isOwner
                      />
                    </div>
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
                        key={member.id}
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
      <Footer />
    </>
  );
}
