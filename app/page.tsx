import { Hero } from "@/components/home/hero";
import { TickerBar } from "@/components/home/ticker-bar";
import { EconomicDashboard } from "@/components/home/economic-dashboard";
import { CoreValues } from "@/components/home/core-values";
import { FirmNews } from "@/components/home/firm-news";
import { ServicesOverview } from "@/components/home/services-overview";
import { ClientMarquee } from "@/components/home/client-marquee";

export default function HomePage() {
  return (
    <>
      <TickerBar />
      <main id="main-content">
        <Hero />
        <ClientMarquee />
        <EconomicDashboard />
        <ServicesOverview />
        <CoreValues />
        <FirmNews />
      </main>
    </>
  );
}
