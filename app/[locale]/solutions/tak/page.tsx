import type { Metadata } from "next";
import TacticalNav from '@/components/TacticalNav';
import TAKHeroSection from '@/components/tak/TAKHeroSection';
import TAKServicesSection from '@/components/tak/TAKServicesSection';
import TAKIntegrationSection from '@/components/tak/TAKIntegrationSection';
import TAKCompetitiveSection from '@/components/tak/TAKCompetitiveSection';
import TAKResourcesSection from '@/components/tak/TAKResourcesSection';
import TAKFAQSection from '@/components/tak/TAKFAQSection';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "TAK Solutions & ATAK Hosting | NERV Systems",
  description: "Complete TAK/ATAK deployment, managed hosting, consulting and training services across North America and Asia Pacific. AI-enhanced TAK server hosting from $495/month. Expert TAK deployment consulting, system administration, and operator training for military, law enforcement, emergency response, and commercial operations.",
  keywords: [
    "TAK solutions",
    "ATAK platform",
    "TAK server hosting",
    "ATAK hosting",
    "TAK deployment",
    "ATAK deployment",
    "TAK consulting",
    "ATAK consulting",
    "TAK training",
    "ATAK training",
    "TAK server North America",
    "TAK server Asia Pacific",
    "ATAK solutions USA",
    "ATAK solutions Singapore",
    "TAK system administration",
    "TAK plugin development",
    "Team Awareness Kit",
    "Android Team Awareness Kit",
    "TAK integration",
    "ATAK integration",
    "managed TAK hosting",
    "TAK server management",
    "TAK ops",
    "TAKOps services",
    "AI-powered TAK",
    "intelligent TAK platform",
    "commercial TAK solutions",
    "civilian TAK deployment",
    "TAK fleet management",
    "TAK asset tracking",
    "private security TAK",
    "critical infrastructure TAK",
    "corporate TAK deployment",
    "commercial ATAK applications",
    "TAK private sector",
    "enterprise TAK solutions"
  ],
  openGraph: {
    title: "TAK Solutions & ATAK Hosting | NERV Systems",
    description: "Complete TAK/ATAK deployment, managed hosting, consulting and training across North America and Asia Pacific. AI-enhanced solutions from $495/month.",
    url: "https://www.nervsystems.com/solutions/tak",
    siteName: "NERV Systems",
    type: "website",
  },
};

export default function TAKSolutionsPage() {
  return (
    <main className="min-h-screen bg-tactical-bg">
      <TacticalNav />
      <TAKHeroSection />
      <TAKServicesSection />
      <TAKIntegrationSection />
      <TAKCompetitiveSection />
      <TAKResourcesSection />
      <TAKFAQSection />
      <Footer />
    </main>
  );
}
