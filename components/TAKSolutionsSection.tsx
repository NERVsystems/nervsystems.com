'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import RequestDemoForm from './RequestDemoForm';

export default function TAKSolutionsSection() {
  const t = useTranslations('homeTakSolutions');
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get plan keys for iteration
  const hostingPlans = ['starter', 'professional', 'enterprise'] as const;
  const deploymentPackages = ['assessment', 'deployment', 'enterprise'] as const;
  const trainingPrograms = ['fundamentals', 'nerva', 'advanced'] as const;
  const additionalServices = ['administration', 'plugins', 'hardware'] as const;

  return (
    <section id="solutions" className="relative py-24 bg-tactical-bg border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            {t('title')}
          </h2>
          <p className="text-tactical-textDim text-xl max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Managed Hosting */}
        <div className="mb-24">
          <h3 className="text-3xl font-bold text-white mb-4 text-center">{t('hosting.title')}</h3>
          <p className="text-tactical-textDim text-center mb-12 max-w-2xl mx-auto">
            {t('hosting.description')}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {hostingPlans.map((planKey) => {
              const planPath = `hosting.plans.${planKey}`;
              const hasBadge = t.has(`${planPath}.badge`);

              return (
                <div
                  key={planKey}
                  className={`relative tactical-border p-8 bg-white/5 hover:bg-white/10 transition-all duration-300 ${
                    hasBadge ? 'ring-2 ring-tactical-accent' : ''
                  }`}
                >
                  {hasBadge && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-tactical-accent text-black text-xs font-bold px-3 py-1 rounded">
                        {t(`${planPath}.badge`)}
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h4 className="text-2xl font-bold text-white mb-2">{t(`${planPath}.name`)}</h4>
                    <div className="flex items-baseline mb-2">
                      <span className="text-4xl font-bold text-white">{t(`${planPath}.price`)}</span>
                      <span className="text-tactical-textDim ml-2">{t(`${planPath}.period`)}</span>
                    </div>
                    <p className="text-sm text-tactical-textDim mb-1">{t(`${planPath}.users`)}</p>
                    <p className="text-xs font-mono text-tactical-accent">{t(`${planPath}.ai`)}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {(t.raw(`${planPath}.features`) as string[]).map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className="mt-1.5">
                          <div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div>
                        </div>
                        <span className="text-sm text-tactical-textDim">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setShowQuoteForm(true)}
                    className="w-full px-6 py-3 bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300 text-sm font-medium"
                  >
                    {t(`${planPath}.cta`)}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Deployment Consulting */}
        <div className="mb-24">
          <h3 className="text-3xl font-bold text-white mb-4 text-center">{t('deployment.title')}</h3>
          <p className="text-tactical-textDim text-center mb-12 max-w-2xl mx-auto">
            {t('deployment.description')}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {deploymentPackages.map((pkgKey) => {
              const pkgPath = `deployment.packages.${pkgKey}`;
              const hasBadge = t.has(`${pkgPath}.badge`);

              return (
                <div
                  key={pkgKey}
                  className={`relative tactical-border p-8 bg-white/5 hover:bg-white/10 transition-all duration-300 ${
                    hasBadge ? 'ring-2 ring-tactical-accent' : ''
                  }`}
                >
                  {hasBadge && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-tactical-accent text-black text-xs font-bold px-3 py-1 rounded">
                        {t(`${pkgPath}.badge`)}
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h4 className="text-2xl font-bold text-white mb-2">{t(`${pkgPath}.name`)}</h4>
                    <div className="text-3xl font-bold text-white mb-2">{t(`${pkgPath}.price`)}</div>
                    <p className="text-sm text-tactical-textDim">{t(`${pkgPath}.duration`)}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {(t.raw(`${pkgPath}.features`) as string[]).map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className="mt-1.5">
                          <div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div>
                        </div>
                        <span className="text-sm text-tactical-textDim">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setShowQuoteForm(true)}
                    className="w-full px-6 py-3 bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300 text-sm font-medium"
                  >
                    {t(`${pkgPath}.cta`)}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Training Programs */}
        <div className="mb-24">
          <h3 className="text-3xl font-bold text-white mb-4 text-center">{t('training.title')}</h3>
          <p className="text-tactical-textDim text-center mb-12 max-w-2xl mx-auto">
            {t('training.description')}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {trainingPrograms.map((progKey) => {
              const progPath = `training.programs.${progKey}`;
              const hasBadge = t.has(`${progPath}.badge`);

              return (
                <div
                  key={progKey}
                  className={`relative tactical-border p-8 bg-white/5 hover:bg-white/10 transition-all duration-300 ${
                    hasBadge ? 'ring-2 ring-tactical-accent' : ''
                  }`}
                >
                  {hasBadge && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-tactical-accent text-black text-xs font-bold px-3 py-1 rounded">
                        {t(`${progPath}.badge`)}
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-white mb-2">{t(`${progPath}.name`)}</h4>
                    <div className="flex items-baseline mb-2">
                      <span className="text-3xl font-bold text-white">{t(`${progPath}.price`)}</span>
                      <span className="text-sm text-tactical-textDim ml-2">{t(`${progPath}.period`)}</span>
                    </div>
                    <p className="text-sm text-tactical-textDim mb-3">Duration: {t(`${progPath}.duration`)}</p>
                    <p className="text-sm text-tactical-textDim">{t(`${progPath}.description`)}</p>
                  </div>

                  <button
                    onClick={() => setShowQuoteForm(true)}
                    className="w-full px-6 py-3 bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300 text-sm font-medium"
                  >
                    {t(`${progPath}.cta`)}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Volume Discounts */}
          <div className="mt-8 text-center">
            <p className="text-sm text-tactical-textDim">
              <span className="font-semibold text-white">{t('training.volumeDiscounts.label')}</span> {t('training.volumeDiscounts.tiers')}
            </p>
          </div>
        </div>

        {/* Additional Services */}
        <div className="tactical-border p-8 bg-white/5 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">{t('additionalServices.title')}</h3>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {additionalServices.map((svcKey) => {
              const svcPath = `additionalServices.services.${svcKey}`;
              return (
                <div key={svcKey}>
                  <h4 className="font-bold text-white mb-2">{t(`${svcPath}.title`)}</h4>
                  <p className="text-sm text-tactical-textDim mb-2">
                    {t(`${svcPath}.description`)}
                  </p>
                  <p className="text-tactical-accent font-mono text-sm">{t(`${svcPath}.price`)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quote Form Modal - Rendered via Portal */}
      {mounted && showQuoteForm && createPortal(
        <RequestDemoForm
          onClose={() => setShowQuoteForm(false)}
          formType="quote"
          formId={process.env.NEXT_PUBLIC_HUBSPOT_TAK_FORM_ID}
        />,
        document.body
      )}
    </section>
  );
}
