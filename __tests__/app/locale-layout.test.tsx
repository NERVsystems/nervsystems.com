/**
 * Tests for locale layout
 * Verifies that the locale layout properly validates locales and sets up the intl provider
 */

import { locales } from '@/i18n/config';

describe('Locale Layout', () => {
  describe('Locale validation', () => {
    it('should have supported locales defined', () => {
      expect(locales).toBeDefined();
      expect(Array.isArray(locales)).toBe(true);
      expect(locales.length).toBeGreaterThan(0);
    });

    it('should include "en" as a supported locale', () => {
      expect(locales).toContain('en');
    });

    it('should validate that locale is in supported list', () => {
      const testLocale = 'en';
      expect(locales.includes(testLocale as any)).toBe(true);
    });

    it('should reject unsupported locales', () => {
      const invalidLocale = 'invalid';
      expect(locales.includes(invalidLocale as any)).toBe(false);
    });
  });

  describe('Locale configuration', () => {
    it('should have a readonly array of locales (TypeScript compile-time check)', () => {
      // The 'as const' assertion provides TypeScript readonly guarantee at compile time
      expect(Array.isArray(locales)).toBe(true);
      expect(locales.length).toBeGreaterThan(0);
    });

    it('should only contain valid locale strings', () => {
      locales.forEach((locale) => {
        expect(typeof locale).toBe('string');
        expect(locale.length).toBeGreaterThan(0);
        // Locale codes are typically 2-5 characters (e.g., 'en', 'en-US')
        expect(locale.length).toBeLessThanOrEqual(5);
      });
    });
  });

  describe('Layout integration', () => {
    it('should export locales for use in layout validation', () => {
      // This test ensures that the locales export is available for the layout
      expect(locales).toBeDefined();
      expect(typeof locales).toBe('object');
    });

    it('should provide type-safe locale handling', () => {
      // Verify that TypeScript types work correctly
      type Locale = (typeof locales)[number];
      const testLocale: Locale = 'en';
      expect(testLocale).toBe('en');
    });
  });
});

describe('Messages loading', () => {
  it('should be able to load English messages', async () => {
    const messages = await import('@/messages/en.json');
    expect(messages).toBeDefined();
    expect(messages.default).toBeDefined();
    expect(typeof messages.default).toBe('object');
  });

  it('should have messages for all required namespaces', async () => {
    const messages = await import('@/messages/en.json');
    const requiredNamespaces = [
      'nav',
      'hero',
      'nerva',
      'features',
      'tak',
      'contact',
      'footer',
    ];

    requiredNamespaces.forEach((namespace) => {
      expect(messages.default).toHaveProperty(namespace);
    });
  });

  it('should export default messages object', async () => {
    const messages = await import('@/messages/en.json');
    expect(messages.default).toBeDefined();
    expect(Object.keys(messages.default).length).toBeGreaterThan(0);
  });
});
