'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function NervCentreCalculator() {
  const t = useTranslations('nervCentre.calculator');
  const locale = useLocale();

  return (
    <section id="calculator" className="relative py-20 bg-tactical-surface border-y border-white/10 overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 grid-bg opacity-20"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="tactical-border p-8 md:p-12 bg-white/5">
          <div className="font-mono text-sm text-tactical-accent mb-4 uppercase tracking-wider">
            {t('eyebrow')}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 max-w-3xl">
            {t('title')}
          </h2>
          <p className="text-tactical-textDim text-lg leading-relaxed mb-6 max-w-3xl">
            {t('description')}
          </p>
          <p className="text-tactical-text leading-relaxed mb-8 max-w-3xl border-l-2 border-tactical-accent/60 pl-4">
            {t('point')}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              href={`/${locale}/solutions/nerv-centre/calculator`}
              className="inline-block px-8 py-4 bg-tactical-accent text-black hover:bg-white transition-all duration-300 text-sm font-medium text-center"
            >
              {t('button')}
            </Link>
            <span className="font-mono text-xs text-tactical-textDim/70">
              {t('note')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
