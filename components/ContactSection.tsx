'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import RequestDemoForm from './RequestDemoForm';

export default function ContactSection() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [showContactForm, setShowContactForm] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="contact" className="relative py-24 bg-tactical-bg border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="font-mono text-sm text-tactical-accent mb-4 uppercase tracking-wider">
            {t('label')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('title')}
          </h2>
          <p className="text-tactical-textDim text-lg leading-relaxed max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Form CTA */}
          <div className="tactical-border p-8 bg-white/5 hover:bg-white/10 transition-all duration-300">
            <div className="font-mono text-tactical-accent text-sm mb-4 uppercase tracking-wider">
              {t('form.label')}
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              {t('form.title')}
            </h3>
            <p className="text-tactical-textDim mb-6">
              {t('form.description')}
            </p>
            <button
              onClick={() => setShowContactForm(true)}
              className="px-8 py-4 bg-white text-black hover:bg-tactical-accent hover:text-black transition-all duration-300 text-sm font-medium"
            >
              {t('form.button')}
            </button>
          </div>

          {/* Direct Contact Info */}
          <div className="tactical-border p-8 bg-white/5">
            <div className="font-mono text-tactical-accent text-sm mb-4 uppercase tracking-wider">
              {t('direct.label')}
            </div>
            <h3 className="text-2xl font-bold text-white mb-6">
              {t('direct.title')}
            </h3>

            <div className="space-y-4">
              <div>
                <div className="text-sm font-mono text-tactical-textDim mb-1">{t('direct.email.label')}</div>
                <a href="mailto:contact@nervsystems.com" className="text-white hover:text-tactical-accent transition-colors">
                  {t('direct.email.value')}
                </a>
              </div>

              <div>
                <div className="text-sm font-mono text-tactical-textDim mb-1">{t('direct.phone.label')}</div>
                <a href="tel:+17039777097" className="text-white hover:text-tactical-accent transition-colors">
                  {t('direct.phone.value')}
                </a>
              </div>

              <div>
                <div className="text-sm font-mono text-tactical-textDim mb-1">{t('direct.address.label')}</div>
                <div className="text-white">{t('direct.address.value')}</div>
              </div>

              <div>
                <div className="text-sm font-mono text-tactical-textDim mb-1">{t('direct.addressSG.label')}</div>
                <div className="text-white">{t('direct.addressSG.value')}</div>
              </div>

              <div>
                <div className="text-sm font-mono text-tactical-textDim mb-1">{t('direct.region.label')}</div>
                <div className="text-white">{t('direct.region.value')}</div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="text-sm font-mono text-tactical-textDim mb-3">{t('direct.affiliations.label')}</div>
                <div className="space-y-2 text-xs text-tactical-textDim">
                  <div className="flex items-center space-x-2">
                    <span className="text-tactical-accent">▸</span>
                    <span>{t('direct.affiliations.nvidia')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-tactical-accent">▸</span>
                    <span>{t('direct.affiliations.nus')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-tactical-accent">▸</span>
                    <span>{t('direct.affiliations.kcl')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center text-sm text-tactical-textDim">
          <p>{t('quickLinks.title')}</p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <a href="#nerva" className="hover:text-white transition-colors">
              {t('quickLinks.nerva')}
            </a>
            <span>•</span>
            <Link href={`/${locale}/solutions/tak`} className="hover:text-white transition-colors">
              {t('quickLinks.tak')}
            </Link>
            <span>•</span>
            <Link href={`/${locale}/solutions/tak#resources`} className="hover:text-white transition-colors">
              {t('quickLinks.resources')}
            </Link>
          </div>
        </div>
      </div>

      {/* Contact Form Modal - Rendered via Portal */}
      {mounted && showContactForm && createPortal(
        <RequestDemoForm
          onClose={() => setShowContactForm(false)}
          formType="contact"
          formId={process.env.NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID}
        />,
        document.body
      )}
    </section>
  );
}
