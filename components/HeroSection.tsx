'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import RequestDemoForm from './RequestDemoForm';

export default function HeroSection() {
  const t = useTranslations('hero');
  const [mounted, setMounted] = useState(false);
  const [showDemoForm, setShowDemoForm] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Scan line effect */}
      <div className="scan-line absolute inset-0 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight tracking-tight">
            <span className="text-white">{t('title')}</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-tactical-textDim max-w-3xl mb-12 leading-relaxed">
            {t('subtitle')}
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12 max-w-2xl">
            <div className="tactical-border p-6 bg-white/5 backdrop-blur-sm">
              <div className="font-mono text-4xl font-bold text-white mb-2">{t('stats.planning.value')}</div>
              <div className="text-xs text-tactical-textDim uppercase tracking-wide">{t('stats.planning.label')}</div>
            </div>
            <div className="tactical-border p-6 bg-white/5 backdrop-blur-sm">
              <div className="font-mono text-4xl font-bold text-white mb-2">{t('stats.edge.value')}</div>
              <div className="text-xs text-tactical-textDim uppercase tracking-wide">{t('stats.edge.label')}</div>
            </div>
            <div className="tactical-border p-6 bg-white/5 backdrop-blur-sm col-span-2 md:col-span-1">
              <div className="font-mono text-4xl font-bold text-white mb-2">{t('stats.tak.value')}</div>
              <div className="text-xs text-tactical-textDim uppercase tracking-wide">{t('stats.tak.label')}</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setShowDemoForm(true)}
              className="px-8 py-4 bg-white text-black hover:bg-tactical-textDim transition-all duration-300 text-sm font-medium"
            >
              {t('cta.demo')}
            </button>
            <a
              href="#nerva"
              className="px-8 py-4 bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300 text-sm font-medium text-center"
            >
              {t('cta.learn')}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-tactical-bg to-transparent pointer-events-none"></div>

      {/* Demo Form Modal */}
      {showDemoForm && (
        <RequestDemoForm
          onClose={() => setShowDemoForm(false)}
          formType="demo"
          formId={process.env.NEXT_PUBLIC_HUBSPOT_DEMO_FORM_ID}
        />
      )}
    </section>
  );
}
