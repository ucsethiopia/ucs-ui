import { Metadata } from "next";
import { ServicePillars, ServicesCTA } from "@/components/services";
import { PageHero } from "@/components/shared/page-hero";
import { servicePillars } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Our Services | UCS Ethiopia",
  description:
    "Explore our comprehensive service offerings across Training, Advisory, Research & Publication, and Communication & Promotion.",
};

export default function ServicesPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="What We Do"
        title="Our Services"
        description="Comprehensive solutions to help your organization achieve its strategic objectives and build lasting capabilities."
        backgroundImage="/images/hero/services-hero-background.png"
        backgroundPositionClass="bg-top"
        contentWrapperClassName="ml-4 lg:mr-30"
        condensed
      />
      <ServicePillars services={servicePillars} />
      <ServicesCTA />
    </main>
  );
}
