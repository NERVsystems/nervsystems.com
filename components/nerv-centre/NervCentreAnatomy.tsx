'use client';

import { useTranslations } from 'next-intl';

export default function NervCentreAnatomy() {
  const t = useTranslations('nervCentre.anatomy');
  const specs = ['rating', 'efficiency', 'enclosure', 'capacity', 'access', 'protection'] as const;

  return (
    <section className="relative py-20 bg-tactical-surface border-y border-white/10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Annotated render on a light panel so callouts read clearly */}
          <div className="order-2 lg:order-1">
            <div className="rounded-lg bg-white/90 p-4 border border-white/20">
              <img
                src="/img/nerv-centre/pro.png"
                alt={t('imageAlt')}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Copy + spec grid */}
          <div className="order-1 lg:order-2">
            <div className="font-mono text-sm text-tactical-accent mb-4 uppercase tracking-wider">
              {t('eyebrow')}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">
              {t('title')}
            </h2>
            <p className="text-tactical-textDim text-lg leading-relaxed mb-8">
              {t('description')}
            </p>

            <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10">
              {specs.map((s) => (
                <div key={s} className="bg-tactical-surface p-4">
                  <div className="font-mono text-[11px] text-tactical-accent mb-1 tracking-wider">
                    {t(`specs.${s}.k`)}
                  </div>
                  <div className="text-white font-bold text-sm">
                    {t(`specs.${s}.v`)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
