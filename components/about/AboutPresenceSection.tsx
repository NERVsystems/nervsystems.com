'use client';

import { useTranslations } from 'next-intl';

export default function AboutPresenceSection() {
  const t = useTranslations('about.presence');

  return (
    <section className="relative py-12 bg-tactical-surface border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
          <div className="font-mono text-sm text-tactical-accent uppercase tracking-[0.2em] shrink-0">
            {t('eyebrow')}
          </div>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
            {(['us', 'sg', 'uk'] as const).map((key) => (
              <div key={key}>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-tactical-textDim mb-1">
                  {t(`offices.${key}.label`)}
                </div>
                <div className="text-white font-bold">
                  {t(`offices.${key}.value`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
