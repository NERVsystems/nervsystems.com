'use client';

import { useTranslations } from 'next-intl';

export default function AboutPrinciplesSection() {
  const t = useTranslations('about.principles');

  return (
    <section className="relative py-16 bg-tactical-bg border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="font-mono text-sm text-tactical-accent mb-4 uppercase tracking-[0.2em]">
            {t('eyebrow')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {t('title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {['command', 'edge', 'open', 'verifiable'].map((key) => (
            <div
              key={key}
              className="flex gap-5 tactical-border p-6 bg-white/5"
            >
              <div className="font-mono text-2xl font-bold text-tactical-accent leading-none pt-1">
                {t(`items.${key}.number`)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-sm text-tactical-textDim leading-relaxed">
                  {t(`items.${key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
