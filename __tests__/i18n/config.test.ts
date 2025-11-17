import { locales, defaultLocale, localeNames, type Locale } from '@/i18n/config';

describe('i18n Configuration', () => {
  describe('locales', () => {
    it('should have at least one locale defined', () => {
      expect(locales.length).toBeGreaterThan(0);
    });

    it('should contain "en" as a supported locale', () => {
      expect(locales).toContain('en');
    });

    it('should be a readonly array (TypeScript compile-time check)', () => {
      // The 'as const' assertion provides TypeScript readonly guarantee at compile time
      // We verify it's an array with the expected properties
      expect(Array.isArray(locales)).toBe(true);
      expect(locales.length).toBeGreaterThan(0);
    });
  });

  describe('defaultLocale', () => {
    it('should be defined', () => {
      expect(defaultLocale).toBeDefined();
    });

    it('should be "en"', () => {
      expect(defaultLocale).toBe('en');
    });

    it('should be included in the locales array', () => {
      expect(locales).toContain(defaultLocale);
    });
  });

  describe('localeNames', () => {
    it('should have a name for each supported locale', () => {
      locales.forEach((locale) => {
        expect(localeNames[locale]).toBeDefined();
        expect(typeof localeNames[locale]).toBe('string');
        expect(localeNames[locale].length).toBeGreaterThan(0);
      });
    });

    it('should have "English" as the name for "en"', () => {
      expect(localeNames.en).toBe('English');
    });

    it('should not have names for unsupported locales', () => {
      const allKeys = Object.keys(localeNames) as Locale[];
      allKeys.forEach((key) => {
        expect(locales).toContain(key);
      });
    });
  });

  describe('Type safety', () => {
    it('should enforce Locale type correctly', () => {
      const testLocale: Locale = 'en';
      expect(testLocale).toBe('en');
    });
  });
});
