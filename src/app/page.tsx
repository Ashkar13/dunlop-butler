import { SiteHeader } from "@/components/header/SiteHeader";
import { AnnouncementStrip } from "@/components/sections/AnnouncementStrip";
import { Hero } from "@/components/sections/Hero";
import { CategoryTicker } from "@/components/sections/CategoryTicker";
import { StatsBand } from "@/components/sections/StatsBand";
import { CategoryDirectory } from "@/components/sections/CategoryDirectory";
import { CategoryShowcase } from "@/components/sections/CategoryShowcase";
import { Pricing } from "@/components/sections/Pricing";
import { BookPromo } from "@/components/sections/BookPromo";
import { SiteFooter } from "@/components/sections/SiteFooter";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <AnnouncementStrip />
      <main id="main">
        <Hero />
        <CategoryTicker />
        <StatsBand />
        <CategoryDirectory />
        <CategoryShowcase />
        <Pricing />
        <BookPromo />
      </main>
      <SiteFooter />
    </>
  );
}
