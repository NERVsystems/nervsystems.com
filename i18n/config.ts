export const locales = ['en', 'ja', 'th', 'ko', 'ar', 'sv', 'uk', 'es'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ja: '日本語',
  th: 'ไทย',
  ko: '한국어',
  ar: 'العربية',
  sv: 'Svenska',
  uk: 'Українська',
  es: 'Español',
};
