'use client';

import { useTranslations } from 'next-intl';

export default function NervCentreSense() {
  const t = useTranslations('nervCentre.sense');
  const items = ['power', 'environment', 'security', 'automation'] as const;

  return (
    <section className="relative py-20 bg-tactical-bg overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="font-mono text-sm text-tactical-accent mb-4 uppercase tracking-wider">
            {t('eyebrow')}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">
            {t('title')}
          </h2>
          <p className="text-tactical-textDim text-lg leading-relaxed">
            {t('description')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {items.map((key) => (
            <div
              key={key}
              className="p-6 bg-white/5 border border-white/10 hover:border-tactical-accent/40 transition-all duration-300"
            >
              <h3 className="text-white font-bold mb-2">
                {t(`items.${key}.title`)}
              </h3>
              <p className="text-tactical-textDim text-sm leading-relaxed">
                {t(`items.${key}.description`)}
              </p>
            </div>
          ))}
        </div>

        <div className="tactical-border p-6 bg-black/30">
          <div className="flex items-start gap-3">
            <span className="font-mono text-tactical-accent text-sm mt-0.5">SEC</span>
            <p className="text-tactical-textDim text-sm leading-relaxed font-mono">
              {t('securityNote')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
