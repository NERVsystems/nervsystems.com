'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function NervCentreHaaS() {
  const t = useTranslations('nervCentre.haas');
  const locale = useLocale();
  const points = ['opex', 'bundled', 'refresh', 'term'] as const;

  return (
    <section className="relative py-20 bg-tactical-bg overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Copy */}
          <div>
            <div className="font-mono text-sm text-tactical-accent mb-4 uppercase tracking-wider">
              {t('eyebrow')}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">
              {t('title')}
            </h2>
            <p className="text-tactical-textDim text-lg leading-relaxed mb-8">
              {t('description')}
            </p>
            <Link
              href={`/${locale}/solutions/nerv-centre/calculator`}
              className="inline-block px-8 py-4 bg-white text-black hover:bg-tactical-accent transition-all duration-300 text-sm font-medium"
            >
              {t('cta')}
            </Link>
          </div>

          {/* Points */}
          <div className="grid sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
            {points.map((key) => (
              <div key={key} className="bg-tactical-bg p-6">
                <h3 className="text-white font-bold mb-2">{t(`points.${key}.title`)}</h3>
                <p className="text-tactical-textDim text-sm leading-relaxed">
                  {t(`points.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
