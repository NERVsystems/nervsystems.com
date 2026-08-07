import type { Metadata } from "next";
import TacticalNav from '@/components/TacticalNav';
import AboutIntroSection from '@/components/about/AboutIntroSection';
import AboutBuildSection from '@/components/about/AboutBuildSection';
import AboutPrinciplesSection from '@/components/about/AboutPrinciplesSection';
import AboutPresenceSection from '@/components/about/AboutPresenceSection';
import AboutStructuredData from '@/components/about/AboutStructuredData';
import SDGSection from '@/components/SDGSection';
import Footer from '@/components/Footer';
import { locales, defaultLocale } from '@/i18n/config';

const baseUrl = 'https://www.nervsystems.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const path = '/about';
  const canonicalUrl = locale === defaultLocale
    ? `${baseUrl}${path}`
    : `${baseUrl}/${locale}${path}`;

  const languages: Record<string, string> = {};
  locales.forEach((loc) => {
    languages[loc] = loc === defaultLocale ? `${baseUrl}${path}` : `${baseUrl}/${loc}${path}`;
  });

  return {
    title: "About | NERV Systems",
    description: "NERV Systems builds AI-augmented TAK/ATAK technology for defence and life-saving missions—from NERVA planning support to InferNode's verifiable AI. Learn about our mission and alignment with the UN Sustainable Development Goals.",
    keywords: [
      "NERV Systems",
      "about NERV Systems",
      "defence technology company",
      "AI mission planning",
      "UN Sustainable Development Goals",
      "SDG aligned technology",
      "TAK AI augmentation",
      "humanitarian technology",
      "disaster response AI",
      "search and rescue technology",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: "About | NERV Systems",
      description: "Advanced AI for missions that matter. NERV Systems' mission and alignment with the UN Sustainable Development Goals.",
      url: canonicalUrl,
      siteName: "NERV Systems",
      type: "website",
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-tactical-bg">
      <AboutStructuredData locale={locale} />
      <TacticalNav />
      <AboutIntroSection />
      <AboutBuildSection />
      <AboutPrinciplesSection />
      <AboutPresenceSection />
      <SDGSection />
      <Footer />
    </main>
  );
}
