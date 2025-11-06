import TacticalNav from '@/components/TacticalNav';
import HeroSection from '@/components/HeroSection';
import NERVASection from '@/components/NERVASection';
import FeaturesSection from '@/components/FeaturesSection';
import TAKSection from '@/components/TAKSection';
import TAKSolutionsSection from '@/components/TAKSolutionsSection';
import PartnersSection from '@/components/PartnersSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-tactical-bg">
      <TacticalNav />
      <HeroSection />
      <NERVASection />
      <FeaturesSection />
      <TAKSection />
      <TAKSolutionsSection />
      <PartnersSection />
      <Footer />
    </main>
  );
}
