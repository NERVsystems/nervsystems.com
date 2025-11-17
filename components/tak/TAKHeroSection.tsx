'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import RequestDemoForm from '@/components/RequestDemoForm';

export default function TAKHeroSection() {
  const t = useTranslations('takSolutions.hero');
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=80"
          alt="Command Center Operations"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-tactical-bg/85"></div>
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-bg opacity-40"></div>
      </div>

      {/* Scan line effect */}
      <div className="scan-line absolute inset-0 pointer-events-none z-5"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Eyebrow */}
          <div className="font-mono text-sm text-tactical-accent mb-4 uppercase tracking-wider">
            {t('eyebrow')}
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
            <span className="text-white">{t('title')}</span>
            <br />
            <span className="text-white">{t('titleLine2')}</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-tactical-textDim max-w-4xl mx-auto mb-8 leading-relaxed">
            {t('subtitle')}
          </p>

          {/* Key Features */}
          <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm">
            <div className="px-4 py-2 bg-white/5 border border-white/20 rounded">
              <span className="text-tactical-accent font-mono">✓</span> {t('features.hosting')}
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/20 rounded">
              <span className="text-tactical-accent font-mono">✓</span> {t('features.aiEnhanced')}
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/20 rounded">
              <span className="text-tactical-accent font-mono">✓</span> {t('features.deployment')}
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/20 rounded">
              <span className="text-tactical-accent font-mono">✓</span> {t('features.training')}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowQuoteForm(true)}
              className="px-8 py-4 bg-white text-black hover:bg-tactical-textDim transition-all duration-300 text-sm font-medium"
            >
              {t('cta.quote')}
            </button>
            <a
              href="#services"
              className="px-8 py-4 bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300 text-sm font-medium text-center"
            >
              {t('cta.services')}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-tactical-bg to-transparent pointer-events-none"></div>

      {/* Quote Form Modal */}
      {showQuoteForm && (
        <RequestDemoForm
          onClose={() => setShowQuoteForm(false)}
          formType="quote"
          formId={process.env.NEXT_PUBLIC_HUBSPOT_TAK_FORM_ID}
        />
      )}
    </section>
  );
}
