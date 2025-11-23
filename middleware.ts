import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Never redirect to a prefix for the default locale
  localePrefix: 'as-needed',

  // Disable automatic locale detection to respect explicit user language selection
  // Without this, the middleware uses cookies/headers to auto-detect language,
  // which prevents users from manually switching back to the default locale
  localeDetection: false
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|ja|th|ko|ar|zh)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
};
