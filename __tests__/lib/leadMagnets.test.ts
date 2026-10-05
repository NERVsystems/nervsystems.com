import { getLeadMagnetUrl } from '@/lib/leadMagnets';

const BASE = 'https://nerv-lead-magnets.s3.us-east-1.amazonaws.com';
const CATEGORIES = ['ROI', 'COMPARISON', 'DEPLOYMENT', 'TECHNICAL', 'COMPLIANCE', 'OPERATIONS'];

describe('getLeadMagnetUrl', () => {
  it('resolves every resource category shown on the TAK page', () => {
    for (const category of CATEGORIES) {
      const url = getLeadMagnetUrl(category, 'en');
      // Compare the host prefix literally (no regex over the hostname), then
      // pattern-match only the path.
      expect(url?.startsWith(`${BASE}/`)).toBe(true);
      expect(url?.slice(BASE.length)).toMatch(/^\/[a-z-]+\/[a-z-]+\.pdf$/);
    }
  });

  it('serves the translated PDF when one exists', () => {
    expect(getLeadMagnetUrl('ROI', 'ja')).toBe(`${BASE}/roi-calculator/ja/tactical-ai-roi-calculator.pdf`);
    expect(getLeadMagnetUrl('OPERATIONS', 'sv')).toBe(`${BASE}/system-admin/sv/tak-system-admin-guide.pdf`);
  });

  it('falls back to English for locales without a translation', () => {
    const en = `${BASE}/apac-compliance/tak-apac-compliance-guide.pdf`;
    expect(getLeadMagnetUrl('COMPLIANCE', 'sv')).toBe(en);
    expect(getLeadMagnetUrl('COMPLIANCE', 'es')).toBe(en);
    expect(getLeadMagnetUrl('COMPLIANCE', 'uk')).toBe(en);
  });

  it('returns undefined for unknown categories', () => {
    expect(getLeadMagnetUrl('NOPE', 'en')).toBeUndefined();
  });
});
