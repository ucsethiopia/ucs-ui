"use client";

import { TeamMemberCard } from "@/components/about/team-member-card";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { type TeamMember } from "@/hooks/use-team";

export const CONSULTING_PARTNER_TITLE = "Consulting Partner";

// Partners are identified by title, not `role` — one partner's role field
// reads "Associate Consultant" while their title is "Consulting Partner".
export function isConsultingPartner(member: TeamMember): boolean {
  return member.titles.includes(CONSULTING_PARTNER_TITLE);
}

const PARTNER_COLUMNS = 4;

export function ConsultingPartners({ members }: { members: TeamMember[] }) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    rootMargin: "0px 0px -50px 0px",
  });

  if (members.length === 0) return null;

  return (
    <div ref={ref} className="mt-16 lg:mt-20">
      {/* Gold-rule eyebrow, centered between hairlines */}
      <div className="flex items-center gap-4 sm:gap-6 mb-4">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-500/60" />
        <h3 className="shrink-0 text-gold-500 text-sm font-semibold uppercase tracking-widest">
          Consulting Partners
        </h3>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-500/60" />
      </div>
      <p className="text-center text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
        Senior practitioners who partner with UCS on specialist engagements.
      </p>

      {/* Same card as the core team, in the same grid rhythm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {members.map((member, index) => (
          <TeamMemberCard
            key={member.name}
            member={member}
            index={index}
            isVisible={isVisible}
            gridCols={PARTNER_COLUMNS}
          />
        ))}
      </div>
    </div>
  );
}
