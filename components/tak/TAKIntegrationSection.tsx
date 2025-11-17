'use client';

import { useTranslations } from 'next-intl';

export default function TAKIntegrationSection() {
  const t = useTranslations('takSolutions.integration');

  const benefits = [0, 1, 2, 3, 4].map(i => ({
    title: t(`benefits.${i}.title`),
    description: t(`benefits.${i}.description`)
  }));

  return (
    <section className="relative py-24 bg-tactical-bg border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              {t('title')}
            </h2>

            <p className="text-tactical-textDim text-lg mb-10 leading-relaxed">
              {t('description')}
            </p>

            {/* Benefits */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="font-mono text-tactical-accent text-sm px-2 py-1 bg-black/30 rounded border border-tactical-accent/30 mt-1">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">{benefit.title}</h4>
                    <p className="text-tactical-textDim text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Use Cases */}
          <div className="space-y-6">
            {/* Military Operations */}
            <div className="tactical-border bg-white/5 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80"
                  alt="Military Tactical Operations"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tactical-bg to-transparent"></div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-white mb-3">{t('useCases.military.title')}</h4>
                <p className="text-tactical-textDim text-sm leading-relaxed mb-3">
                  {t('useCases.military.description')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {t.raw('useCases.military.tags').map((tag: string, idx: number) => (
                    <span key={idx} className="text-xs font-mono text-tactical-accent bg-black/30 px-2 py-1 rounded">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Law Enforcement */}
            <div className="tactical-border bg-white/5 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
                  alt="Law Enforcement Tactical Operations"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tactical-bg to-transparent"></div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-white mb-3">{t('useCases.lawEnforcement.title')}</h4>
                <p className="text-tactical-textDim text-sm leading-relaxed mb-3">
                  {t('useCases.lawEnforcement.description')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {t.raw('useCases.lawEnforcement.tags').map((tag: string, idx: number) => (
                    <span key={idx} className="text-xs font-mono text-tactical-accent bg-black/30 px-2 py-1 rounded">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Emergency Management */}
            <div className="tactical-border bg-white/5 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=800&q=80"
                  alt="Emergency Management and Search & Rescue"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tactical-bg to-transparent"></div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-white mb-3">{t('useCases.emergency.title')}</h4>
                <p className="text-tactical-textDim text-sm leading-relaxed mb-3">
                  {t('useCases.emergency.description')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {t.raw('useCases.emergency.tags').map((tag: string, idx: number) => (
                    <span key={idx} className="text-xs font-mono text-tactical-accent bg-black/30 px-2 py-1 rounded">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
