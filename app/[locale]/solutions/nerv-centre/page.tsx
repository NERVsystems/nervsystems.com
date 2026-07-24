import type { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import TacticalNav from '@/components/TacticalNav';
import NervCentreHero from '@/components/nerv-centre/NervCentreHero';
import NervCentreValue from '@/components/nerv-centre/NervCentreValue';
import NervCentreProducts from '@/components/nerv-centre/NervCentreProducts';
import NervCentreAnatomy from '@/components/nerv-centre/NervCentreAnatomy';
import NervCentreSense from '@/components/nerv-centre/NervCentreSense';
import NervCentreHaaS from '@/components/nerv-centre/NervCentreHaaS';
import NervCentreCalculator from '@/components/nerv-centre/NervCentreCalculator';
import NervCentreClosing from '@/components/nerv-centre/NervCentreClosing';
import Footer from '@/components/Footer';
import { locales, defaultLocale } from '@/i18n/config';

const baseUrl = 'https://www.nervsystems.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nervCentre.meta' });

  const path = '/solutions/nerv-centre';
  const canonicalUrl = locale === defaultLocale
    ? `${baseUrl}${path}`
    : `${baseUrl}/${locale}${path}`;

  const languages: Record<string, string> = {};
  locales.forEach((loc) => {
    languages[loc] = loc === defaultLocale ? `${baseUrl}${path}` : `${baseUrl}/${loc}${path}`;
  });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    keywords: [
      "on-premise AI compute",
      "private AI infrastructure",
      "sovereign AI",
      "sovereign compute",
      "data sovereignty",
      "private AI",
      "secure AI infrastructure",
      "self-hosted AI",
      "on-prem LLM",
      "private LLM",
      "AI agents on-prem",
      "resilient AI infrastructure",
      "high uptime compute",
      "edge data centre",
      "micro data centre",
      "sealed data centre",
      "offline AI compute",
      "air-gapped AI",
      "on-prem GPU server",
      "private cloud alternative",
      "cloud repatriation",
      "IP65 data centre",
      "ruggedised compute",
      "tactical edge compute",
      "hardware as a service",
      "HaaS",
      "NERV Centre",
      "NERVA on-prem",
      "InferNode hardware",
      "GPU in a box",
      "defense AI infrastructure",
      "TCO calculator",
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: canonicalUrl,
      siteName: "NERV Systems",
      type: "website",
      images: [
        {
          url: "/img/nerv-centre/outdoor-camo.png",
          width: 1200,
          height: 630,
          alt: "NERV Centre — private on-prem AI compute",
        },
      ],
    },
  };
}

export default function NervCentrePage() {
  return (
    <main className="min-h-screen bg-tactical-bg">
      <TacticalNav />
      <NervCentreHero />
      <NervCentreValue />
      <NervCentreProducts />
      <NervCentreAnatomy />
      <NervCentreSense />
      <NervCentreHaaS />
      <NervCentreCalculator />
      <NervCentreClosing />
      <Footer />
    </main>
  );
}
