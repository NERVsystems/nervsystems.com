'use client';

import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { locales, type Locale } from '@/i18n/config';

const localeLabels: Record<Locale, string> = {
  en: 'EN',
  ja: '日本',
  th: 'ไทย',
  ko: '한국',
  ar: 'عر',
  sv: 'SV',
};

export default function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = (params?.locale as Locale) || 'en';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Build the path for switching locales
  const getLocalePath = (locale: Locale) => {
    if (!pathname) return `/${locale}`;

    // Remove current locale from pathname if it exists
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(\/|$)/, '/');

    // With localePrefix: 'always', all locales (including English) use prefix
    return `/${locale}${pathWithoutLocale}`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Current Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1.5 text-sm font-mono text-tactical-textDim hover:text-tactical-accent transition-colors border border-white/20 hover:border-tactical-accent/50"
        aria-label="Select language"
      >
        {localeLabels[currentLocale]}
        <span className="ml-1.5 text-xs">▾</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 py-1 bg-tactical-surface border border-white/20 shadow-lg z-50 min-w-[80px]">
          {locales.map((locale) => (
            <Link
              key={locale}
              href={getLocalePath(locale)}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2 text-sm font-mono transition-colors ${
                locale === currentLocale
                  ? 'text-tactical-accent bg-tactical-accent/10'
                  : 'text-tactical-textDim hover:text-tactical-accent hover:bg-white/5'
              }`}
            >
              {localeLabels[locale]}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
