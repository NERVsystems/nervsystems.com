'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales, localeNames } from '@/i18n/config';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    // Get the current path without the locale prefix
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    // Navigate to the new locale path
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="relative inline-block">
      <select
        value={locale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        className="bg-tactical-surface/50 text-white border border-white/20 rounded px-3 py-1.5 text-sm font-mono cursor-pointer hover:border-tactical-accent transition-colors appearance-none pr-8"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
          backgroundPosition: 'right 0.5rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.25em 1.25em'
        }}
      >
        {locales.map((loc) => (
          <option key={loc} value={loc} className="bg-tactical-surface text-white">
            {localeNames[loc]}
          </option>
        ))}
      </select>
    </div>
  );
}
