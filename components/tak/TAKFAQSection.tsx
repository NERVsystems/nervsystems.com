'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function TAKFAQSection() {
  const t = useTranslations('takSolutions.faq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 bg-tactical-surface border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="font-mono text-sm text-tactical-accent mb-4 uppercase tracking-wider">
            {t('eyebrow')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-tactical-textDim text-lg">
            {t('subtitle')}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {t.raw('items').map((faq: any, index: number) => (
            <div
              key={index}
              className="tactical-border bg-white/5 overflow-hidden transition-all duration-300"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-5 flex items-start justify-between hover:bg-white/5 transition-colors"
              >
                <div className="flex items-start space-x-4 flex-1">
                  <div className="font-mono text-tactical-accent text-sm px-2 py-1 bg-black/30 rounded border border-tactical-accent/30 mt-0.5 flex-shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-white font-bold text-lg pr-4">
                    {faq.question}
                  </h3>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <div className={`text-tactical-accent text-2xl transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}>
                    +
                  </div>
                </div>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6 pl-20">
                  <p className="text-tactical-textDim leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-tactical-textDim mb-6">
            {t('ctaQuestion')}
          </p>
          <Link
            href="/#contact"
            className="inline-block px-8 py-4 bg-white text-black hover:bg-tactical-textDim transition-all duration-300 text-sm font-medium"
          >
            {t('ctaButton')}
          </Link>
        </div>
      </div>
    </section>
  );
}
