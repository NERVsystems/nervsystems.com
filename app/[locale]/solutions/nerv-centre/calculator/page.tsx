import type { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import TacticalNav from '@/components/TacticalNav';
import Footer from '@/components/Footer';
import CalculatorFrame from '@/components/nerv-centre/CalculatorFrame';
import { locales, defaultLocale } from '@/i18n/config';

const baseUrl = 'https://www.nervsystems.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nervCentre.calculatorPage' });

  const path = '/solutions/nerv-centre/calculator';
  const canonicalUrl = locale === defaultLocale
    ? `${baseUrl}${path}`
    : `${baseUrl}/${locale}${path}`;

  const languages: Record<string, string> = {};
  locales.forEach((loc) => {
    languages[loc] = loc === defaultLocale ? `${baseUrl}${path}` : `${baseUrl}/${loc}${path}`;
  });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: canonicalUrl, languages },
    keywords: [
      "TCO calculator",
      "total cost of ownership calculator",
      "on-prem vs cloud cost",
      "cloud repatriation calculator",
      "AI infrastructure cost",
      "GPU cost calculator",
      "data centre cost comparison",
      "hardware as a service cost",
      "HaaS calculator",
      "sovereign compute cost",
    ],
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: canonicalUrl,
      siteName: "NERV Systems",
      type: "website",
    },
  };
}

export default async function NervCentreCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nervCentre' });

  return (
    <main className="min-h-screen bg-tactical-bg">
      <TacticalNav />

      {/* Intro header */}
      <section className="relative pt-32 pb-8 bg-tactical-bg overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/solutions/nerv-centre`}
            className="font-mono text-xs text-tactical-textDim hover:text-tactical-accent transition-colors"
          >
            {t('calculatorPage.back')}
          </Link>
          <div className="font-mono text-sm text-tactical-accent mt-6 mb-4 uppercase tracking-wider">
            {t('calculator.eyebrow')}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-5">
            {t('calculator.title')}
          </h1>
          <p className="text-tactical-textDim text-lg leading-relaxed max-w-3xl">
            {t('calculator.description')}
          </p>
        </div>
      </section>

      {/* Embedded calculator (dark theme to match the site) */}
      <section className="relative pb-12 bg-tactical-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-white/10 bg-tactical-bg">
            <CalculatorFrame src="/tools/nerv-centre-tco.html?theme=dark" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
