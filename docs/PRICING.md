# Pricing Management Guide

This document explains how pricing works in the NERV Systems multilingual website and how to update it safely.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Current State](#current-state)
- [How to Update Pricing](#how-to-update-pricing)
- [Testing & Validation](#testing--validation)
- [Common Scenarios](#common-scenarios)
- [Troubleshooting](#troubleshooting)

---

## Architecture Overview

### Pricing is Stored in Translation Files

All pricing data is stored in JSON translation files, **not** in component code:

```
messages/
├── en.json     # English pricing (source of truth)
├── ja.json     # Japanese pricing
├── ko.json     # Korean pricing
└── th.json     # Thai pricing
```

### Two Pricing Sections

The website has pricing in two locations:

| Section | File Location | Description |
|---------|--------------|-------------|
| **Home Page** | `homeTakSolutions` | TAK Solutions section on homepage |
| **TAK Solutions Page** | `takSolutions.services` | Full pricing page at `/solutions/tak` |

Both sections exist in all 4 language files.

### Pricing Structure

Each section contains:

- **Hosting Plans**: Starter ($495), Professional ($1,495), Enterprise (Custom)
- **Deployment Packages**: Assessment ($4,500), Deployment ($15,000), Enterprise ($45,000+)
- **Training Programs**: Fundamentals ($595), NERVA ($795), Advanced ($1,495)
- **Additional Services**: System Admin ($450/mo), Plugins ($15k), Hardware (Contact)

---

## Current State

**All languages currently show IDENTICAL pricing in USD.**

This is intentional and enforced by automated tests. The architecture supports different pricing per language, but we haven't activated that yet.

### Why This Design?

**Current Goal**: Consistent pricing globally while we learn about markets

**Future Capability**: Easy to diverge pricing by region when ready

**Protection**: Tests catch accidental inconsistencies

---

## How to Update Pricing

### Scenario 1: Update Pricing for ALL Markets (Current Workflow)

**Example**: Increase Professional hosting from $1,495 to $1,995

#### Step 1: Update English File

Edit `/messages/en.json`:

```json
{
  "homeTakSolutions": {
    "hosting": {
      "plans": {
        "professional": {
          "price": "$1,995",   // ← Changed from $1,495
          ...
        }
      }
    }
  },
  "takSolutions": {
    "services": {
      "hosting": {
        "plans": {
          "professional": {
            "price": "$1,995",   // ← Changed here too
            ...
          }
        }
      }
    }
  }
}
```

#### Step 2: Update Other Language Files

Apply the **exact same change** to:
- `/messages/ja.json` (Japanese)
- `/messages/ko.json` (Korean)
- `/messages/th.json` (Thai)

**Important**: Use the same dollar amount. Don't translate "$1,995" to yen/won/baht.

#### Step 3: Run Tests

```bash
npm test
```

Look for:
```
PASS __tests__/i18n/pricing-consistency.test.ts
  ✓ should have identical hosting plan prices across all languages
  ✓ should have identical deployment package prices across all languages
  ✓ should have identical training program prices across all languages
```

#### Step 4: Commit & Push

```bash
git add messages/*.json
git commit -m "Update Professional hosting price to $1,995"
git push
```

---

### Scenario 2: Set Different Pricing Per Market (Future Use)

**Example**: Charge ¥149,000/month in Japan instead of $1,495

#### Step 1: Update Japanese File Only

Edit `/messages/ja.json`:

```json
{
  "homeTakSolutions": {
    "hosting": {
      "plans": {
        "professional": {
          "price": "¥149,000",   // ← Changed to yen
          "period": "/月",        // ← Changed to Japanese
          ...
        }
      }
    }
  }
}
```

#### Step 2: Tests Will Fail (Expected!)

```bash
npm test
```

You'll see:
```
FAIL __tests__/i18n/pricing-consistency.test.ts
  ✗ should have identical hosting plan prices across all languages

  Expected: ["$1,495"]
  Received: ["¥149,000"]
```

**This is intentional!** The test is catching that you've diverged pricing.

#### Step 3: Update Tests to Allow Market-Specific Pricing

Edit `__tests__/i18n/pricing-consistency.test.ts` and comment out or modify the relevant test:

```typescript
// Option A: Skip the test entirely
it.skip('should have identical hosting plan prices across all languages', () => {
  // Test disabled - we now use market-specific pricing
});

// Option B: Test each market separately
it('should have valid pricing format in each language', () => {
  // Custom validation per language
  expect(enMessages.homeTakSolutions.hosting.plans.professional.price).toBe('$1,495');
  expect(jaMessages.homeTakSolutions.hosting.plans.professional.price).toBe('¥149,000');
  // etc.
});
```

#### Step 4: Document the Change

Update this file (`docs/PRICING.md`) to reflect that pricing now varies by market.

---

## Testing & Validation

### Automated Tests

#### Pricing Consistency Test
**File**: `__tests__/i18n/pricing-consistency.test.ts`

**What it checks**:
- All languages have identical prices for each tier
- All pricing fields exist in all languages
- No missing price properties

**When it runs**: Every `npm test` or in CI/CD

#### Messages Structure Test
**File**: `__tests__/i18n/messages.test.ts`

**What it checks**:
- `homeTakSolutions` section exists in all languages
- No empty strings in translations
- No emoji in content (tactical/military aesthetic)

### Manual Testing

After changing prices, test the website:

```bash
npm run dev
```

Visit:
- `http://localhost:3000` (English home page)
- `http://localhost:3000/ja` (Japanese home page)
- `http://localhost:3000/ko` (Korean home page)
- `http://localhost:3000/th` (Thai home page)
- `http://localhost:3000/solutions/tak` (English TAK page)
- `http://localhost:3000/ja/solutions/tak` (Japanese TAK page)

**Check**:
- Prices display correctly
- Currency symbols render properly
- No layout breaks
- All CTAs work

---

## Common Scenarios

### Add a New Pricing Tier

**Example**: Add "Startup" tier at $295/month

#### 1. Add to English translations

Edit `messages/en.json`:

```json
{
  "homeTakSolutions": {
    "hosting": {
      "plans": {
        "startup": {                    // ← New tier
          "name": "Startup",
          "price": "$295",
          "period": "/month",
          "users": "Up to 25 users",
          "ai": "NERVA Lite (2 capabilities)",
          "features": [
            "Basic TAK Server",
            "Essential plugins",
            "98% uptime SLA",
            "Email support",
            "Quarterly security patches"
          ],
          "cta": "Get Started"
        },
        "starter": { ... },
        "professional": { ... },
        "enterprise": { ... }
      }
    }
  }
}
```

#### 2. Update component to include new tier

Edit `components/TAKSolutionsSection.tsx`:

```typescript
const hostingPlans = ['startup', 'starter', 'professional', 'enterprise'] as const;
//                     ↑ Added 'startup'
```

#### 3. Copy to all language files

Add identical structure to `ja.json`, `ko.json`, `th.json`

#### 4. Update tests

Edit `__tests__/i18n/pricing-consistency.test.ts`:

```typescript
it('should have identical hosting plan prices across all languages', () => {
  const hostingPlans = ['startup', 'starter', 'professional', 'enterprise'];
  //                     ↑ Added 'startup'
  ...
});
```

#### 5. Test and commit

```bash
npm test
npm run dev  # Manual testing
git add .
git commit -m "Add Startup hosting tier at $295/month"
git push
```

---

### Change Price Format

**Example**: Change "$495" to "$495.00" for consistency

Just update all instances in all language files:

```json
// Before
"price": "$495"

// After
"price": "$495.00"
```

Run tests to ensure consistency:
```bash
npm test
```

---

### Remove a Pricing Tier

**Example**: Remove "Enterprise" tier

#### 1. Remove from all translation files

Delete the `enterprise` object from all 4 language files.

#### 2. Update component arrays

Edit `components/TAKSolutionsSection.tsx`:

```typescript
// Before
const hostingPlans = ['starter', 'professional', 'enterprise'] as const;

// After
const hostingPlans = ['starter', 'professional'] as const;
```

#### 3. Update tests

Edit `__tests__/i18n/pricing-consistency.test.ts`:

```typescript
// Before
const plans = ['starter', 'professional', 'enterprise'];

// After
const plans = ['starter', 'professional'];
```

#### 4. Test thoroughly

```bash
npm test
npm run build  # Ensure no TypeScript errors
```

---

## Troubleshooting

### Test Failure: "expect(received).toEqual(expected)"

**Symptom**:
```
Expected: "$495"
Received: "$495.00"
```

**Cause**: Pricing is inconsistent across language files

**Fix**:
1. Find which language file has the wrong value
2. Update it to match the others
3. Run `npm test` again

---

### Test Failure: "Cannot read property 'price' of undefined"

**Symptom**:
```
TypeError: Cannot read property 'price' of undefined
```

**Cause**: A pricing tier exists in one language but not another

**Fix**:
1. Check which tier is missing (error will show the path)
2. Add the missing tier to all language files
3. Ensure structure matches exactly

---

### Website Shows "undefined" or Empty Price

**Symptom**: Website displays blank or "undefined" where price should be

**Cause**: Translation key mismatch between component and JSON

**Fix**:
1. Check component code: `t('hosting.plans.starter.price')`
2. Check JSON structure: `homeTakSolutions.hosting.plans.starter.price`
3. Ensure the path matches exactly (case-sensitive)

---

### Build Error: "Type 'readonly ["starter", "professional"]' is not assignable..."

**Symptom**: TypeScript compilation error

**Cause**: Component references a tier that doesn't exist in types

**Fix**:
1. Ensure all tiers in component array exist in JSON
2. Run `npm run build` to verify types

---

## File Reference

### Pricing Data Files

| File | Purpose |
|------|---------|
| `messages/en.json` | English pricing (source of truth) |
| `messages/ja.json` | Japanese pricing |
| `messages/ko.json` | Korean pricing |
| `messages/th.json` | Thai pricing |

### Component Files

| File | Purpose |
|------|---------|
| `components/TAKSolutionsSection.tsx` | Home page TAK section |
| `components/tak/TAKServicesSection.tsx` | TAK Solutions page services |
| `components/tak/TAKHeroSection.tsx` | TAK Solutions page hero |

### Test Files

| File | Purpose |
|------|---------|
| `__tests__/i18n/pricing-consistency.test.ts` | Enforces pricing consistency |
| `__tests__/i18n/messages.test.ts` | Validates translation structure |
| `__tests__/integration/locale-integration.test.tsx` | Tests locale switching |

---

## Quick Reference

### Update all markets to same price
1. Edit `messages/en.json`
2. Copy exact change to `ja.json`, `ko.json`, `th.json`
3. Run `npm test`
4. Commit & push

### Update one market to different price
1. Edit specific language file (e.g., `messages/ja.json`)
2. Expect tests to fail (this is OK!)
3. Update tests to allow divergence
4. Update this documentation
5. Commit & push

### Add new tier
1. Add to all 4 language files
2. Update component array
3. Update tests
4. Test manually
5. Commit & push

### Run tests
```bash
npm test                    # All tests
npm test pricing           # Just pricing tests
npm test -- --watch        # Watch mode
```

### Build and preview
```bash
npm run build              # Production build
npm run dev                # Development server
npm start                  # Production server
```

---

## Best Practices

1. **Always run tests** after changing pricing
2. **Update all language files** when changing structure (adding/removing tiers)
3. **Keep pricing consistent** across home page and TAK Solutions page
4. **Document divergences** if you enable market-specific pricing
5. **Test in browser** before deploying to production
6. **Use git branches** for pricing changes
7. **Review pricing in all 4 languages** before merging

---

## Questions or Issues?

- Check test output: `npm test -- --verbose`
- Review this documentation
- Check `__tests__/i18n/pricing-consistency.test.ts` for validation logic
- Verify JSON structure matches component expectations
