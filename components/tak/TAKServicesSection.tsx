'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import RequestDemoForm from '@/components/RequestDemoForm';

export default function TAKServicesSection() {
  const t = useTranslations('takPage.services');
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  return (
    <section id="services" className="relative py-24 bg-tactical-surface border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Introduction */}
        <div className="mb-20 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {t('introduction.title')}
          </h2>
          <p className="text-tactical-textDim text-lg leading-relaxed">
            {t('introduction.description')}
          </p>
        </div>

        {/* Managed TAK Hosting */}
        <div className="mb-24">
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">{t('hosting.title')}</h3>
            <p className="text-tactical-textDim text-lg max-w-3xl">
              {t('hosting.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Starter */}
            <div className="tactical-border p-8 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="mb-6">
                <h4 className="text-2xl font-bold text-white mb-2">{t('hosting.plans.starter.name')}</h4>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-bold text-white">{t('hosting.plans.starter.price')}</span>
                  <span className="text-tactical-textDim ml-2">{t('hosting.plans.starter.period')}</span>
                </div>
                <p className="text-sm text-tactical-textDim mb-1">{t('hosting.plans.starter.users')}</p>
                <p className="text-xs font-mono text-tactical-accent">{t('hosting.plans.starter.aiTier')}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {(t.raw('hosting.plans.starter.features') as string[]).map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                    <span className="text-sm text-tactical-textDim">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setShowQuoteForm(true)}
                className="w-full px-6 py-3 bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300 text-sm font-medium"
              >
                {t('hosting.plans.starter.cta')}
              </button>
            </div>

            {/* Professional */}
            <div className="tactical-border p-8 bg-white/5 hover:bg-white/10 transition-all duration-300 ring-2 ring-tactical-accent relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-tactical-accent text-black text-xs font-bold px-3 py-1 rounded">
                  {t('hosting.plans.professional.badge')}
                </span>
              </div>

              <div className="mb-6">
                <h4 className="text-2xl font-bold text-white mb-2">{t('hosting.plans.professional.name')}</h4>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-bold text-white">{t('hosting.plans.professional.price')}</span>
                  <span className="text-tactical-textDim ml-2">{t('hosting.plans.professional.period')}</span>
                </div>
                <p className="text-sm text-tactical-textDim mb-1">{t('hosting.plans.professional.users')}</p>
                <p className="text-xs font-mono text-tactical-accent">{t('hosting.plans.professional.aiTier')}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {(t.raw('hosting.plans.professional.features') as string[]).map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                    <span className="text-sm text-tactical-textDim">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setShowQuoteForm(true)}
                className="w-full px-6 py-3 bg-white text-black hover:bg-tactical-textDim transition-all duration-300 text-sm font-medium"
              >
                {t('hosting.plans.professional.cta')}
              </button>
            </div>

            {/* Enterprise */}
            <div className="tactical-border p-8 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="mb-6">
                <h4 className="text-2xl font-bold text-white mb-2">{t('hosting.plans.enterprise.name')}</h4>
                <div className="text-3xl font-bold text-white mb-2">{t('hosting.plans.enterprise.price')}</div>
                <p className="text-sm text-tactical-textDim mb-1">{t('hosting.plans.enterprise.users')}</p>
                <p className="text-xs font-mono text-tactical-accent">{t('hosting.plans.enterprise.aiTier')}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {(t.raw('hosting.plans.enterprise.features') as string[]).map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                    <span className="text-sm text-tactical-textDim">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setShowQuoteForm(true)}
                className="w-full px-6 py-3 bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300 text-sm font-medium"
              >
                {t('hosting.plans.enterprise.cta')}
              </button>
            </div>
          </div>

          <div className="text-center text-sm text-tactical-textDim">
            <p>{t('hosting.footer')}</p>
          </div>
        </div>

        {/* TAK Deployment Consulting */}
        <div className="mb-24">
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">{t('deployment.title')}</h3>
            <p className="text-tactical-textDim text-lg max-w-3xl">
              {t('deployment.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Assessment */}
            <div className="tactical-border p-8 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="mb-6">
                <h4 className="text-2xl font-bold text-white mb-2">{t('deployment.packages.assessment.name')}</h4>
                <div className="text-3xl font-bold text-white mb-2">{t('deployment.packages.assessment.price')}</div>
                <p className="text-sm text-tactical-textDim">{t('deployment.packages.assessment.duration')}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {(t.raw('deployment.packages.assessment.features') as string[]).map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                    <span className="text-sm text-tactical-textDim">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setShowQuoteForm(true)}
                className="w-full px-6 py-3 bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300 text-sm font-medium"
              >
                {t('deployment.packages.assessment.cta')}
              </button>
            </div>

            {/* Deployment */}
            <div className="tactical-border p-8 bg-white/5 hover:bg-white/10 transition-all duration-300 ring-2 ring-tactical-accent relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-tactical-accent text-black text-xs font-bold px-3 py-1 rounded">
                  {t('deployment.packages.deployment.badge')}
                </span>
              </div>

              <div className="mb-6">
                <h4 className="text-2xl font-bold text-white mb-2">{t('deployment.packages.deployment.name')}</h4>
                <div className="text-3xl font-bold text-white mb-2">{t('deployment.packages.deployment.price')}</div>
                <p className="text-sm text-tactical-textDim">{t('deployment.packages.deployment.duration')}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {(t.raw('deployment.packages.deployment.features') as string[]).map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                    <span className="text-sm text-tactical-textDim">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setShowQuoteForm(true)}
                className="w-full px-6 py-3 bg-white text-black hover:bg-tactical-textDim transition-all duration-300 text-sm font-medium"
              >
                {t('deployment.packages.deployment.cta')}
              </button>
            </div>

            {/* Enterprise */}
            <div className="tactical-border p-8 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="mb-6">
                <h4 className="text-2xl font-bold text-white mb-2">{t('deployment.packages.enterprise.name')}</h4>
                <div className="text-3xl font-bold text-white mb-2">{t('deployment.packages.enterprise.price')}</div>
                <p className="text-sm text-tactical-textDim">{t('deployment.packages.enterprise.duration')}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {(t.raw('deployment.packages.enterprise.features') as string[]).map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <div className="mt-1.5"><div className="w-1.5 h-1.5 bg-tactical-accent rounded-full"></div></div>
                    <span className="text-sm text-tactical-textDim">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setShowQuoteForm(true)}
                className="w-full px-6 py-3 bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300 text-sm font-medium"
              >
                {t('deployment.packages.enterprise.cta')}
              </button>
            </div>
          </div>
        </div>

        {/* TAK Training */}
        <div className="mb-16">
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">{t('training.title')}</h3>
            <p className="text-tactical-textDim text-lg max-w-3xl">
              {t('training.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="tactical-border p-6 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <h4 className="text-xl font-bold text-white mb-2">{t('training.courses.fundamentals.name')}</h4>
              <div className="flex items-baseline mb-2">
                <span className="text-3xl font-bold text-white">{t('training.courses.fundamentals.price')}</span>
                <span className="text-sm text-tactical-textDim ml-2">{t('training.courses.fundamentals.unit')}</span>
              </div>
              <p className="text-sm text-tactical-textDim mb-4">{t('training.courses.fundamentals.duration')}</p>
              <button
                onClick={() => setShowQuoteForm(true)}
                className="w-full px-4 py-2 bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300 text-sm font-medium"
              >
                {t('training.courses.fundamentals.cta')}
              </button>
            </div>

            <div className="tactical-border p-6 bg-white/5 hover:bg-white/10 transition-all duration-300 ring-2 ring-tactical-accent relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-tactical-accent text-black text-xs font-bold px-2 py-1 rounded">
                  {t('training.courses.nervaAi.badge')}
                </span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">{t('training.courses.nervaAi.name')}</h4>
              <div className="flex items-baseline mb-2">
                <span className="text-3xl font-bold text-white">{t('training.courses.nervaAi.price')}</span>
                <span className="text-sm text-tactical-textDim ml-2">{t('training.courses.nervaAi.unit')}</span>
              </div>
              <p className="text-sm text-tactical-textDim mb-4">{t('training.courses.nervaAi.duration')}</p>
              <button
                onClick={() => setShowQuoteForm(true)}
                className="w-full px-4 py-2 bg-white text-black hover:bg-tactical-textDim transition-all duration-300 text-sm font-medium"
              >
                {t('training.courses.nervaAi.cta')}
              </button>
            </div>

            <div className="tactical-border p-6 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <h4 className="text-xl font-bold text-white mb-2">{t('training.courses.advanced.name')}</h4>
              <div className="flex items-baseline mb-2">
                <span className="text-3xl font-bold text-white">{t('training.courses.advanced.price')}</span>
                <span className="text-sm text-tactical-textDim ml-2">{t('training.courses.advanced.unit')}</span>
              </div>
              <p className="text-sm text-tactical-textDim mb-4">{t('training.courses.advanced.duration')}</p>
              <button
                onClick={() => setShowQuoteForm(true)}
                className="w-full px-4 py-2 bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300 text-sm font-medium"
              >
                {t('training.courses.advanced.cta')}
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Quote Form Modal */}
      {showQuoteForm && (
        <RequestDemoForm
          onClose={() => setShowQuoteForm(false)}
          formType="quote"
          formId={process.env.NEXT_PUBLIC_HUBSPOT_TAK_FORM_ID}
        />
      )}
    </section>
  );
}
