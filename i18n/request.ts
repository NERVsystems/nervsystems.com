import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './config';

type Messages = Record<string, unknown>;

// Deep-merge a locale's messages over the English base so any key that a
// translation is missing (a whole new namespace, or an individual string)
// falls back to English instead of erroring or rendering the raw key path.
// Arrays are replaced wholesale when the override provides them.
function deepMerge(base: Messages, override: Messages): Messages {
  const out: Messages = { ...base };
  for (const key of Object.keys(override)) {
    const o = override[key];
    const b = out[key];
    if (
      o && typeof o === 'object' && !Array.isArray(o) &&
      b && typeof b === 'object' && !Array.isArray(b)
    ) {
      out[key] = deepMerge(b as Messages, o as Messages);
    } else {
      out[key] = o;
    }
  }
  return out;
}

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  const base = (await import(`../messages/${defaultLocale}.json`)).default as Messages;

  if (locale === defaultLocale) {
    return { locale, messages: base };
  }

  const localeMessages = (await import(`../messages/${locale}.json`)).default as Messages;

  return {
    locale,
    // English base with the active locale merged on top: full translations win,
    // anything untranslated falls back to English.
    messages: deepMerge(base, localeMessages)
  };
});
