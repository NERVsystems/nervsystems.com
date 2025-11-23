# Environment Variables Setup Guide

This guide walks you through setting up all required environment variables for the NERV Systems website.

## Quick Start

1. Copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` with your actual values
3. Never commit `.env.local` to version control (already in .gitignore)

---

## Google Analytics Setup

### Step 1: Create Google Analytics Property

1. Go to [Google Analytics](https://analytics.google.com)
2. Click **Admin** (gear icon, bottom left)
3. Under **Property**, click **Create Property**
4. Fill in details:
   - Property name: `NERV Systems`
   - Time zone: Your region
   - Currency: USD (or your preference)

### Step 2: Create Data Stream

1. After creating property, click **Data Streams**
2. Click **Add stream** > **Web**
3. Fill in:
   - Website URL: `https://www.nervsystems.com`
   - Stream name: `NERV Website`
4. Click **Create stream**

### Step 3: Get Measurement ID

1. You'll see your **Measurement ID** at the top right
2. Format: `G-XXXXXXXXXX` (always starts with "G-")
3. Copy this value to your `.env.local`:
   ```
   NEXT_PUBLIC_GA_ID=G-ABC123XYZ
   ```

### Step 4: Verify Tracking

1. After deploying with GA_ID set, visit your website
2. In Google Analytics, go to **Reports** > **Realtime**
3. You should see your visit appear within 30 seconds

---

## HubSpot Setup

### Prerequisites

- Active HubSpot account (Marketing Hub)
- Access to Forms and Settings

### Step 1: Get Portal ID

1. Log in to [HubSpot](https://app.hubspot.com)
2. Click **Settings** (gear icon, top right)
3. Navigate to **Account Setup** > **Account Defaults**
4. Find **HubSpot Account ID** (8-digit number)
5. Copy to `.env.local`:
   ```
   NEXT_PUBLIC_HUBSPOT_PORTAL_ID=12345678
   ```

### Step 2: Determine Your Region

Check your HubSpot URL:
- `app.hubspot.com` → Region: `na1`
- `app-na2.hubspot.com` → Region: `na2`
- `app-eu1.hubspot.com` → Region: `eu1`

Update `.env.local`:
```
NEXT_PUBLIC_HUBSPOT_REGION=na1
```

### Step 3: Create Forms in HubSpot

You need to create forms for each type of lead capture on the website.

#### A. Demo Request Form

1. In HubSpot, go to **Marketing** > **Forms**
2. Click **Create form** > **Embedded form**
3. Name: `NERV Demo Request`
4. Add fields:
   - First Name (required)
   - Last Name (required)
   - Email (required)
   - Company/Organization (required)
   - Phone Number
   - Job Title
   - Message/Interest Area
5. Click **Options** > **What should happen after someone submits this form?**
   - Select: Display thank you message
   - Message: "Thank you! We'll be in touch within 24 hours."
6. Click **Publish**

#### B. General Contact Form

1. Create another form: `NERV Contact`
2. Add fields:
   - First Name (required)
   - Last Name (required)
   - Email (required)
   - Organization
   - Phone Number
   - Message (required)
3. Publish

#### C. TAK Solutions Interest Form

1. Create form: `NERV TAK Solutions Interest`
2. Add fields:
   - Standard contact fields (name, email, org, phone)
   - Organization Type (dropdown: Military, Law Enforcement, Emergency Services, Other)
   - Current TAK Usage (text)
   - Estimated TAK Users (number)
   - TAK Deployment Timeline (dropdown: 0-3 months, 3-6 months, 6-12 months, 12+ months)
   - Service Interest (checkboxes: Hosting, Consulting, Training, NERVA Plugin)
3. Publish

### Step 4: Get Form IDs

For each form you created:

1. In HubSpot Forms list, click the form name
2. Click **Share** or **Embed** tab
3. You'll see JavaScript embed code like:
   ```html
   <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>
   <script>
     hbspt.forms.create({
       region: "na1",
       portalId: "12345678",
       formId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"  <-- THIS IS YOUR FORM ID
     });
   </script>
   ```
4. Copy the `formId` value (UUID format)
5. Add to `.env.local`:
   ```
   NEXT_PUBLIC_HUBSPOT_DEMO_FORM_ID=a1b2c3d4-e5f6-7890-abcd-ef1234567890
   NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID=b2c3d4e5-f6a7-8901-bcde-f12345678901
   NEXT_PUBLIC_HUBSPOT_TAK_FORM_ID=c3d4e5f6-a7b8-9012-cdef-123456789012
   ```

### Step 5: Configure Notifications

1. For each form, go to **Options** tab
2. Under **Send form notifications to**, add:
   - `contact@nervsystems.com`
3. Customize notification email subject and content
4. Save changes

### Step 6: Test Form Submissions

1. Deploy your site with environment variables set
2. Submit a test through each form
3. Verify:
   - Form submits successfully (success message appears)
   - Submission appears in HubSpot: **Marketing** > **Forms** > [Form Name] > **Submissions**
   - Notification email received
   - Contact created in HubSpot: **Contacts** > **Contacts**

---

## Deployment Platforms

### Vercel Deployment

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Go to **Settings** > **Environment Variables**
4. Add each variable:
   - Variable name: `NEXT_PUBLIC_GA_ID`
   - Value: Your actual value
   - Environments: Check all (Production, Preview, Development)
5. Click **Save**
6. Redeploy for changes to take effect

### Netlify Deployment

1. Import project in [Netlify](https://netlify.com)
2. Go to **Site settings** > **Build & deploy** > **Environment**
3. Click **Add a variable**
4. Add each NEXT_PUBLIC_* variable
5. Save and redeploy

### Other Platforms

For AWS Amplify, Railway, Render, etc., add environment variables through their respective dashboards. All variables must be available at build time since they start with `NEXT_PUBLIC_`.

---

## Local Development

### Option 1: Full Configuration

Create `.env.local` with all real values - use your actual HubSpot and GA accounts.

**Pros:** Test full functionality locally
**Cons:** Test data pollutes production analytics/CRM

### Option 2: Minimal Configuration

Create `.env.local` with minimal or dummy values:

```bash
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=
```

**Pros:** No pollution of production data
**Cons:** Forms fall back to mailto:, no analytics

### Option 3: Separate Dev Accounts

Create separate HubSpot and GA properties for development:
- GA Property: "NERV Systems - Dev"
- HubSpot Portal: Development account (free tier)

This is the recommended approach for teams.

---

## Security Best Practices

### Do's
- ✓ Keep `.env.local` out of version control (.gitignore)
- ✓ Use environment variables for all secrets
- ✓ Rotate credentials if accidentally committed
- ✓ Use separate credentials for dev/staging/prod
- ✓ Limit access to production credentials

### Don'ts
- ✗ Never commit `.env.local` to git
- ✗ Never share credentials in Slack/email
- ✗ Never hardcode credentials in source code
- ✗ Never use production credentials in development
- ✗ Never log environment variables to console

---

## Troubleshooting

### Forms Not Submitting

**Problem:** Form shows error or falls back to mailto:

**Solutions:**
1. Check browser console for errors
2. Verify `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` is correct (8 digits only)
3. Verify `NEXT_PUBLIC_HUBSPOT_REGION` matches your account
4. Verify form ID is correct UUID format
5. Check HubSpot form is published (not draft)
6. Verify domain is allowed in HubSpot form settings

### Analytics Not Tracking

**Problem:** No data in Google Analytics

**Solutions:**
1. Verify `NEXT_PUBLIC_GA_ID` format starts with "G-"
2. Check browser console for GA script errors
3. Disable ad blockers during testing
4. Wait 24-48 hours for data to appear (Realtime is instant)
5. Verify GA property is not filtered (filters can block traffic)
6. Check Analytics Debug mode: Install GA Debugger Chrome extension

### Environment Variables Not Updating

**Problem:** Changed .env.local but site still uses old values

**Solutions:**
1. **Local development:**
   - Stop dev server (Ctrl+C)
   - Restart: `npm run dev`
   - Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)

2. **Production (Vercel):**
   - Vercel caches environment variables at build time
   - After changing env vars, trigger a new deployment
   - Go to Deployments > [Latest] > ... > Redeploy

### Form ID Format Issues

**Problem:** Form ID doesn't work

**Correct format:**
```
NEXT_PUBLIC_HUBSPOT_DEMO_FORM_ID=a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

**Common mistakes:**
- Missing dashes: `a1b2c3d4e5f678...` ✗
- With quotes: `"a1b2c3d4-e5f6..."` ✗
- Extra spaces: ` a1b2c3d4-e5f6... ` ✗
- Portal ID instead of Form ID ✗

---

## Verification Checklist

Before deploying to production:

- [ ] `.env.local` created locally and contains all required variables
- [ ] Google Analytics property created and Measurement ID obtained
- [ ] HubSpot Portal ID verified (8 digits)
- [ ] HubSpot region confirmed (na1, na2, eu1, etc.)
- [ ] All necessary HubSpot forms created and published
- [ ] All HubSpot Form IDs obtained and added to `.env.local`
- [ ] Form notification emails configured to contact@nervsystems.com
- [ ] Local testing completed - forms submit successfully
- [ ] Local testing completed - analytics appear in GA Realtime
- [ ] Environment variables configured in production hosting platform
- [ ] Production deployment tested - forms work
- [ ] Production deployment tested - analytics tracking
- [ ] HubSpot submissions reviewed - data captured correctly
- [ ] Email notifications received from form submissions

---

## Support

If you encounter issues not covered in this guide:

1. Check Next.js environment variables docs: https://nextjs.org/docs/basic-features/environment-variables
2. Check HubSpot Forms API docs: https://developers.hubspot.com/docs/api/marketing/forms
3. Check Google Analytics setup docs: https://support.google.com/analytics/answer/9304153

For NERV Systems specific questions, contact: dev@nervsystems.com
