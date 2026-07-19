'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import RequestDemoForm from '@/components/RequestDemoForm';

export default function NervCentreClosing() {
  const t = useTranslations('nervCentre.closing');
  const locale = useLocale();
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative py-24 bg-tactical-bg overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20"></div>
      <div className="scan-line absolute inset-0 pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="font-mono text-sm text-tactical-accent mb-4 uppercase tracking-wider">
          {t('eyebrow')}
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          {t('title')}
        </h2>
        <p className="text-tactical-textDim text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          {t('description')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setShowQuoteForm(true)}
            className="px-8 py-4 bg-white text-black hover:bg-tactical-accent transition-all duration-300 text-sm font-medium"
          >
            {t('quote')}
          </button>
          <Link
            href={`/${locale}/#contact`}
            className="px-8 py-4 bg-transparent border border-white/30 text-white hover:border-tactical-accent hover:bg-white/10 transition-all duration-300 text-sm font-medium text-center"
          >
            {t('contact')}
          </Link>
        </div>
      </div>

      {mounted && showQuoteForm && createPortal(
        <RequestDemoForm
          onClose={() => setShowQuoteForm(false)}
          formType="nervCentre"
          formId={process.env.NEXT_PUBLIC_HUBSPOT_DEMO_FORM_ID}
          defaultInterest="NERV Centre (On-Prem Compute)"
        />,
        document.body
      )}
    </section>
  );
}
