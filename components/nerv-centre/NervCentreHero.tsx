'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import RequestDemoForm from '@/components/RequestDemoForm';

export default function NervCentreHero() {
  const t = useTranslations('nervCentre.hero');
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = ['sealed', 'efficient', 'offline', 'aiReady'] as const;

  return (
    <section className="relative overflow-hidden pt-32 pb-20 bg-tactical-bg">
      {/* Grid + scan background */}
      <div className="absolute inset-0 grid-bg opacity-30"></div>
      <div className="scan-line absolute inset-0 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: copy */}
          <div>
            <div className="font-mono text-sm text-tactical-accent mb-4 uppercase tracking-wider">
              {t('eyebrow')}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight text-white">
              {t('title')}
              <br />
              <span className="text-tactical-accent">{t('titleLine2')}</span>
            </h1>
            <p className="text-lg md:text-xl text-tactical-textDim max-w-xl mb-8 leading-relaxed">
              {t('subtitle')}
            </p>

            {/* Feature chips */}
            <div className="flex flex-wrap gap-3 mb-10 text-sm">
              {features.map((key) => (
                <div key={key} className="px-4 py-2 bg-white/5 border border-white/20 rounded">
                  <span className="text-tactical-accent font-mono mr-1">▸</span>
                  {t(`features.${key}`)}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowQuoteForm(true)}
                className="px-8 py-4 bg-white text-black hover:bg-tactical-accent transition-all duration-300 text-sm font-medium"
              >
                {t('cta.quote')}
              </button>
              <a
                href="#calculator"
                className="px-8 py-4 bg-transparent border border-white/30 text-white hover:border-tactical-accent hover:bg-white/10 transition-all duration-300 text-sm font-medium text-center"
              >
                {t('cta.calculator')}
              </a>
            </div>
          </div>

          {/* Right: product render */}
          <div className="relative">
            <div className="absolute -inset-4 bg-tactical-accent/5 blur-3xl rounded-full"></div>
            <img
              src="/img/nerv-centre/outdoor-camo.png"
              alt="NERV Centre Outdoor — sealed, IP-rated micro data centre in MultiCam finish"
              className="relative w-full max-w-lg mx-auto h-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-tactical-bg to-transparent pointer-events-none"></div>

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
