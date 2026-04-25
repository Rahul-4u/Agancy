import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";
import Hero from "@/components/home/Hero";
import PortfolioSection from "@/components/home/PortfolioSection";
import PricingSection from "@/components/home/PricingSection";
import ServicesSection from "@/components/home/ServicesSection";
import StatisticsSection from "@/components/home/StatisticsSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import WorkingProcess from "@/components/home/WorkingProcess";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <Hero />
      <AboutSection/>
      <StatisticsSection/>
      <ServicesSection/>
      <WhyChooseUs/>
      <WorkingProcess/>
      <PortfolioSection/>
      <PricingSection/>
      <ContactSection/>
    
      {/* এখানে পরে সার্ভিস এবং অন্যান্য সেকশন আসবে */}
    </main>
  );
}