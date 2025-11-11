# Sentry Error Tracking Setup

This project uses [Sentry](https://sentry.io) for comprehensive error tracking, performance monitoring, and user session replay.

## What's Been Configured

- **Client-side error tracking** - Catches errors in browser
- **Server-side error tracking** - Catches errors in API routes and server components
- **Edge runtime error tracking** - Catches errors in middleware
- **Session Replay** - Records user sessions when errors occur (privacy-safe)
- **Performance Monitoring** - Tracks application performance metrics
- **Custom Error Pages** - Tactical-themed error boundaries matching NERV brand
- **Error Tunneling** - Routes errors through `/monitoring` to bypass ad-blockers

## Setup Instructions

### 1. Create a Sentry Account

1. Sign up at [sentry.io](https://sentry.io)
2. Create a new project and select **Next.js** as the platform
3. Copy your **DSN** (Data Source Name) - looks like: `https://xxxxx@xxxxx.ingest.sentry.io/xxxxx`

### 2. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and update with your Sentry credentials:

```bash
cp .env.local.example .env.local
```

Required environment variables:

```bash
# Required - Get this from your Sentry project settings
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/your-project-id
```

Optional (for source map uploads):

```bash
# Optional - Only needed if you want to upload source maps to Sentry
SENTRY_ORG=your-sentry-org-slug
SENTRY_PROJECT=your-sentry-project-slug
SENTRY_AUTH_TOKEN=your-sentry-auth-token
```

### 3. Test the Setup

#### Local Testing

Start the development server:

```bash
npm run dev
```

#### Test Error Tracking

Create a test error by adding this to any page:

```tsx
<button onClick={() => { throw new Error('Test error') }}>
  Trigger Test Error
</button>
```

Click the button and check your Sentry dashboard - the error should appear within seconds.

#### Test Error Pages

- Visit a non-existent page (e.g., `/test-404`) to see the custom 404 page
- The error boundaries will catch and report any runtime errors

### 4. Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add the `NEXT_PUBLIC_SENTRY_DSN` to your deployment environment variables
2. Optionally add `SENTRY_ORG`, `SENTRY_PROJECT`, and `SENTRY_AUTH_TOKEN` for source map uploads
3. Build and deploy as normal

Sentry will automatically:
- Capture all unhandled errors
- Record performance metrics
- Create session replays when errors occur
- Send notifications based on your Sentry alert rules

## Features Enabled

### Error Tracking
- **Client errors**: Browser JavaScript errors, unhandled promise rejections
- **Server errors**: API route errors, server component errors
- **Edge errors**: Middleware and edge function errors

### Session Replay
- Records sessions when errors occur (100% of error sessions)
- Samples 10% of normal sessions for analysis
- Privacy-safe: Masks all text and blocks all media by default

### Performance Monitoring
- 100% transaction sampling (adjust in production as needed)
- Automatic performance tracking for pages and API routes

### Smart Error Filtering
Pre-configured to ignore common non-actionable errors:
- Browser extension errors
- Third-party plugin errors
- Common network failures

## Configuration Files

- `sentry.client.config.ts` - Client-side Sentry configuration
- `sentry.server.config.ts` - Server-side Sentry configuration
- `sentry.edge.config.ts` - Edge runtime Sentry configuration
- `instrumentation.ts` - Next.js instrumentation hook
- `app/error.tsx` - Client error boundary
- `app/global-error.tsx` - Root error boundary
- `app/not-found.tsx` - Custom 404 page
- `next.config.ts` - Sentry webpack plugin configuration

## Customization

### Adjust Sample Rates

In `sentry.client.config.ts`:

```typescript
// Performance monitoring - Lower in production to reduce quota usage
tracesSampleRate: 1.0, // 100% in dev, consider 0.1 (10%) in prod

// Session replay
replaysOnErrorSampleRate: 1.0, // 100% of error sessions
replaysSessionSampleRate: 0.1, // 10% of normal sessions
```

### Environment Detection

Sentry automatically detects the environment:
- Uses `NEXT_PUBLIC_VERCEL_ENV` on Vercel (production, preview, development)
- Falls back to `NODE_ENV` for other platforms

### Source Maps

Source maps are:
- Hidden from client bundles for security
- Optionally uploaded to Sentry for better stack traces (requires auth token)

## Monitoring & Alerts

Access your Sentry dashboard to:
- View real-time errors as they occur
- Watch session replays to understand user context
- Set up custom alerts (email, Slack, PagerDuty, etc.)
- Track error trends and performance metrics
- Identify problematic releases

## Support

- [Sentry Next.js Docs](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Sentry Dashboard](https://sentry.io)
- [Session Replay](https://docs.sentry.io/product/session-replay/)
- [Performance Monitoring](https://docs.sentry.io/product/performance/)

## Cost Considerations

Sentry offers:
- **Free tier**: 5,000 errors/month, 50 replays/month
- **Team tier**: $26/month - 50,000 errors, 500 replays
- **Business tier**: Custom pricing for high-volume applications

Start with the free tier and upgrade as needed. Adjust sample rates to control quota usage.
