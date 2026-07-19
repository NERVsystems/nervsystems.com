import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Always use locale prefix (including /en/ for English)
  // This makes all language choices explicit and unambiguous,
  // allowing proper region detection while respecting manual overrides
  localePrefix: 'always',

  // Enable automatic locale detection for initial visits
  // Uses browser language (Accept-Language header) and NEXT_LOCALE cookie
  // When users explicitly select a language, their choice is stored and respected
  localeDetection: true
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|ja|th|ko|ar|sv|uk|zh)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
};
