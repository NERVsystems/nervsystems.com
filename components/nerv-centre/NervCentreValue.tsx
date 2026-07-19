'use client';

import { useTranslations } from 'next-intl';

export default function NervCentreValue() {
  const t = useTranslations('nervCentre.value');
  const pillars = ['sovereignty', 'resilience', 'physical', 'aiReady'] as const;

  return (
    <section className="relative py-20 bg-tactical-surface border-y border-white/10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="font-mono text-sm text-tactical-accent mb-4 uppercase tracking-wider">
            {t('eyebrow')}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">
            {t('title')}
          </h2>
          <p className="text-tactical-textDim text-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {pillars.map((key) => (
            <div
              key={key}
              className="tactical-border p-8 bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <div className="font-mono text-tactical-accent text-sm mb-4">
                {t(`pillars.${key}.code`)}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {t(`pillars.${key}.title`)}
              </h3>
              <p className="text-tactical-textDim leading-relaxed">
                {t(`pillars.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
