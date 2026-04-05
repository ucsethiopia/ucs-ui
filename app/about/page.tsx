"use client";

import { SafeImage } from "@/components/shared/safe-image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageHero } from "@/components/shared/page-hero";
import { CoreValues } from "@/components/home/core-values";
import { Statistics } from "@/components/statistics";
import { useTeamApi, type TeamMember } from "@/hooks/use-team";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/container";
import { VisionMissionTabs } from "@/components/about/vision-mission-tabs";
import { OrbitalPartners } from "@/components/about/orbital-partners";
import { ease, staggerContainer, staggerItem } from "@/lib/motion";

function TeamMemberCard({
  member,
  isOwner,
}: {
  member: TeamMember;
  isOwner?: boolean;
}) {
  const memberSlug = member.name.toLowerCase().replace(/\s+/g, "-");

  // CEO/Owner gets a special featured card layout
  if (isOwner) {
    return (
      <Link href={`/team/${memberSlug}`}>
        <div className="group relative bg-card border border-border rounded-lg overflow-hidden transition-colors duration-300 hover:bg-muted/30 cursor-pointer">
          <div className="grid grid-cols-1 lg:grid-cols-5 lg:min-h-[400px]">
            {/* Image */}
            <div className="relative lg:col-span-2 aspect-[4/3] lg:aspect-auto overflow-hidden bg-muted">
              {member.image ? (
                <SafeImage
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  fallbackClassName="absolute inset-0"
                />
              ) : (
                <div className="absolute inset-0 bg-navy-900" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-navy-950/10" />
            </div>

            {/* Content */}
            <div className="lg:col-span-3 p-8 lg:p-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-muted text-foreground rounded-full">
                  Founder & CEO
                </span>
              </div>
              <h3
                className="font-serif font-bold text-foreground mb-2"
                style={{ fontSize: "var(--font-size-heading-2)" }}
              >
                {member.name}
              </h3>
              <p className="text-muted-foreground font-medium text-base mb-6">
                {member.role}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-4 lg:line-clamp-none lg:max-h-none">
                {member.summary.split("\n\n")[0]}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6 hidden lg:block line-clamp-2">
                {member.summary.split("\n\n")[1]}
              </p>
              <div className="flex items-center gap-6">
                <span className="inline-flex items-center text-sm font-semibold text-foreground transition-opacity group-hover:opacity-70">
                  View Full Profile →
                </span>
                {member.years_of_experience > 0 && (
                  <span className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">
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
      <div className="group relative bg-card border border-border rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg cursor-pointer h-full">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          {member.image ? (
            <SafeImage
              src={member.image}
              alt={member.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              fallbackClassName="absolute inset-0"
            />
          ) : (
            <div className="absolute inset-0 bg-navy-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-serif font-semibold text-foreground mb-1 text-xl">
            {member.name}
          </h3>
          <p className="text-muted-foreground font-medium text-sm">
            {member.role}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function AboutPage() {
  const { team, isLoading } = useTeamApi();

  // First team member is shown as the featured "owner/CEO" card
  const owner = team[0] ?? null;
  const otherMembers = team.slice(1);

  return (
    <>
      <main id="main-content">
        {/* Hero Section */}
        <PageHero
          eyebrow="About Us"
          title="Our Story"
          description="Established in 2012 G.C. with a mission to make a positive difference in organizations and individuals' life through the provision of value adding advisory and training services."
          backgroundImage="/images/hero/about-hero-background.png"
          backgroundPositionClass="bg-top"
          contentWrapperClassName="ml-4 lg:mr-30"
          condensed
        />

        {/* Our Story Section — single-column editorial flow */}
        <section style={{ paddingBlock: "var(--space-section-normal)" }}>
          <Container variant="narrow">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: ease.out }}
            >
              <h2
                className="font-serif font-bold text-foreground leading-tight mb-8"
                style={{ fontSize: "var(--font-size-heading-1)" }}
              >
                Building Ethiopia&apos;s Consulting Profession
              </h2>
            </motion.div>

            <motion.div
              className="space-y-6 text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: ease.out }}
              style={{ fontSize: "var(--font-size-body-lg)" }}
            >
              <p>
                As bigger wave of changes are looming on the horizon,
                organizations are likely to face multifaceted challenges
                that will continue impacting every facet of their
                activities. The implications of the current winds of change
                are far reaching unless organizations strategically get
                prepared both in the near and distant future.
              </p>

              {/* Pull-quote */}
              <blockquote className="border-l-2 border-foreground/20 pl-6 py-2 my-8 text-foreground font-serif italic" style={{ fontSize: "var(--font-size-heading-3)" }}>
                Inspiring organizations for change and transformation through the
                integration of the latest knowledge, skills, tools and techniques.
              </blockquote>

              <p>
                UCS primarily works to support organizations in order
                to effectively design and implement strategic organizational
                change and transformation initiatives in response to the
                profound changes that are taking place in many frontiers.
                Through its structured and organized approach in advisory
                and training services, UCS has the mission to inspire
                organizations for change and transformation.
              </p>
              <p>
                While providing its service, UCS brings in the professional
                expertise — the most up-to-date knowledge, skills, and
                experiences — needed by organizations in their endeavor to
                change and transform along the latest developments. UCS
                believes that its mission will come true as it continually
                and closely work with its esteemed customers in steering
                strategic mindset changes that keeps them moving with the
                changing world.
              </p>
            </motion.div>

            {/* Horizontal timeline */}
            <motion.div
              className="mt-16 overflow-x-auto scrollbar-hide"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.15, ease: ease.out }}
            >
              <div className="flex gap-0 min-w-max border-t border-border pt-6">
                {[
                  { year: "2012", title: "Founded", desc: "Established in Addis Ababa" },
                  { year: "2014", title: "Training Division", desc: "Executive leadership programs" },
                  { year: "2017", title: "Research & Publication", desc: "Landmark sector studies" },
                  { year: "2020", title: "Regional Expansion", desc: "5 East African countries" },
                  { year: "2026", title: "150+ Organizations", desc: "Across all major sectors" },
                ].map((item) => (
                  <div key={item.year} className="w-48 flex-shrink-0 pr-6">
                    <div className="w-2 h-2 rounded-full bg-foreground -mt-[calc(1.5rem+5px)] mb-4" />
                    <p className="text-xs font-bold text-foreground tracking-wider mb-1">{item.year}</p>
                    <p className="text-sm font-semibold text-foreground mb-0.5">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Mission & Vision — side-by-side, no tabs */}
        <section className="border-t border-border" style={{ paddingBlock: "var(--space-section-normal)" }}>
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: ease.out }}
            >
              <h2
                className="font-serif font-bold text-foreground mb-2"
                style={{ fontSize: "var(--font-size-heading-1)" }}
              >
                What Guides Us
              </h2>
            </motion.div>
            <VisionMissionTabs />
          </Container>
        </section>

        {/* Statistics Section */}
        <Statistics />

        {/* Core Values */}
        <CoreValues />

        {/* Strategic Partners */}
        <OrbitalPartners />

        {/* Team Section */}
        <section
          id="team"
          className="scroll-mt-20 border-t border-border"
          style={{ paddingBlock: "var(--space-section-normal)" }}
        >
          <Container>
            {/* Section Header — left-aligned */}
            <motion.div
              className="max-w-xl mb-10"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: ease.out }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">
                Leadership
              </p>
              <h2
                className="font-serif font-bold text-foreground mb-4"
                style={{ fontSize: "var(--font-size-heading-1)" }}
              >
                Meet Our Team
              </h2>
              <p className="text-muted-foreground leading-relaxed" style={{ fontSize: "var(--font-size-body-lg)" }}>
                Our experienced team combines deep local expertise with
                international best practices to deliver exceptional results.
              </p>
            </motion.div>

            {/* Team Grid */}
            <div>
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
                <motion.div
                  className="space-y-12"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                >
                  {/* Owner/CEO - Featured */}
                  {owner && (
                    <motion.div variants={staggerItem}>
                      <TeamMemberCard member={owner} isOwner />
                    </motion.div>
                  )}

                  {/* Divider */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-border" />
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-[0.15em]">
                      Leadership Team
                    </p>
                    <div className="flex-1 h-px bg-border" />
                  </div>

                  {/* Other Team Members */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {otherMembers.map((member) => (
                      <motion.div key={member.name} variants={staggerItem}>
                        <TeamMemberCard member={member} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
