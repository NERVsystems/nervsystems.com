# NERV Systems Website - Setup Instructions

## Google Analytics Setup

### Finding Your GA ID from the Old Site

1. Go to https://www.nervsystems.com
2. Right-click → "View Page Source"
3. Search for one of these:
   - `gtag('config', 'G-` → Your ID looks like `G-XXXXXXXXXX`
   - `analytics.js` → Look for measurement ID
   - `gtm.js` → Look for GTM-XXXXXXX

### Adding GA ID to the New Site

1. Create a file called `.env.local` in the project root (same folder as package.json)
2. Add this line (replace with your actual GA ID):
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
3. Restart the dev server (`npm run dev`)

**Note:** `.env.local` is automatically ignored by git (for security)

## Forms Setup

### Current Setup (Temporary)
- Forms use `mailto:` links to send data to contact@nervsystems.com
- Opens user's default email client
- Simple, but not ideal for tracking

### Recommended: HubSpot Integration (Next Step)

1. Sign up for free at: https://www.hubspot.com/products/get-started
2. Create a form in HubSpot
3. Get the form embed code or API endpoint
4. Replace the `handleSubmit` function in `components/RequestDemoForm.tsx`

**Benefits:**
- Track all leads in one place
- Automatic email notifications
- Lead scoring and follow-up workflows
- Free forever for basic features

### Alternative: Formspree (Quick Setup)

1. Sign up at: https://formspree.io
2. Create a form endpoint
3. Update form action to POST to Formspree URL

## Environment Variables for Production (Vercel)

1. Go to Vercel dashboard → Your project → Settings → Environment Variables
2. Add: `NEXT_PUBLIC_GA_ID` with your GA tracking ID
3. Redeploy

## Testing

```bash
# Development
npm run dev

# Build (test before deploying)
npm run build

# Production
npm start
```

## Forms Currently Implemented

All these buttons now open the request form:
- Hero section: "Request Demo"
- NERVA section: "See NERVA in Action"
- TAK Solutions: "Get Started" (all pricing tiers)
- TAK Consulting: "Request Quote"
- Training: "Enroll Now"

## Next Steps

1. Get your GA ID from old site
2. Add it to `.env.local`
3. Sign up for HubSpot (or chosen CRM)
4. Integrate HubSpot forms
5. Test form submissions
6. Set up GA goals/conversions
