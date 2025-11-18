# NERV Systems Documentation

This directory contains documentation for the NERV Systems multilingual website.

## Documents

### [PRICING.md](./PRICING.md)
**Pricing Management Guide** - Complete guide for updating and managing pricing across all languages.

**Use this when**:
- Changing prices for any service
- Adding or removing pricing tiers
- Setting up market-specific pricing
- Troubleshooting pricing issues

**Quick links**:
- [How to update pricing for all markets](./PRICING.md#scenario-1-update-pricing-for-all-markets-current-workflow)
- [How to set different pricing per market](./PRICING.md#scenario-2-set-different-pricing-per-market-future-use)
- [Common scenarios](./PRICING.md#common-scenarios)
- [Troubleshooting](./PRICING.md#troubleshooting)

---

### [TESTING.md](./TESTING.md)
**Testing Guide** - Comprehensive guide for testing multilingual pricing and translations.

**Use this when**:
- Understanding test failures
- Writing new tests
- Modifying existing tests
- Debugging translation issues

**Quick links**:
- [Running tests](./TESTING.md#running-tests)
- [Understanding test output](./TESTING.md#understanding-test-output)
- [Modifying tests for market-specific pricing](./TESTING.md#scenario-allow-market-specific-pricing)
- [Writing new tests](./TESTING.md#writing-new-tests)

---

## Quick Start

### Update Pricing (All Markets Same)

```bash
# 1. Edit English file
vim messages/en.json

# 2. Copy same change to other languages
vim messages/ja.json
vim messages/ko.json
vim messages/th.json

# 3. Test
npm test

# 4. Commit
git add messages/*.json
git commit -m "Update pricing"
git push
```

See [PRICING.md](./PRICING.md#scenario-1-update-pricing-for-all-markets-current-workflow) for details.

---

### Run Tests

```bash
npm test                    # All tests
npm test pricing           # Just pricing tests
npm test -- --watch        # Watch mode
npm test -- --verbose      # Detailed output
```

See [TESTING.md](./TESTING.md#running-tests) for more options.

---

## Architecture Overview

### Pricing System

```
┌─────────────────────────────────────────┐
│  Translation Files (Single Source)      │
│  ├── messages/en.json                   │
│  ├── messages/ja.json                   │
│  ├── messages/ko.json                   │
│  └── messages/th.json                   │
└─────────────────────────────────────────┘
              ↓ (read by)
┌─────────────────────────────────────────┐
│  Components (Use useTranslations)       │
│  ├── TAKSolutionsSection.tsx            │
│  └── tak/TAKServicesSection.tsx         │
└─────────────────────────────────────────┘
              ↓ (validated by)
┌─────────────────────────────────────────┐
│  Tests (Enforce Consistency)            │
│  ├── pricing-consistency.test.ts        │
│  └── messages.test.ts                   │
└─────────────────────────────────────────┘
```

**Current State**: All languages show identical USD pricing

**Future Capability**: Can diverge pricing per market

---

## Common Tasks

| Task | Documentation |
|------|---------------|
| Change a price | [PRICING.md](./PRICING.md#scenario-1-update-pricing-for-all-markets-current-workflow) |
| Add pricing tier | [PRICING.md](./PRICING.md#add-a-new-pricing-tier) |
| Remove pricing tier | [PRICING.md](./PRICING.md#remove-a-pricing-tier) |
| Set market-specific pricing | [PRICING.md](./PRICING.md#scenario-2-set-different-pricing-per-market-future-use) |
| Run tests | [TESTING.md](./TESTING.md#running-tests) |
| Debug test failure | [TESTING.md](./TESTING.md#debugging-failed-tests) |
| Write new test | [TESTING.md](./TESTING.md#writing-new-tests) |
| Modify tests | [TESTING.md](./TESTING.md#modifying-tests) |

---

## File Locations

### Translation Files
```
messages/
├── en.json     # English (source of truth)
├── ja.json     # Japanese
├── ko.json     # Korean
└── th.json     # Thai
```

### Components
```
components/
├── TAKSolutionsSection.tsx              # Home page TAK section
└── tak/
    ├── TAKServicesSection.tsx           # TAK page services
    ├── TAKHeroSection.tsx               # TAK page hero
    └── ...
```

### Tests
```
__tests__/
├── i18n/
│   ├── pricing-consistency.test.ts      # Pricing tests ← Important!
│   ├── messages.test.ts                 # Translation structure tests
│   ├── config.test.ts                   # i18n config tests
│   └── request.test.ts                  # Translation loading tests
├── components/
│   └── ...
└── integration/
    └── locale-integration.test.tsx      # Locale switching tests
```

---

## Pricing Structure

### Two Pricing Sections

Both exist in all language files:

#### 1. Home Page
**JSON path**: `homeTakSolutions`

**Contains**:
- Hosting plans (Starter, Professional, Enterprise)
- Deployment packages (Assessment, Deployment, Enterprise)
- Training programs (Fundamentals, NERVA, Advanced)
- Additional services (Admin, Plugins, Hardware)

#### 2. TAK Solutions Page
**JSON path**: `takSolutions.services`

**Contains**:
- Hosting plans (same tiers, more detail)
- Deployment plans (same packages, more detail)
- Training programs (same programs, more detail)

**Important**: Keep both sections in sync when changing prices!

---

## Testing Strategy

### Automated Tests Enforce

1. **Pricing Consistency**
   - All languages have identical prices (current requirement)
   - Can be modified to allow market-specific pricing

2. **Structure Completeness**
   - All pricing sections exist in all languages
   - All tiers/packages/programs present
   - No missing fields

3. **Translation Quality**
   - No empty strings
   - No emoji (tactical aesthetic requirement)
   - All required sections present

### Running Tests

Tests run:
- Locally: `npm test`
- On every git push (CI/CD)
- Before deployment

**All tests must pass** before merging to main branch.

---

## Workflow Example

### Scenario: Increase Professional Hosting Price

```bash
# 1. Create feature branch
git checkout -b update-professional-pricing

# 2. Edit English pricing
vim messages/en.json
# Change both homeTakSolutions AND takSolutions sections
# Find: "price": "$1,495"
# Replace: "price": "$1,995"

# 3. Copy to other languages
vim messages/ja.json  # Same change
vim messages/ko.json  # Same change
vim messages/th.json  # Same change

# 4. Run tests
npm test
# ✓ All 118 tests passing

# 5. Test in browser
npm run dev
# Visit localhost:3000 and all language variants
# Verify prices show correctly

# 6. Commit changes
git add messages/*.json
git commit -m "Increase Professional hosting to $1,995/month"

# 7. Push and create PR
git push -u origin update-professional-pricing
# Create pull request on GitHub

# 8. Tests run in CI
# Wait for all checks to pass

# 9. Merge to main
# Pricing updates deploy to production
```

---

## Best Practices

1. **Always run tests** before committing
2. **Update both pricing sections** (home page AND TAK page)
3. **Test in browser** after changing pricing
4. **Use feature branches** for pricing changes
5. **Document changes** in commit messages
6. **Review all 4 languages** before deploying
7. **Keep pricing consistent** (unless intentionally diverging)
8. **Read test output carefully** when failures occur

---

## Support

### When Things Go Wrong

1. **Read the test output** - it shows exactly what's wrong
2. **Check [TESTING.md](./TESTING.md#debugging-failed-tests)** - debugging guide
3. **Review [PRICING.md](./PRICING.md#troubleshooting)** - common issues
4. **Run tests in verbose mode**: `npm test -- --verbose`
5. **Check JSON syntax**: Use a JSON validator
6. **Verify file structure**: Compare with working language file

### Getting Help

- Review this README
- Check PRICING.md for pricing workflows
- Check TESTING.md for test details
- Run `npm test -- --verbose` for detailed output
- Check test files for validation logic

---

## Related Documentation

- [Project README](../README.md) - Project overview and setup
- [CLAUDE.md](../CLAUDE.md) - Project guidance for Claude Code
- [Component Documentation](../components/README.md) - Component usage (if exists)

---

## Changelog

### 2025-01-XX - Initial Documentation
- Created PRICING.md with complete pricing management guide
- Created TESTING.md with comprehensive testing guide
- Added pricing consistency tests
- Refactored pricing to use i18n translations
- All pricing now centralized in translation files
