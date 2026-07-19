'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function NervCentreCalloutSection() {
  const t = useTranslations('nervCentre.callout');
  const locale = useLocale();

  const benefits = ['onSite', 'offline', 'sealed', 'aiReady'] as const;

  return (
    <section className="relative py-20 bg-tactical-bg border-y border-white/10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: product render */}
          <div className="relative order-2 md:order-1">
            <div className="absolute -inset-4 bg-tactical-accent/5 blur-3xl rounded-full"></div>
            <img
              src="/img/nerv-centre/outdoor-camo.png"
              alt="NERV Centre — private on-prem AI compute in MultiCam finish"
              className="relative w-full max-w-sm mx-auto h-auto drop-shadow-2xl"
            />
          </div>

          {/* Right: content */}
          <div className="order-1 md:order-2">
            <div className="font-mono text-sm text-tactical-accent mb-4 uppercase tracking-wider">
              {t('label')}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('title')}
            </h2>
            <p className="text-tactical-textDim text-lg leading-relaxed mb-8">
              {t('description')}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {benefits.map((key) => (
                <div key={key} className="flex items-start space-x-3">
                  <div className="font-mono text-tactical-accent text-sm px-2 py-1 bg-black/30 rounded border border-tactical-accent/30 mt-0.5">
                    ▸
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{t(`benefits.${key}.title`)}</div>
                    <div className="text-tactical-textDim text-xs">{t(`benefits.${key}.description`)}</div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href={`/${locale}/solutions/nerv-centre`}
              className="inline-block px-8 py-4 bg-white text-black hover:bg-tactical-accent transition-all duration-300 text-sm font-medium"
            >
              {t('cta')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
