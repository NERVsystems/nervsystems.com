'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function AboutBuildSection() {
  const t = useTranslations('about.build');
  const locale = useLocale();

  const products = [
    { key: 'nerva', href: `/${locale}#nerva` },
    { key: 'infernode', href: `/${locale}#infernode` },
    { key: 'nervCentre', href: `/${locale}/solutions/nerv-centre` },
  ];

  return (
    <section className="relative py-16 bg-tactical-surface border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="font-mono text-sm text-tactical-accent mb-4 uppercase tracking-[0.2em]">
            {t('eyebrow')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {t('title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className="group flex flex-col tactical-border p-8 bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <div className="font-mono text-xs text-tactical-accent mb-3 px-2 py-1 bg-black/30 rounded border border-tactical-accent/30 self-start">
                {t(`items.${key}.label`)}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-tactical-accent transition-colors">
                {t(`items.${key}.title`)}
              </h3>
              <p className="text-tactical-textDim leading-relaxed flex-1">
                {t(`items.${key}.description`)}
              </p>
              <div className="mt-6 font-mono text-sm text-tactical-accent">
                {t(`items.${key}.cta`)} ▸
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
