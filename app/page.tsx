import { Hero } from "@/components/home/hero";
import { TickerBar } from "@/components/home/ticker-bar";
import { EconomicDashboard } from "@/components/home/economic-dashboard";
import { EconomicDashboardProvider } from "@/components/home/economic-dashboard-provider";
import { FirmNews } from "@/components/home/firm-news";
import { ServicesOverview } from "@/components/home/services-overview";
import { ClientMarquee } from "@/components/home/client-marquee";
import { MarqueeFocusProvider } from "@/components/home/marquee-focus-provider";
import { HomeStatsStrip } from "@/components/home/home-stats-strip";

export default function HomePage() {
  return (
    <EconomicDashboardProvider>
      <MarqueeFocusProvider>
        <TickerBar />
        <main id="main-content">
          <Hero />
          <ClientMarquee />
          <EconomicDashboard />
          <ServicesOverview />
          <HomeStatsStrip />
          <FirmNews />
        </main>
      </MarqueeFocusProvider>
    </EconomicDashboardProvider>
  );
}
