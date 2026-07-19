'use client';

import { useTranslations } from 'next-intl';

export default function NervCentreProducts() {
  const t = useTranslations('nervCentre.products');
  const items = [
    { key: 'pro', specs: ['capacity', 'cooling', 'power'] },
    { key: 'outdoor', specs: ['rating', 'finish', 'siting'] },
    { key: 'max', specs: ['capacity', 'scale', 'deploy'] },
  ] as const;

  return (
    <section className="relative py-20 bg-tactical-bg overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-14">
          <div>
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
          <div className="relative">
            <div className="absolute -inset-4 bg-tactical-accent/5 blur-3xl rounded-full"></div>
            <img
              src="/img/nerv-centre/outdoor-white.png"
              alt="NERV Centre Outdoor unit with integrated cooling"
              className="relative w-full max-w-md mx-auto h-auto"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map(({ key, specs }) => (
            <div
              key={key}
              className="tactical-border p-8 bg-white/5 hover:bg-white/10 transition-all duration-300 flex flex-col"
            >
              <div className="font-mono text-xs text-tactical-accent mb-3 tracking-wider">
                {t(`items.${key}.tag`)}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {t(`items.${key}.name`)}
              </h3>
              <p className="text-tactical-textDim leading-relaxed mb-6 flex-1">
                {t(`items.${key}.description`)}
              </p>
              <div className="border-t border-white/10 pt-4">
                <div className="font-mono text-[11px] text-tactical-textDim/70 mb-3 tracking-wider">
                  {t('specsLabel')}
                </div>
                <ul className="space-y-2">
                  {specs.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-tactical-text">
                      <span className="text-tactical-accent font-mono mt-0.5">▸</span>
                      <span>{t(`items.${key}.specs.${s}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
