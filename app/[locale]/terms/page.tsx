import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'terms' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default function TermsOfService() {
  const t = useTranslations('terms');

  return (
    <main className="min-h-screen bg-tactical-bg pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="text-tactical-accent font-mono text-sm mb-4">
            {t('eyebrow')}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('title')}
          </h1>
          <p className="text-tactical-textDim">
            {t('effectiveDate')}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-tactical-textDim">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t('introduction.title')}</h2>
            <p className="mb-4">{t('introduction.p1')}</p>
            <p className="mb-4">{t('introduction.p2')}</p>
            <p className="italic text-tactical-accent">{t('introduction.note')}</p>
          </section>

          {/* Acceptance of Terms */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t('acceptance.title')}</h2>
            <p>{t('acceptance.description')}</p>
          </section>

          {/* Use of Website */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t('useOfWebsite.title')}</h2>
            <p className="mb-4">{t('useOfWebsite.intro')}</p>
            <ul className="list-none space-y-2 ml-4">
              <li className="font-mono">▸ {t('useOfWebsite.items.lawful')}</li>
              <li className="font-mono">▸ {t('useOfWebsite.items.accurate')}</li>
              <li className="font-mono">▸ {t('useOfWebsite.items.noHarm')}</li>
              <li className="font-mono">▸ {t('useOfWebsite.items.noUnauthorized')}</li>
              <li className="font-mono">▸ {t('useOfWebsite.items.noViolation')}</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t('intellectualProperty.title')}</h2>
            <p className="mb-4">{t('intellectualProperty.ownership')}</p>
            <p>{t('intellectualProperty.restrictions')}</p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t('thirdPartyLinks.title')}</h2>
            <p>{t('thirdPartyLinks.description')}</p>
          </section>

          {/* Disclaimer of Warranties */}
          <section className="bg-tactical-surface tactical-border p-6">
            <h2 className="text-2xl font-bold text-white mb-4">{t('disclaimer.title')}</h2>
            <p className="mb-4 uppercase font-mono text-tactical-accent">
              {t('disclaimer.statement')}
            </p>
            <p>{t('disclaimer.details')}</p>
          </section>

          {/* Limitation of Liability */}
          <section className="bg-tactical-surface tactical-border p-6">
            <h2 className="text-2xl font-bold text-white mb-4">{t('liability.title')}</h2>
            <p className="mb-4 uppercase font-mono text-tactical-accent">
              {t('liability.statement')}
            </p>
            <p>{t('liability.details')}</p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t('indemnification.title')}</h2>
            <p>{t('indemnification.description')}</p>
          </section>

          {/* Export Control and Compliance */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t('exportControl.title')}</h2>
            <p className="mb-4">{t('exportControl.description')}</p>
            <p className="italic text-tactical-accent">{t('exportControl.warning')}</p>
          </section>

          {/* Governing Law and Jurisdiction */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t('governingLaw.title')}</h2>
            <p className="mb-4">{t('governingLaw.description')}</p>
            <p className="italic text-tactical-textDim/70">{t('governingLaw.future')}</p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t('changes.title')}</h2>
            <p>{t('changes.description')}</p>
          </section>

          {/* Severability */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t('severability.title')}</h2>
            <p>{t('severability.description')}</p>
          </section>

          {/* Entire Agreement */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t('entireAgreement.title')}</h2>
            <p>{t('entireAgreement.description')}</p>
          </section>

          {/* Contact Information */}
          <section className="bg-tactical-surface tactical-border p-6">
            <h2 className="text-2xl font-bold text-white mb-4">{t('contact.title')}</h2>
            <p className="mb-4">{t('contact.description')}</p>
            <div className="space-y-2">
              <p className="font-mono text-tactical-accent">
                {t('contact.company')}
              </p>
              <p className="font-mono">
                {t('contact.email')}
              </p>
            </div>
          </section>
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-white text-black hover:bg-tactical-textDim transition-all duration-300 text-sm font-medium"
          >
            {t('backToHome')}
          </Link>
        </div>
      </div>
    </main>
  );
}
