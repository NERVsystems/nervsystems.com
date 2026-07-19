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

      {/* Slim header only — the embedded tool carries its own title/intro,
          so we do not repeat it here (avoids a duplicated headline). */}
      <section className="relative pt-28 pb-4 bg-tactical-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/solutions/nerv-centre`}
            className="font-mono text-xs text-tactical-textDim hover:text-tactical-accent transition-colors"
          >
            {t('calculatorPage.back')}
          </Link>
          {/* h1 for SEO/accessibility; the visible headline lives in the tool below */}
          <h1 className="sr-only">{t('calculator.title')}</h1>
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
