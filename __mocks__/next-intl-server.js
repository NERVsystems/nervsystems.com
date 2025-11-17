// Mock for next-intl server-side functionality

const getRequestConfig = async ({ requestLocale }) => {
  const locale = await requestLocale || 'en';
  const messages = require('../messages/en.json');

  return {
    locale,
    messages,
  };
};

const getMessages = async () => {
  return require('../messages/en.json');
};

const getTranslations = async (namespace) => {
  return (key) => `${namespace}.${key}`;
};

const getLocale = async () => 'en';

const getFormatter = async () => ({
  dateTime: (date, options) => date.toISOString(),
  number: (num, options) => num.toString(),
  relativeTime: (date, options) => 'relative time',
});

const setRequestLocale = (locale) => {};

module.exports = {
  getRequestConfig,
  getMessages,
  getTranslations,
  getLocale,
  getFormatter,
  setRequestLocale,
  getTimeZone: async () => 'UTC',
  getNow: async () => new Date(),
};
