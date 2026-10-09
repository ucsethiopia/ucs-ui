"use client";

import Link from "next/link";
import { SafeImage } from "@/components/shared/safe-image";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn, pickBalancedColumns } from "@/lib/utils";
import { type TeamMember } from "@/hooks/use-team";

export const CONSULTING_PARTNER_TITLE = "Consulting Partner";

// Partners are identified by title, not `role` — one partner's role field
// reads "Associate Consultant" while their title is "Consulting Partner".
export function isConsultingPartner(member: TeamMember): boolean {
  return member.titles.includes(CONSULTING_PARTNER_TITLE);
}

// Literal classes so Tailwind's scanner sees them (choice is made at runtime).
const LG_GRID_COLS: Record<number, string> = {
  4: "lg:grid-cols-4",
  3: "lg:grid-cols-3",
};
const REVEAL_STAGGER_MS = 100;

function PartnerCard({
  member,
  index,
  isVisible,
}: {
  member: TeamMember;
  index: number;
  isVisible: boolean;
}) {
  const memberSlug = member.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link
      href={`/team/${memberSlug}`}
      className={cn(
        "group block rounded-lg outline-none transition-all duration-500 focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      )}
      style={{ transitionDelay: isVisible ? `${index * REVEAL_STAGGER_MS}ms` : "0ms" }}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border bg-muted transition-colors group-hover:border-gold-500/40">
        {member.image?.[0] ? (
          <SafeImage
            src={member.image[0]}
            alt={member.name}
            fill
            sizes="(max-width: 1024px) 50vw, 25vw"
            className="object-cover object-top grayscale-[20%] transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
            fallbackClassName="absolute inset-0"
          />
        ) : (
          <div className="absolute inset-0 bg-muted dark:bg-navy-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
      </div>
      <div className="pt-4 text-center">
        <h3 className="font-serif text-base sm:text-lg font-semibold text-foreground transition-colors group-hover:text-gold-600">
          {member.name}
        </h3>
        <span className="mt-1 inline-flex text-sm font-medium text-muted-foreground transition-colors group-hover:text-gold-600">
          View Profile →
        </span>
      </div>
    </Link>
  );
}

export function ConsultingPartners({ members }: { members: TeamMember[] }) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    rootMargin: "0px 0px -50px 0px",
  });

  if (members.length === 0) return null;
  const cols = pickBalancedColumns(members.length, [4, 3]);

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

      <div
        className={cn(
          "grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto",
          LG_GRID_COLS[cols],
        )}
      >
        {members.map((member, index) => (
          <PartnerCard
            key={member.name}
            member={member}
            index={index}
            isVisible={isVisible}
          />
        ))}
      </div>
    </div>
  );
}
