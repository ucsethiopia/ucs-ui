import { Metadata } from "next";
import {
  ServicesHero,
  ServicePillars,
  ServicesCTA,
} from "@/components/services";
import { servicePillars } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Our Services | UCS Ethiopia",
  description:
    "Explore our comprehensive service offerings across Training, Advisory, Research & Publication, and Communication & Promotion.",
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero
        eyebrow="What We Do"
        title="Our Services"
        description="Comprehensive solutions to help your organization achieve its strategic objectives and build lasting capabilities."
      />
      <ServicePillars services={servicePillars} />
      <ServicesCTA />
    </main>
  );
}
