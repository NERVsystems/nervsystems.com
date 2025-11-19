import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default function PrivacyPolicy() {
  const t = useTranslations('privacy');

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

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t('informationWeCollect.title')}</h2>
            <p className="mb-4">{t('informationWeCollect.intro')}</p>
            <ul className="list-none space-y-2 ml-4">
              <li className="font-mono">▸ {t('informationWeCollect.items.name')}</li>
              <li className="font-mono">▸ {t('informationWeCollect.items.email')}</li>
              <li className="font-mono">▸ {t('informationWeCollect.items.organization')}</li>
              <li className="font-mono">▸ {t('informationWeCollect.items.phone')}</li>
              <li className="font-mono">▸ {t('informationWeCollect.items.jobTitle')}</li>
              <li className="font-mono">▸ {t('informationWeCollect.items.message')}</li>
            </ul>
            <p className="mt-4">{t('informationWeCollect.analytics')}</p>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t('howWeUse.title')}</h2>
            <ul className="list-none space-y-2 ml-4">
              <li className="font-mono">▸ {t('howWeUse.items.respond')}</li>
              <li className="font-mono">▸ {t('howWeUse.items.marketing')}</li>
              <li className="font-mono">▸ {t('howWeUse.items.improve')}</li>
              <li className="font-mono">▸ {t('howWeUse.items.analytics')}</li>
            </ul>
            <p className="mt-4 italic">{t('howWeUse.unsubscribe')}</p>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t('thirdParty.title')}</h2>
            <p className="mb-4">{t('thirdParty.intro')}</p>
            <ul className="list-none space-y-2 ml-4">
              <li className="font-mono">▸ {t('thirdParty.items.hubspot')}</li>
              <li className="font-mono">▸ {t('thirdParty.items.analytics')}</li>
            </ul>
            <p className="mt-4">{t('thirdParty.future')}</p>
          </section>

          {/* Data Storage and Security */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t('dataSecurity.title')}</h2>
            <p className="mb-4">{t('dataSecurity.storage')}</p>
            <p className="mb-4">{t('dataSecurity.protection')}</p>
            <p className="italic text-tactical-textDim/70">{t('dataSecurity.disclaimer')}</p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t('yourRights.title')}</h2>
            <p className="mb-4">{t('yourRights.intro')}</p>
            <ul className="list-none space-y-2 ml-4">
              <li className="font-mono">▸ {t('yourRights.items.access')}</li>
              <li className="font-mono">▸ {t('yourRights.items.correction')}</li>
              <li className="font-mono">▸ {t('yourRights.items.deletion')}</li>
              <li className="font-mono">▸ {t('yourRights.items.optOut')}</li>
            </ul>
            <p className="mt-4">{t('yourRights.contact')}</p>
          </section>

          {/* Cookies and Tracking */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t('cookies.title')}</h2>
            <p className="mb-4">{t('cookies.description')}</p>
            <p>{t('cookies.control')}</p>
          </section>

          {/* International Data Transfers */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t('international.title')}</h2>
            <p className="mb-4">{t('international.description')}</p>
            <p>{t('international.consent')}</p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t('children.title')}</h2>
            <p>{t('children.description')}</p>
          </section>

          {/* Changes to This Policy */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">{t('changes.title')}</h2>
            <p>{t('changes.description')}</p>
          </section>

          {/* Contact Us */}
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
