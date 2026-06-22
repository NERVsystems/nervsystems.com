'use client';

import { useTranslations } from 'next-intl';

export default function AboutIntroSection() {
  const t = useTranslations('about');

  return (
    <section className="relative pt-32 pb-16 bg-tactical-bg overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="font-mono text-sm text-tactical-accent mb-4 uppercase tracking-[0.2em]">
          {t('eyebrow')}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
          {t('title')}
        </h1>
        <div className="space-y-6 text-tactical-textDim text-lg leading-relaxed">
          <p>{t('lead')}</p>
          <p>{t('body')}</p>
        </div>
      </div>
    </section>
  );
}
