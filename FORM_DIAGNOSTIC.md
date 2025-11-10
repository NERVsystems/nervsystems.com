# HubSpot Form Submission Diagnostic Guide

## Issue
Forms are triggering `mailto` fallback instead of submitting to HubSpot in production (Vercel).

## Most Likely Root Cause
**Environment variables are not configured in Vercel.** The `.env.local` file is git-ignored and only works locally. Production deployments need environment variables manually configured in Vercel.

## How to Diagnose

### 1. Check Browser Console
When you submit a form, open your browser's Developer Tools (F12) and check the Console tab. You should see logs prefixed with `[RequestDemoForm]`:

**If env vars are missing**, you'll see:
```
[RequestDemoForm] Form submission started
[RequestDemoForm] Form Type: demo
[RequestDemoForm] Portal ID: MISSING
[RequestDemoForm] Form ID (prop): NOT PROVIDED
[RequestDemoForm] Form ID (env): MISSING
[RequestDemoForm] Final Form ID: MISSING
[RequestDemoForm] Missing HubSpot configuration - falling back to mailto
```

**If env vars are present**, you'll see:
```
[RequestDemoForm] Form submission started
[RequestDemoForm] Form Type: demo
[RequestDemoForm] Portal ID: 244297257 (SET)
[RequestDemoForm] Form ID (prop): 3d79ce6c-c0f2-4f49-880e-17e65a9a77d1 (SET)
[RequestDemoForm] Final Form ID: 3d79ce6c-c0f2-4f49-880e-17e65a9a77d1 (SET)
[RequestDemoForm] Submitting to HubSpot API
[RequestDemoForm] API URL: https://api.hsforms.com/submissions/v3/integration/submit/244297257/3d79ce6c-c0f2-4f49-880e-17e65a9a77d1
[RequestDemoForm] Payload: { ... }
[RequestDemoForm] Response status: 200
[RequestDemoForm] Response ok: true
[RequestDemoForm] Submission successful!
```

### 2. Test Locally First
Run the development server locally:
```bash
npm run dev
```

Then test form submission at http://localhost:3000. If it works locally but fails in production, that confirms the env vars are missing from Vercel.

## How to Fix

### Configure Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables (copy from `.env.local`):

```
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=244297257
NEXT_PUBLIC_HUBSPOT_REGION=na2
NEXT_PUBLIC_HUBSPOT_FORM_ID=0a5d623e-ea53-4e47-9f46-3ab5203540d6
NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID=1a7c3b50-4df4-4b3e-ac7a-99937b52415b
NEXT_PUBLIC_HUBSPOT_DEMO_FORM_ID=3d79ce6c-c0f2-4f49-880e-17e65a9a77d1
NEXT_PUBLIC_HUBSPOT_TAK_FORM_ID=5a530610-cd88-496a-b44b-a5baaccb94a2
NEXT_PUBLIC_HUBSPOT_RESOURCE_FORM_ID=5421c5dd-9cfb-4a89-bc06-6681300dca8e
NEXT_PUBLIC_GA_ID=G-EQFXGGV7M4
```

4. Make sure to add these for **Production**, **Preview**, and **Development** environments
5. Redeploy the application (or Vercel will auto-deploy after saving)

## Expected Form Flows

### Demo Request Form
- Form ID: `NEXT_PUBLIC_HUBSPOT_DEMO_FORM_ID`
- Fields: firstname, lastname, email, company, jobtitle, use_case, message

### TAK Service Interest Form
- Form ID: `NEXT_PUBLIC_HUBSPOT_TAK_FORM_ID`
- Fields: firstname, lastname, email, company, phone, organisation_type, tak_interest_type, estimated_tak_users, tak_deployment_timeline, message

### General Contact Form
- Form ID: `NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID`
- Fields: firstname, lastname, email, company, phone, enquiry_type, message

### Resource Download Form
- Form ID: `NEXT_PUBLIC_HUBSPOT_RESOURCE_FORM_ID`
- Fields: firstname, lastname, email, name (company), jobtitle, resource_requested, current_stage

## Testing Checklist

After configuring env vars and redeploying:

- [ ] Test "Request Demo" button in navigation (TacticalNav)
- [ ] Test "Request Demo" button in HeroSection
- [ ] Test "Get Started" button in NERVASection
- [ ] Test "Request Quote" in TAKServicesSection
- [ ] Test "Request Quote" in TAKSolutionsSection
- [ ] Test "Contact Us" in ContactSection
- [ ] Test resource downloads in TAKResourcesSection (6 different resources)

Each should:
1. Show detailed console logs
2. Submit to HubSpot (no mailto popup)
3. Show success message
4. Appear in HubSpot dashboard

## Verifying the Fix

Once env vars are configured:
1. Open production site in incognito window (to avoid caching)
2. Open Developer Tools → Console tab
3. Click "Request Demo"
4. Fill out and submit form
5. Check console logs - should show successful API submission
6. Check HubSpot dashboard - submission should appear

## Additional Notes

- All environment variable names MUST start with `NEXT_PUBLIC_` to be accessible in browser
- Changes to environment variables require a redeploy
- The `.env.local` file should never be committed to git (it's in .gitignore)
- Forms fall back to mailto gracefully if HubSpot is unavailable (by design)
