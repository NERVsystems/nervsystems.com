import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function TAKCalloutSection() {
  const t = useTranslations('takCallout');

  const benefitKeys = ['certified', 'asiaPacific', 'aiEnhanced', 'uptime'] as const;
  const benefits = benefitKeys.map(key => ({
    title: t(`benefits.${key}.title`),
    description: t(`benefits.${key}.description`)
  }));

  return (
    <section className="relative py-20 bg-tactical-surface border-y border-white/10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-bg opacity-20"></div>

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
            <p className="text-tactical-textDim text-lg leading-relaxed mb-8">
              {t('description')}
            </p>

            {/* Key Benefits */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="font-mono text-tactical-accent text-sm px-2 py-1 bg-black/30 rounded border border-tactical-accent/30 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{benefit.title}</div>
                    <div className="text-tactical-textDim text-xs">{benefit.description}</div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/solutions/tak"
              className="inline-block px-8 py-4 bg-white text-black hover:bg-tactical-accent hover:text-black transition-all duration-300 text-sm font-medium"
            >
              {t('cta')}
            </Link>
          </div>

          {/* Right: Quick Stats */}
          <div className="space-y-4">
            <div className="tactical-border p-6 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="font-mono text-tactical-accent text-sm mb-2">{t('stats.hosting.label')}</div>
              <div className="text-3xl font-bold text-white mb-2">{t('stats.hosting.price')}</div>
              <div className="text-tactical-textDim text-sm">
                {t('stats.hosting.description')}
              </div>
            </div>

            <div className="tactical-border p-6 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="font-mono text-tactical-accent text-sm mb-2">{t('stats.deployment.label')}</div>
              <div className="text-3xl font-bold text-white mb-2">{t('stats.deployment.title')}</div>
              <div className="text-tactical-textDim text-sm">
                {t('stats.deployment.description')}
              </div>
            </div>

            <div className="tactical-border p-6 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="font-mono text-tactical-accent text-sm mb-2">{t('stats.training.label')}</div>
              <div className="text-3xl font-bold text-white mb-2">{t('stats.training.title')}</div>
              <div className="text-tactical-textDim text-sm">
                {t('stats.training.description')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
