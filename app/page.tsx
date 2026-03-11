import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { TickerBar } from "@/components/home/ticker-bar";
import { EconomicDashboard } from "@/components/home/economic-dashboard";
import { MarketAnalytics } from "@/components/home/market-analytics";
import { CoreValues } from "@/components/home/core-values";
import { FirmNews } from "@/components/home/firm-news";
import { EconomicNews } from "@/components/home/economic-news";
import { ServicesOverview } from "@/components/home/services-overview";
import { ClientMarquee } from "@/components/home/client-marquee";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <TickerBar />
      <main>
        <Hero />
        <ClientMarquee />
        <EconomicDashboard />
        <MarketAnalytics />
        <ServicesOverview />
        <CoreValues />
        <FirmNews />
        <EconomicNews />
      </main>
      <Footer />
    </>
  );
}
