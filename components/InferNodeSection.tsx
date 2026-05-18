'use client';

import { useTranslations } from 'next-intl';

export default function InferNodeSection() {
  const t = useTranslations('infernode');

  const pillars = ['proven', 'isolated', 'edge'] as const;

  return (
    <section id="infernode" className="relative py-20 bg-tactical-bg border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <div className="font-mono text-sm text-tactical-accent mb-4 uppercase tracking-wider">
              {t('label')}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('title')}
            </h2>
            <p className="text-tactical-textDim text-lg leading-relaxed mb-4">
              {t('p1')}
            </p>
            <p className="text-tactical-text text-base leading-relaxed mb-8">
              {t('p2')}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://infernode.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-white text-black hover:bg-tactical-accent transition-all duration-300 text-sm font-medium"
              >
                {t('ctaPrimary')}
              </a>
              <a
                href="https://infernode.io/security/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 border border-white/20 text-white hover:bg-white/5 transition-all duration-300 text-sm font-medium"
              >
                {t('ctaSecondary')}
              </a>
            </div>
          </div>

          {/* Right: Pillars */}
          <div className="space-y-4">
            {pillars.map((key) => (
              <div
                key={key}
                className="tactical-border p-6 bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                <div className="font-mono text-tactical-accent text-sm mb-2">
                  {t(`pillars.${key}.label`)}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {t(`pillars.${key}.title`)}
                </h3>
                <div className="text-tactical-textDim text-sm">
                  {t(`pillars.${key}.description`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
