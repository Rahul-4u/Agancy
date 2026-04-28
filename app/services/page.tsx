import ServicesSection from '@/components/home/ServicesSection';
import ServiceHero from '@/components/services/ServiceHero';
import Navbar from '@/components/shared/Navbar';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
/**
 * Services Page
 * Displays the hero section and the list of available services.
 * Optimized to handle session passing to the Navbar to prevent build errors.
 */
export default async function ServicesPage() {
  // 1. Fetch session on the server side to satisfy Navbar requirements
  const session = await getServerSession(authOptions);

  return (
    <main className="min-h-screen bg-white">
      {/* Passing the session prop to Navbar. 
          This fixes the 'Property session is missing' error 
          seen in your earlier build logs.
      */}
      <Navbar session={session} />
      
      {/* Hero section specifically styled for the Services view */}
      <ServiceHero />
      
      {/* Grid or list showing the actual service offerings */}
      <ServicesSection />
    </main>
  );
}