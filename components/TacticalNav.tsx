'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import RequestDemoForm from './RequestDemoForm';

export default function TacticalNav() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [showDemoForm, setShowDemoForm] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-tactical-surface/95 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/img/Screenshot 2025-06-20 at 20.44.53.png"
              alt="NERV Systems"
              className="h-12 w-auto"
            />
          </div>

          {/* Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#features" className="text-sm text-tactical-textDim hover:text-white transition-colors">
              {t('features')}
            </Link>
            <Link href="/#platform" className="text-sm text-tactical-textDim hover:text-white transition-colors">
              {t('platform')}
            </Link>
            <Link href="/solutions/tak" className="text-sm text-tactical-textDim hover:text-white transition-colors">
              {t('takSolutions')}
            </Link>
            <Link href="/#contact" className="text-sm text-tactical-textDim hover:text-white transition-colors">
              {t('contact')}
            </Link>
          </div>

          {/* CTA */}
          <button
            onClick={() => setShowDemoForm(true)}
            className="px-6 py-2 bg-white text-black hover:bg-tactical-textDim transition-all duration-300 text-sm font-medium"
          >
            {t('requestDemo')}
          </button>
        </div>
      </div>

      {/* Demo Form Modal */}
      {showDemoForm && (
        <RequestDemoForm
          onClose={() => setShowDemoForm(false)}
          formType="demo"
          formId={process.env.NEXT_PUBLIC_HUBSPOT_DEMO_FORM_ID}
        />
      )}
    </nav>
  );
}
