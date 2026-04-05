import { Hero } from "@/components/home/hero";
import { TickerBar } from "@/components/home/ticker-bar";
import { EconomicDashboard } from "@/components/home/economic-dashboard";
import { EconomicDashboardProvider } from "@/components/home/economic-dashboard-provider";
import { CoreValues } from "@/components/home/core-values";
import { FirmNews } from "@/components/home/firm-news";
import { ServicesOverview } from "@/components/home/services-overview";
import { ClientMarquee } from "@/components/home/client-marquee";
import { HomeStatsStrip } from "@/components/home/home-stats-strip";

export default function HomePage() {
  return (
    <EconomicDashboardProvider>
      <main id="main-content">
        <Hero />
        <TickerBar />
        <ServicesOverview />
        <HomeStatsStrip />
        <EconomicDashboard />
        <CoreValues />
        <ClientMarquee />
        <FirmNews />
      </main>
    </EconomicDashboardProvider>
  );
}
