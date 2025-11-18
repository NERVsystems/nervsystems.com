# Testing Guide for Multilingual Pricing

This document explains the testing infrastructure for pricing consistency and how to work with the tests.

## Table of Contents

- [Test Overview](#test-overview)
- [Test Files](#test-files)
- [Running Tests](#running-tests)
- [Understanding Test Output](#understanding-test-output)
- [Modifying Tests](#modifying-tests)
- [Writing New Tests](#writing-new-tests)

---

## Test Overview

### What We Test

The testing infrastructure validates:

1. **Pricing Consistency**: All languages have identical prices
2. **Structure Completeness**: All pricing sections exist in all languages
3. **Translation Integrity**: No empty strings, no emoji, all required fields present
4. **Type Safety**: TypeScript compilation ensures correct property access

### Why These Tests Matter

**Without tests**:
- Easy to forget updating a language file
- Inconsistent pricing across markets (unintentional)
- Missing translations break the website
- Changes could go unnoticed until production

**With tests**:
- Instant feedback on inconsistencies
- Confidence when making changes
- Documentation of expected structure
- Prevents deployment of broken translations

---

## Test Files

### 1. Pricing Consistency Tests
**File**: `__tests__/i18n/pricing-consistency.test.ts`

**Purpose**: Ensure all languages have identical pricing

**What it tests**:

```typescript
// Home page pricing
✓ homeTakSolutions.hosting.plans.[starter|professional|enterprise].price
✓ homeTakSolutions.deployment.packages.[assessment|deployment|enterprise].price
✓ homeTakSolutions.training.programs.[fundamentals|nerva|advanced].price
✓ homeTakSolutions.additionalServices.services.[administration|plugins|hardware].price

// TAK Solutions page pricing
✓ takSolutions.services.hosting.plans.[starter|professional|enterprise].price
✓ takSolutions.services.deployment.plans.[assessment|deployment|enterprise].price
✓ takSolutions.services.training.programs.[fundamentals|nerva|advanced].price

// Structure completeness
✓ All sections exist in all languages
✓ All plans/packages/programs exist in all languages
✓ All prices are defined (not undefined/null)
```

**Test count**: 10 tests

---

### 2. Message Structure Tests
**File**: `__tests__/i18n/messages.test.ts`

**Purpose**: Validate translation file structure and content

**What it tests**:

```typescript
✓ en.json loads successfully
✓ All required top-level sections exist (nav, hero, nerva, features, tak, takCallout, homeTakSolutions, partners, contact, footer, takSolutions)
✓ Navigation items are complete and non-empty
✓ Hero section has title, subtitle, stats, CTAs
✓ No empty strings anywhere in translations
✓ No emoji in any translations (tactical/military requirement)
```

**Test count**: 100+ tests

---

### 3. Integration Tests
**File**: `__tests__/integration/locale-integration.test.tsx`

**Purpose**: Test locale switching and routing

**What it tests**:

```typescript
✓ Locale provider wraps components correctly
✓ Translations load for each locale
✓ Locale switching works
✓ URL routing handles locales properly
```

**Test count**: 5+ tests

---

## Running Tests

### All Tests

```bash
npm test
```

**Output**:
```
PASS __tests__/i18n/config.test.ts
PASS __tests__/i18n/messages.test.ts
PASS __tests__/i18n/pricing-consistency.test.ts
PASS __tests__/integration/locale-integration.test.tsx
PASS __tests__/components/TacticalNav.test.tsx
PASS __tests__/components/HeroSection.test.tsx

Test Suites: 9 passed, 9 total
Tests:       118 passed, 118 total
Snapshots:   0 total
Time:        7.551 s
```

---

### Specific Test File

```bash
npm test pricing-consistency
```

Runs only pricing tests.

---

### Watch Mode

```bash
npm test -- --watch
```

Re-runs tests automatically when files change.

---

### Verbose Output

```bash
npm test -- --verbose
```

Shows all test names and detailed output.

---

### Coverage Report

```bash
npm test:coverage
```

Generates HTML coverage report in `coverage/` directory.

---

## Understanding Test Output

### Successful Test Run

```
PASS __tests__/i18n/pricing-consistency.test.ts
  Pricing Consistency Across Languages
    Home TAK Solutions Pricing
      ✓ should have identical hosting plan prices across all languages (3 ms)
      ✓ should have identical deployment package prices across all languages (1 ms)
      ✓ should have identical training program prices across all languages (1 ms)
      ✓ should have identical additional service prices across all languages (1 ms)
    TAK Solutions Page Pricing
      ✓ should have identical TAK hosting plan prices across all languages (2 ms)
      ✓ should have identical TAK deployment plan prices across all languages (1 ms)
      ✓ should have identical TAK training program prices across all languages (1 ms)
    Pricing Structure Completeness
      ✓ should have homeTakSolutions section in all languages (1 ms)
      ✓ should have all hosting plans in homeTakSolutions for all languages (2 ms)
      ✓ should have all deployment packages in homeTakSolutions for all languages (1 ms)
```

**Meaning**: All prices match across all languages ✅

---

### Failed Test - Inconsistent Pricing

```
FAIL __tests__/i18n/pricing-consistency.test.ts
  ✗ should have identical hosting plan prices across all languages

  expect(received).toEqual(expected) // deep equality

  - Expected  - 1
  + Received  + 1

    Array [
      "$495",
      "$1,495",
  -   "Custom",
  +   "カスタム",
    ]

    at toEqual (__tests__/i18n/pricing-consistency.test.ts:83:24)
```

**Meaning**: Japanese file has "カスタム" instead of "Custom"

**Fix**: Edit `messages/ja.json` and change the price to "Custom"

---

### Failed Test - Missing Field

```
FAIL __tests__/i18n/pricing-consistency.test.ts
  ✗ should have all hosting plans in homeTakSolutions for all languages

  TypeError: Cannot read property 'price' of undefined
      at Object.<anonymous> (__tests__/i18n/pricing-consistency.test.ts:125:89)
```

**Meaning**: A pricing tier is missing from one of the language files

**Fix**: Add the missing tier to all language files

---

### Failed Test - Empty String

```
FAIL __tests__/i18n/messages.test.ts
  ✗ should not contain any empty strings

  expect(received).toEqual(expected) // deep equality

  Expected: []
  Received: ["homeTakSolutions.hosting.plans.starter.cta"]
```

**Meaning**: The `cta` field in starter plan is an empty string

**Fix**: Add text to that field in the JSON file

---

## Modifying Tests

### Scenario: Allow Market-Specific Pricing

If you want Japanese pricing to be different from US pricing, you need to update the tests.

**Original test** (enforces consistency):

```typescript
it('should have identical hosting plan prices across all languages', () => {
  const hostingPlans = ['starter', 'professional', 'enterprise'];
  const enPrices = hostingPlans.map(
    (plan) => enMessages.homeTakSolutions.hosting.plans[plan].price
  );

  locales.forEach(({ name, messages }) => {
    const prices = hostingPlans.map(
      (plan) => messages.homeTakSolutions.hosting.plans[plan].price
    );
    expect(prices).toEqual(enPrices);  // ← This enforces consistency
  });
});
```

**Modified test** (allows divergence):

```typescript
it('should have valid pricing format in each language', () => {
  const hostingPlans = ['starter', 'professional', 'enterprise'];

  // Test each language individually
  expect(enMessages.homeTakSolutions.hosting.plans.starter.price).toBe('$495');
  expect(enMessages.homeTakSolutions.hosting.plans.professional.price).toBe('$1,495');
  expect(enMessages.homeTakSolutions.hosting.plans.enterprise.price).toBe('Custom');

  expect(jaMessages.homeTakSolutions.hosting.plans.starter.price).toBe('¥49,500');
  expect(jaMessages.homeTakSolutions.hosting.plans.professional.price).toBe('¥149,000');
  expect(jaMessages.homeTakSolutions.hosting.plans.enterprise.price).toBe('カスタム');

  // Korean and Thai can have their own prices too
  expect(koMessages.homeTakSolutions.hosting.plans.starter.price).toBe('₩550,000');
  expect(thMessages.homeTakSolutions.hosting.plans.starter.price).toBe('฿16,000');
});
```

---

### Scenario: Add New Pricing Tier

When adding a new tier (e.g., "Startup"), update the test arrays:

**Before**:
```typescript
const hostingPlans = ['starter', 'professional', 'enterprise'];
```

**After**:
```typescript
const hostingPlans = ['startup', 'starter', 'professional', 'enterprise'];
```

The test will automatically check the new tier exists in all languages.

---

### Scenario: Remove Pricing Tier

When removing a tier, update the test arrays:

**Before**:
```typescript
const hostingPlans = ['starter', 'professional', 'enterprise'];
```

**After**:
```typescript
const hostingPlans = ['starter', 'professional'];
```

---

### Scenario: Skip a Specific Test

If you want to temporarily disable a test:

```typescript
it.skip('should have identical hosting plan prices across all languages', () => {
  // Test skipped
});
```

Or only run one test:

```typescript
it.only('should have identical hosting plan prices across all languages', () => {
  // Only this test runs
});
```

---

## Writing New Tests

### Example: Test Price Format

Add a test to ensure prices follow a specific format:

```typescript
describe('Price Format Validation', () => {
  it('should use proper currency format for USD prices', () => {
    const plans = ['starter', 'professional'];

    plans.forEach(plan => {
      const price = enMessages.homeTakSolutions.hosting.plans[plan].price;

      // Should start with $ and contain comma for thousands
      expect(price).toMatch(/^\$[\d,]+$/);
    });
  });

  it('should use "Custom" for enterprise pricing', () => {
    const enterprisePrice = enMessages.homeTakSolutions.hosting.plans.enterprise.price;
    expect(enterprisePrice).toBe('Custom');
  });

  it('should include period descriptor for recurring prices', () => {
    const period = enMessages.homeTakSolutions.hosting.plans.starter.period;
    expect(period).toMatch(/\/(month|year|student)/);
  });
});
```

---

### Example: Test All Required Fields

Ensure each plan has all required properties:

```typescript
describe('Required Pricing Fields', () => {
  it('should have all required fields for each hosting plan', () => {
    const requiredFields = ['name', 'price', 'period', 'users', 'ai', 'features', 'cta'];
    const plans = ['starter', 'professional', 'enterprise'];

    locales.forEach(({ name, messages }) => {
      plans.forEach(plan => {
        const planData = messages.homeTakSolutions.hosting.plans[plan];

        requiredFields.forEach(field => {
          expect(planData).toHaveProperty(field);

          if (field === 'features') {
            expect(Array.isArray(planData[field])).toBe(true);
            expect(planData[field].length).toBeGreaterThan(0);
          } else {
            expect(planData[field]).toBeTruthy();
          }
        });
      });
    });
  });
});
```

---

### Example: Test Price Increases Never Decrease

Ensure pricing tiers increase in price:

```typescript
describe('Pricing Tier Logic', () => {
  it('should have increasing prices from Starter to Professional', () => {
    const starterPrice = parseFloat(
      enMessages.homeTakSolutions.hosting.plans.starter.price.replace(/[$,]/g, '')
    );
    const professionalPrice = parseFloat(
      enMessages.homeTakSolutions.hosting.plans.professional.price.replace(/[$,]/g, '')
    );

    expect(professionalPrice).toBeGreaterThan(starterPrice);
  });
});
```

---

## Test Configuration

### Jest Configuration
**File**: `jest.config.js`

The project uses Jest with the following setup:

```javascript
{
  testEnvironment: 'jsdom',  // For React component testing
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'  // Alias support
  },
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'i18n/**/*.{js,ts}',
    '!**/*.d.ts',
    '!**/node_modules/**'
  ]
}
```

---

### Running Specific Test Suites

```bash
# Run all i18n tests
npm test __tests__/i18n

# Run all component tests
npm test __tests__/components

# Run all integration tests
npm test __tests__/integration

# Run a specific test file
npm test pricing-consistency.test.ts

# Run tests matching a pattern
npm test -t "pricing"
```

---

## Continuous Integration

### GitHub Actions

Tests run automatically on:
- Every push to any branch
- Every pull request
- Before deployment to production

**Workflow**: `.github/workflows/test.yml` (if configured)

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm test
      - run: npm run build  # Ensure build succeeds
```

---

## Debugging Failed Tests

### Step 1: Read the Error Message

The error message shows:
- Which test failed
- What was expected vs. received
- File and line number

### Step 2: Check the Specific File

Navigate to the file mentioned in the error:

```
at toEqual (__tests__/i18n/pricing-consistency.test.ts:83:24)
              ↑ File                                        ↑ Line 83
```

### Step 3: Verify JSON Structure

Check that the translation files have the correct structure:

```bash
# Pretty-print JSON to check structure
cat messages/en.json | jq '.homeTakSolutions.hosting.plans'
```

### Step 4: Run Single Test

Isolate the failing test:

```bash
npm test -t "should have identical hosting plan prices"
```

### Step 5: Add Debug Output

Temporarily add `console.log` to the test:

```typescript
it('should have identical hosting plan prices across all languages', () => {
  const enPrices = hostingPlans.map(
    (plan) => enMessages.homeTakSolutions.hosting.plans[plan].price
  );

  console.log('English prices:', enPrices);  // ← Debug output

  locales.forEach(({ name, messages }) => {
    const prices = hostingPlans.map(
      (plan) => messages.homeTakSolutions.hosting.plans[plan].price
    );

    console.log(`${name} prices:`, prices);  // ← Debug output

    expect(prices).toEqual(enPrices);
  });
});
```

Run with:
```bash
npm test -t "identical hosting plan prices" -- --verbose
```

---

## Best Practices

1. **Run tests before committing**: `npm test`
2. **Run tests in watch mode during development**: `npm test -- --watch`
3. **Don't skip tests** unless absolutely necessary (use `it.skip` sparingly)
4. **Add tests for new features**: If you add a new pricing tier, add tests
5. **Keep tests simple**: Each test should validate one thing
6. **Use descriptive test names**: "should have identical prices" not "test1"
7. **Update tests when requirements change**: Tests should match current business logic

---

## Quick Reference

### Run all tests
```bash
npm test
```

### Run pricing tests only
```bash
npm test pricing
```

### Run tests in watch mode
```bash
npm test -- --watch
```

### Run specific test file
```bash
npm test pricing-consistency.test.ts
```

### Run tests with coverage
```bash
npm run test:coverage
```

### Debug a single test
```bash
npm test -t "test name here" -- --verbose
```

---

## Common Issues

### Issue: "Cannot find module '@/messages/en.json'"

**Solution**: Ensure `jest.config.js` has the `@/` alias configured:

```javascript
moduleNameMapper: {
  '^@/(.*)$': '<rootDir>/$1'
}
```

---

### Issue: Tests pass locally but fail in CI

**Solution**:
- Ensure `node_modules` are properly installed in CI
- Check Node.js version matches between local and CI
- Verify all files are committed to git

---

### Issue: Test runs forever and times out

**Solution**:
- Check for infinite loops in test code
- Increase timeout: `jest.setTimeout(10000)`
- Verify all async operations complete

---

## Next Steps

- Review `docs/PRICING.md` for pricing update workflows
- Check `__tests__/i18n/pricing-consistency.test.ts` for test implementation
- Run `npm test -- --watch` during development
- Add new tests when adding new features
