'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer className="bg-tactical-surface border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img
                src="/img/nerv-logo.png"
                alt="NERV Systems"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-tactical-textDim text-sm leading-relaxed">
              {t('tagline')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              {t('navigation.title')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#nerva" className="text-tactical-textDim hover:text-white transition-colors text-sm">
                  {t('navigation.nerva')}
                </a>
              </li>
              <li>
                <a href="#features" className="text-tactical-textDim hover:text-white transition-colors text-sm">
                  {t('navigation.platform')}
                </a>
              </li>
              <li>
                <a href="#platform" className="text-tactical-textDim hover:text-white transition-colors text-sm">
                  {t('navigation.takIntegration')}
                </a>
              </li>
              <li>
                <a href="#solutions" className="text-tactical-textDim hover:text-white transition-colors text-sm">
                  {t('navigation.solutions')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Affiliations */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              {t('contact.title')}
            </h3>
            <div className="text-tactical-textDim text-sm space-y-2 mb-6">
              <p>{t('contact.email')}</p>
              <p>{t('contact.phone')}</p>
              <p>{t('contact.address')}</p>
              <p>{t('contact.addressSG')}</p>
              <p>{t('contact.addressUK')}</p>
            </div>
            <div className="text-xs text-tactical-textDim/70 space-y-1">
              <p className="font-mono">▸ {t('contact.affiliations.nvidia')}</p>
              <p className="font-mono">▸ {t('contact.affiliations.nus')}</p>
              <p className="font-mono">▸ {t('contact.affiliations.kcl')}</p>
              <p className="font-mono">
                <a
                  href="https://github.com/NERVsystems"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-tactical-accent transition-colors"
                >
                  ▸ {t('contact.affiliations.github')}
                </a>
              </p>
              <p className="font-mono">
                <a
                  href="https://x.com/NERVSysOffical"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-tactical-accent transition-colors"
                >
                  ▸ {t('contact.affiliations.x')}
                </a>
              </p>
              <p className="font-mono">
                <a
                  href="https://www.youtube.com/@nervsystems"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-tactical-accent transition-colors"
                >
                  ▸ {t('contact.affiliations.youtube')}
                </a>
              </p>
            </div>
          </div>

          {/* TAK Service Provider */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              {t('takProvider.title')}
            </h3>
            <a
              href="https://tak.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mb-4 hover:opacity-80 transition-opacity border border-white/10"
            >
              <img
                src="/img/tak-badge.svg"
                alt="TAK.gov Authorized Service Provider"
                className="h-16 w-auto"
              />
            </a>
            <p className="text-tactical-textDim text-sm mb-3">
              {t('takProvider.description')}
            </p>
            <ul className="text-xs text-tactical-textDim/80 space-y-1 font-mono">
              <li>▸ {t('takProvider.regions.usa')}</li>
              <li>▸ {t('takProvider.regions.singapore')}</li>
              <li>▸ {t('takProvider.regions.thailand')}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center text-tactical-textDim text-sm">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex flex-col items-center md:items-start gap-1">
                <p>
                  {t('copyright')}
                </p>
                <p className="text-xs text-tactical-textDim/70 font-mono">
                  {t('entity')}
                </p>
              </div>
              <div className="flex gap-4 text-xs">
                <Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">
                  {t('legal.privacy')}
                </Link>
                <span className="text-tactical-textDim/50">•</span>
                <Link href={`/${locale}/terms`} className="hover:text-white transition-colors">
                  {t('legal.terms')}
                </Link>
              </div>
            </div>
            <p className="mt-4 md:mt-0">
              {t('taglineBottom')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
