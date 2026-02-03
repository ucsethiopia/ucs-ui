import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { EconomicDashboard } from "@/components/home/economic-dashboard";
import { CoreValues } from "@/components/home/core-values";
import { NewsCarousel } from "@/components/home/news-carousel";
import { ServicesOverview } from "@/components/home/services-overview";
import { ClientMarquee } from "@/components/home/client-marquee";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <EconomicDashboard />
        <CoreValues />
        <NewsCarousel />
        <ServicesOverview />
        <ClientMarquee />
      </main>
      <Footer />
    </>
  );
}
