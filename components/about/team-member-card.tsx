"use client";

import { SafeImage } from "@/components/shared/safe-image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { type TeamMember } from "@/hooks/use-team";

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
  isVisible: boolean;
  isOwner?: boolean;
}

export function TeamMemberCard({
  member,
  index,
  isVisible,
  isOwner,
}: TeamMemberCardProps) {
  const memberSlug = member.name.toLowerCase().replace(/\s+/g, "-");

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
            <div className="relative lg:col-span-2 aspect-[4/3] lg:aspect-auto overflow-hidden bg-muted">
              {member.image?.[0] ? (
                <SafeImage
                  src={member.image[0]}
                  alt={member.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  fallbackClassName="absolute inset-0"
                />
              ) : (
                <div className="absolute inset-0 bg-muted dark:bg-navy-900" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-navy-950/10" />
            </div>

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
        <div className="relative aspect-square overflow-hidden bg-muted">
          {member.image?.[0] ? (
            <SafeImage
              src={member.image[0]}
              alt={member.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              fallbackClassName="absolute inset-0"
            />
          ) : (
            <div className="absolute inset-0 bg-muted dark:bg-navy-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
        </div>

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
