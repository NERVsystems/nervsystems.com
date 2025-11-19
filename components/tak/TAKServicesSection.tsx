'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import RequestDemoForm from '@/components/RequestDemoForm';

export default function TAKServicesSection() {
  const t = useTranslations('takSolutions.services');
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="services" className="relative py-24 bg-tactical-surface border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Introduction */}
        <div className="mb-20 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {t('title')}
          </h2>
          <p className="text-tactical-textDim text-lg leading-relaxed">
            {t('introduction')}
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
                <p className="text-xs font-mono text-tactical-accent">{t('hosting.plans.starter.ai')}</p>
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
                <p className="text-xs font-mono text-tactical-accent">{t('hosting.plans.professional.ai')}</p>
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
                <p className="text-xs font-mono text-tactical-accent">{t('hosting.plans.enterprise.ai')}</p>
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
            <p>{t('hosting.note')}</p>
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
                <h4 className="text-2xl font-bold text-white mb-2">{t('deployment.plans.assessment.name')}</h4>
                <div className="text-3xl font-bold text-white mb-2">{t('deployment.plans.assessment.price')}</div>
                <p className="text-sm text-tactical-textDim">{t('deployment.plans.assessment.description')}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {(t.raw('deployment.plans.assessment.features') as string[]).map((feature, idx) => (
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
                {t('deployment.plans.assessment.cta')}
              </button>
            </div>

            {/* Deployment */}
            <div className="tactical-border p-8 bg-white/5 hover:bg-white/10 transition-all duration-300 ring-2 ring-tactical-accent relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-tactical-accent text-black text-xs font-bold px-3 py-1 rounded">
                  {t('deployment.plans.deployment.badge')}
                </span>
              </div>

              <div className="mb-6">
                <h4 className="text-2xl font-bold text-white mb-2">{t('deployment.plans.deployment.name')}</h4>
                <div className="text-3xl font-bold text-white mb-2">{t('deployment.plans.deployment.price')}</div>
                <p className="text-sm text-tactical-textDim">{t('deployment.plans.deployment.description')}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {(t.raw('deployment.plans.deployment.features') as string[]).map((feature, idx) => (
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
                {t('deployment.plans.deployment.cta')}
              </button>
            </div>

            {/* Enterprise */}
            <div className="tactical-border p-8 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="mb-6">
                <h4 className="text-2xl font-bold text-white mb-2">{t('deployment.plans.enterprise.name')}</h4>
                <div className="text-3xl font-bold text-white mb-2">{t('deployment.plans.enterprise.price')}</div>
                <p className="text-sm text-tactical-textDim">{t('deployment.plans.enterprise.description')}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {(t.raw('deployment.plans.enterprise.features') as string[]).map((feature, idx) => (
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
                {t('deployment.plans.enterprise.cta')}
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
              <h4 className="text-xl font-bold text-white mb-2">{t('training.programs.fundamentals.name')}</h4>
              <div className="flex items-baseline mb-2">
                <span className="text-3xl font-bold text-white">{t('training.programs.fundamentals.price')}</span>
                <span className="text-sm text-tactical-textDim ml-2">{t('training.programs.fundamentals.period')}</span>
              </div>
              <p className="text-sm text-tactical-textDim mb-4">{t('training.programs.fundamentals.duration')}</p>
              <button
                onClick={() => setShowQuoteForm(true)}
                className="w-full px-4 py-2 bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300 text-sm font-medium"
              >
                {t('training.programs.fundamentals.cta')}
              </button>
            </div>

            <div className="tactical-border p-6 bg-white/5 hover:bg-white/10 transition-all duration-300 ring-2 ring-tactical-accent relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-tactical-accent text-black text-xs font-bold px-2 py-1 rounded">
                  {t('training.programs.nerva.badge')}
                </span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">{t('training.programs.nerva.name')}</h4>
              <div className="flex items-baseline mb-2">
                <span className="text-3xl font-bold text-white">{t('training.programs.nerva.price')}</span>
                <span className="text-sm text-tactical-textDim ml-2">{t('training.programs.nerva.period')}</span>
              </div>
              <p className="text-sm text-tactical-textDim mb-4">{t('training.programs.nerva.duration')}</p>
              <button
                onClick={() => setShowQuoteForm(true)}
                className="w-full px-4 py-2 bg-white text-black hover:bg-tactical-textDim transition-all duration-300 text-sm font-medium"
              >
                {t('training.programs.nerva.cta')}
              </button>
            </div>

            <div className="tactical-border p-6 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <h4 className="text-xl font-bold text-white mb-2">{t('training.programs.advanced.name')}</h4>
              <div className="flex items-baseline mb-2">
                <span className="text-3xl font-bold text-white">{t('training.programs.advanced.price')}</span>
                <span className="text-sm text-tactical-textDim ml-2">{t('training.programs.advanced.period')}</span>
              </div>
              <p className="text-sm text-tactical-textDim mb-4">{t('training.programs.advanced.duration')}</p>
              <button
                onClick={() => setShowQuoteForm(true)}
                className="w-full px-4 py-2 bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300 text-sm font-medium"
              >
                {t('training.programs.advanced.cta')}
              </button>
            </div>
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
