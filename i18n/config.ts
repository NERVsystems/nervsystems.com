export const locales = ['en', 'de', 'ja', 'th', 'uk'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  ja: '日本語',
  th: 'ไทย',
  uk: 'Українська',
};
