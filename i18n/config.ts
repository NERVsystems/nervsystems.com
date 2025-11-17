export const locales = ['en', 'fr', 'ja', 'th', 'uk'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  ja: '日本語',
  th: 'ไทย',
  uk: 'Українська',
};
