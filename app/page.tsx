import TacticalNav from '@/components/TacticalNav';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import TAKSection from '@/components/TAKSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-tactical-bg">
      <TacticalNav />
      <HeroSection />
      <FeaturesSection />
      <TAKSection />
      <Footer />
    </main>
  );
}
