// Lead magnet PDFs are built from github.com/NERVsystems/marketing-lead-magnets
// and deployed to S3 (see HUBSPOT_URLS.md in that repo).
const BASE_URL = 'https://nerv-lead-magnets.s3.us-east-1.amazonaws.com';

const documents: Record<string, { dir: string; file: string; locales: string[] }> = {
  ROI: { dir: 'roi-calculator', file: 'tactical-ai-roi-calculator', locales: ['ar', 'ja', 'ko', 'th', 'sv'] },
  COMPARISON: { dir: 'tak-vs-commercial', file: 'tak-vs-commercial-comparison', locales: ['ar', 'ja', 'ko', 'th', 'sv'] },
  DEPLOYMENT: { dir: 'deployment-checklist', file: 'tak-deployment-checklist', locales: ['ar', 'ja', 'ko', 'th', 'sv'] },
  TECHNICAL: { dir: 'nerva-architecture', file: 'nerva-architecture-guide', locales: ['ar', 'ja', 'ko', 'th', 'sv'] },
  COMPLIANCE: { dir: 'apac-compliance', file: 'tak-apac-compliance-guide', locales: ['ar', 'ja', 'ko', 'th'] },
  OPERATIONS: { dir: 'system-admin', file: 'tak-system-admin-guide', locales: ['ar', 'ja', 'ko', 'th', 'sv'] },
};

export function getLeadMagnetUrl(category: string, locale: string): string | undefined {
  const doc = documents[category];
  if (!doc) return undefined;
  const langPath = doc.locales.includes(locale) ? `${locale}/` : '';
  return `${BASE_URL}/${doc.dir}/${langPath}${doc.file}.pdf`;
}
