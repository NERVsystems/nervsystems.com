// Mock for next-intl client-side functionality
const React = require('react');

// Store for messages
let currentMessages = {};
let currentLocale = 'en';

// Mock useTranslations hook
const useTranslations = (namespace) => {
  return (key) => {
    // Navigate through the messages object
    const keys = `${namespace}.${key}`.split('.');
    let value = currentMessages;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return `${namespace}.${key}`; // Fallback to key if not found
      }
    }

    return value;
  };
};

// Mock useFormatter hook
const useFormatter = () => ({
  dateTime: (date, options) => date.toISOString(),
  number: (num, options) => num.toString(),
  relativeTime: (date, options) => 'relative time',
});

// Mock NextIntlClientProvider
const NextIntlClientProvider = ({ children, locale, messages }) => {
  // Store messages for use in hooks
  currentMessages = messages || {};
  currentLocale = locale || 'en';

  // Create a simple context provider for testing
  return React.createElement('div', { 'data-locale': locale }, children);
};

module.exports = {
  useTranslations,
  useFormatter,
  NextIntlClientProvider,
  useLocale: () => currentLocale,
  useMessages: () => currentMessages,
  useNow: () => new Date(),
  useTimeZone: () => 'UTC',
};
