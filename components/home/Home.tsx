import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import StatisticsSection from "@/components/home/StatisticsSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import WorkingProcess from "@/components/home/WorkingProcess";
import PortfolioSection from "@/components/home/PortfolioSection";
import PricingSection from "@/components/home/PricingSection";

export default function HomeContents() {
  return (
    <>
      <Hero />
      <AboutSection />
      <StatisticsSection />
      <ServicesSection />
      <WhyChooseUs />
      <WorkingProcess />
      <PortfolioSection />
      <PricingSection />
    </>
  );
}