import { useTranslations } from 'next-intl';

export default function TAKCompetitiveSection() {
  const t = useTranslations('takPage.competitive');
  const comparisons = t.raw('table.comparisons') as Array<{
    category: string;
    traditional: string;
    nerv: string;
  }>;

  return (
    <section className="relative py-24 bg-tactical-bg border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="font-mono text-sm text-tactical-accent mb-4 uppercase tracking-wider">
            {t('eyebrow')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('title')}
          </h2>
          <p className="text-tactical-textDim text-lg max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Comparison Table */}
        <div className="tactical-border bg-white/5 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-3 gap-4 p-6 bg-tactical-surface border-b border-white/10">
            <div className="font-mono text-sm text-tactical-accent uppercase tracking-wider">
              {t('table.headers.capability')}
            </div>
            <div className="font-mono text-sm text-tactical-textDim uppercase tracking-wider text-center">
              {t('table.headers.traditional')}
            </div>
            <div className="font-mono text-sm text-tactical-accent uppercase tracking-wider text-center">
              {t('table.headers.nerv')}
            </div>
          </div>

          {/* Comparison Rows */}
          {comparisons.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-4 p-6 border-b border-white/5 hover:bg-white/5 transition-all duration-300"
            >
              {/* Category */}
              <div className="font-bold text-white flex items-start">
                <div className="font-mono text-tactical-accent text-xs px-2 py-1 bg-black/30 rounded border border-tactical-accent/30 mr-3 mt-0.5">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <span>{item.category}</span>
              </div>

              {/* Traditional */}
              <div className="text-tactical-textDim text-sm flex items-center justify-center text-center">
                {item.traditional}
              </div>

              {/* NERV */}
              <div className="text-white text-sm font-medium flex items-center justify-center text-center bg-tactical-accent/10 rounded px-4 py-2 border border-tactical-accent/30">
                {item.nerv}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            {t('cta.title')}
          </h3>
          <p className="text-tactical-textDim mb-8 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#services"
              className="inline-block px-8 py-4 bg-white text-black hover:bg-tactical-accent hover:text-black transition-all duration-300 text-sm font-medium"
            >
              {t('cta.primaryButton')}
            </a>
            <a
              href="#resources"
              className="inline-block px-8 py-4 bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300 text-sm font-medium"
            >
              {t('cta.secondaryButton')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
