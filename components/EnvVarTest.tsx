'use client';

/**
 * Environment Variable Test Component
 *
 * This component displays the status of all environment variables needed for HubSpot forms.
 * Use this to quickly verify if env vars are properly configured in your deployment.
 *
 * To use: Add <EnvVarTest /> to any page temporarily, then remove after testing.
 */
export default function EnvVarTest() {
  const envVars = {
    'NEXT_PUBLIC_HUBSPOT_PORTAL_ID': process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID,
    'NEXT_PUBLIC_HUBSPOT_REGION': process.env.NEXT_PUBLIC_HUBSPOT_REGION,
    'NEXT_PUBLIC_HUBSPOT_FORM_ID': process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID,
    'NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID': process.env.NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID,
    'NEXT_PUBLIC_HUBSPOT_DEMO_FORM_ID': process.env.NEXT_PUBLIC_HUBSPOT_DEMO_FORM_ID,
    'NEXT_PUBLIC_HUBSPOT_TAK_FORM_ID': process.env.NEXT_PUBLIC_HUBSPOT_TAK_FORM_ID,
    'NEXT_PUBLIC_HUBSPOT_RESOURCE_FORM_ID': process.env.NEXT_PUBLIC_HUBSPOT_RESOURCE_FORM_ID,
    'NEXT_PUBLIC_GA_ID': process.env.NEXT_PUBLIC_GA_ID,
  };

  const allConfigured = Object.values(envVars).every(val => !!val);

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 border border-white/20 p-4 rounded text-xs font-mono text-white max-w-md z-50">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold">Environment Variables Test</h3>
        <div className={`px-2 py-1 rounded text-xs ${allConfigured ? 'bg-green-500' : 'bg-red-500'}`}>
          {allConfigured ? 'ALL OK' : 'MISSING'}
        </div>
      </div>
      <div className="space-y-1 max-h-64 overflow-y-auto">
        {Object.entries(envVars).map(([key, value]) => (
          <div key={key} className="flex items-start justify-between gap-2 border-t border-white/10 pt-1">
            <span className="text-tactical-textDim truncate flex-1">{key}:</span>
            <span className={value ? 'text-green-400' : 'text-red-400'}>
              {value ? '✓ SET' : '✗ MISSING'}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 pt-2 border-t border-white/10 text-tactical-textDim">
        {allConfigured
          ? 'All environment variables are configured correctly.'
          : 'Some environment variables are missing. Check Vercel settings.'}
      </div>
    </div>
  );
}
