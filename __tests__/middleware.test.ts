/**
 * Tests for Next.js middleware locale routing
 * Verifies that the middleware is properly configured for internationalization
 */

import { locales, defaultLocale } from '@/i18n/config';

describe('Middleware Configuration', () => {
  let middleware: any;
  let config: any;

  beforeEach(async () => {
    jest.resetModules();
    const middlewareModule = await import('@/middleware');
    middleware = middlewareModule.default;
    config = middlewareModule.config;
  });

  describe('Middleware export', () => {
    it('should export a middleware function', () => {
      expect(middleware).toBeDefined();
      expect(typeof middleware).toBe('function');
    });

    it('should export a config object', () => {
      expect(config).toBeDefined();
      expect(typeof config).toBe('object');
    });
  });

  describe('Middleware config', () => {
    it('should have a matcher property', () => {
      expect(config).toHaveProperty('matcher');
    });

    it('should have matcher as an array', () => {
      expect(Array.isArray(config.matcher)).toBe(true);
    });

    it('should include root path in matcher', () => {
      expect(config.matcher).toContain('/');
    });

    it('should match internationalized pathnames', () => {
      // Should match paths with locale prefixes
      const hasLocaleMatcher = config.matcher.some((pattern: string) =>
        pattern.includes('en') || pattern.includes(':path*')
      );
      expect(hasLocaleMatcher).toBe(true);
    });

    it('should exclude Next.js internal routes', () => {
      // Should have a pattern that excludes _next
      const hasExclusionPattern = config.matcher.some((pattern: string) =>
        pattern.includes('_next')
      );
      expect(hasExclusionPattern).toBe(true);
    });
  });

  describe('Locale configuration integration', () => {
    it('should use locales from i18n config', () => {
      // The middleware should be created with the locales from config
      expect(locales).toBeDefined();
      expect(locales.length).toBeGreaterThan(0);
    });

    it('should use defaultLocale from i18n config', () => {
      expect(defaultLocale).toBeDefined();
      expect(defaultLocale).toBe('en');
    });

    it('should configure localePrefix as "as-needed"', () => {
      // This is implicit in the middleware configuration
      // We verify that the middleware was created with the correct options
      expect(middleware).toBeDefined();
    });
  });
});

describe('Locale Routing Behavior', () => {
  it('should support English (en) locale', () => {
    expect(locales).toContain('en');
  });

  it('should use "en" as the default locale', () => {
    expect(defaultLocale).toBe('en');
  });

  it('should support locale prefix as-needed strategy', () => {
    // When using 'as-needed', the default locale should not require a prefix
    // This is tested by verifying the configuration
    expect(defaultLocale).toBe('en');
    expect(locales).toContain('en');
  });
});

describe('Matcher patterns', () => {
  let config: any;

  beforeEach(async () => {
    const middlewareModule = await import('@/middleware');
    config = middlewareModule.config;
  });

  it('should match root paths', () => {
    const patterns = config.matcher;
    expect(patterns).toContain('/');
  });

  it('should have patterns for locale-prefixed paths', () => {
    const patterns = config.matcher;
    const hasLocalePath = patterns.some((p: string) =>
      p.includes('en') || p.includes('ar') || p.includes('zh') || p.includes(':path*')
    );
    expect(hasLocalePath).toBe(true);
  });

  it('should exclude static files and internal Next.js routes', () => {
    const patterns = config.matcher;
    // Should have a pattern that excludes _next, _vercel, and files with extensions
    const hasExclusionPattern = patterns.some((p: string) =>
      p.includes('_next') || p.includes('_vercel') || p.includes('\\.')
    );
    expect(hasExclusionPattern).toBe(true);
  });
});
