/**
 * Tests for i18n request configuration
 * Verifies that the request configuration module is properly structured
 */

import { locales } from '@/i18n/config';

describe('i18n Request Configuration', () => {
  it('should export a default configuration', async () => {
    const config = await import('@/i18n/request');
    expect(config.default).toBeDefined();
  });

  it('should be able to import the request module', () => {
    expect(() => require('@/i18n/request')).not.toThrow();
  });

  it('should use supported locales from config', () => {
    expect(locales).toBeDefined();
    expect(locales).toContain('en');
  });

  it('should have messages available for all supported locales', async () => {
    for (const locale of locales) {
      const messages = await import(`@/messages/${locale}.json`);
      expect(messages.default).toBeDefined();
      expect(typeof messages.default).toBe('object');
      expect(Object.keys(messages.default).length).toBeGreaterThan(0);
    }
  });

  it('should have English messages with required structure', async () => {
    const messages = await import('@/messages/en.json');
    const requiredNamespaces = ['nav', 'hero', 'nerva', 'features', 'tak', 'contact', 'footer'];

    requiredNamespaces.forEach((namespace) => {
      expect(messages.default).toHaveProperty(namespace);
    });
  });
});
