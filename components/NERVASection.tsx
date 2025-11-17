'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import RequestDemoForm from './RequestDemoForm';

export default function NERVASection() {
  const t = useTranslations('nerva');
  const [showDemoForm, setShowDemoForm] = useState(false);

  const capabilityKeys = ['uas', 'medevac', 'threat', 'sar', 'alert', 'airspace'] as const;

  const capabilities = capabilityKeys.map(key => ({
    icon: t(`capabilities.${key}.icon`),
    title: t(`capabilities.${key}.title`),
    command: t(`capabilities.${key}.command`),
    description: t(`capabilities.${key}.description`),
    features: t.raw(`capabilities.${key}.features`) as string[],
    videoPlaceholder: true
  }));

  return (
    <section id="nerva" className="relative py-24 bg-tactical-surface border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center mb-4 gap-4">
            {/* NERVA Face Logo with Hover Effect */}
            <div className="relative group cursor-pointer">
              <img
                src="/img/NERVA WHT Calm.png"
                alt="NERVA Calm"
                className="h-20 md:h-28 w-auto transition-opacity duration-300 group-hover:opacity-0"
              />
              <img
                src="/img/NERVA WHT Fierce.png"
                alt="NERVA Fierce"
                className="h-20 md:h-28 w-auto absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              />
            </div>

            {/* NERVA Logotype */}
            <img
              src="/img/NERVA WHT Logotype.png"
              alt="NERVA"
              className="h-16 md:h-24 w-auto"
            />
          </div>

          {/* Tagline */}
          <p className="text-tactical-accent font-mono text-sm md:text-base mb-6 tracking-wide">
            {t('tagline')}
          </p>

          <p className="text-tactical-textDim text-xl max-w-3xl mx-auto mb-4">
            {t('subtitle')}
          </p>
          <p className="text-tactical-text text-lg max-w-3xl mx-auto">
            {t('description', { decisionAdvantage: t('decisionAdvantage') })}
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="group relative tactical-border p-6 bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              {/* Icon */}
              <div className="font-mono text-sm text-tactical-accent mb-4 px-2 py-1 bg-black/30 rounded border border-tactical-accent/30 inline-block">
                {capability.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3">
                {capability.title}
              </h3>

              {/* Command */}
              <div className="font-mono text-sm text-tactical-accent mb-4 bg-black/30 p-2 rounded border border-tactical-accent/30">
                {capability.command}
              </div>

              {/* Description */}
              <p className="text-tactical-textDim text-sm leading-relaxed mb-4">
                {capability.description}
              </p>

              {/* Video Placeholder */}
              {capability.videoPlaceholder && (
                <div className="mb-4 bg-black/50 border border-white/10 rounded aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-tactical-textDim text-sm mb-2">{t('videoPlaceholder.title')}</div>
                    <div className="text-xs text-tactical-textDim/50">{t('videoPlaceholder.comingSoon')}</div>
                  </div>
                </div>
              )}

              {/* Features List */}
              <div className="space-y-2">
                {capability.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <div className="mt-1.5">
                      <div className="w-1 h-1 bg-tactical-accent rounded-full"></div>
                    </div>
                    <span className="text-xs text-tactical-textDim">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-tactical-textDim text-lg mb-6">
            {t('bottomCta.text')}
          </p>
          <button
            onClick={() => setShowDemoForm(true)}
            className="px-8 py-4 bg-white text-black hover:bg-tactical-textDim transition-all duration-300 text-sm font-medium"
          >
            {t('bottomCta.button')}
          </button>
        </div>
      </div>

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
