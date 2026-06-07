'use client';

import { useTranslations } from 'next-intl';

export default function SDGSection() {
  const t = useTranslations('sdg');

  const goals = ['health', 'infrastructure', 'cities', 'climate', 'institutions', 'partnerships'] as const;

  return (
    <section id="sdg" className="relative py-24 bg-tactical-bg border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="font-mono text-sm text-tactical-accent mb-4 uppercase tracking-wider">
            {t('eyebrow')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto">
            {t('title')}
          </h2>
          <p className="text-tactical-textDim text-lg max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Goals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((key) => {
            const goal = t.raw(`goals.${key}`) as {
              number: string;
              title: string;
              description: string;
            };

            return (
              <div
                key={key}
                className="group relative tactical-border p-6 bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                {/* Goal Number */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="font-mono text-sm text-tactical-accent px-2 py-1 bg-black/30 rounded border border-tactical-accent/30">
                    SDG {goal.number}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {goal.title}
                </h3>

                {/* Description */}
                <p className="text-tactical-textDim text-sm leading-relaxed">
                  {goal.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Footnote */}
        <p className="mt-12 text-xs text-tactical-textDim/60 max-w-3xl mx-auto text-center font-mono">
          {t('footnote')}
        </p>
      </div>
    </section>
  );
}
