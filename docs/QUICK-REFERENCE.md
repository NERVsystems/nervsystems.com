# Quick Reference - Pricing Management

**One-page cheat sheet for common pricing tasks**

---

## Update Price (All Markets)

```bash
# 1. Edit English
vim messages/en.json
# Find: "price": "$495"
# Change to: "price": "$595"

# 2. Copy to all languages
vim messages/ja.json  # Same change
vim messages/ko.json  # Same change
vim messages/th.json  # Same change

# 3. Test
npm test

# 4. Commit
git add messages/*.json
git commit -m "Update Starter price to $595"
git push
```

**Important**: Update BOTH `homeTakSolutions` AND `takSolutions.services` sections!

---

## Add New Tier

```bash
# 1. Add to messages/en.json
"startup": {
  "name": "Startup",
  "price": "$295",
  "period": "/month",
  "users": "Up to 25 users",
  "ai": "NERVA Lite (2 capabilities)",
  "features": ["..."],
  "cta": "Get Started"
}

# 2. Copy to ja.json, ko.json, th.json

# 3. Update component
# File: components/TAKSolutionsSection.tsx
const hostingPlans = ['startup', 'starter', 'professional', 'enterprise']

# 4. Update test
# File: __tests__/i18n/pricing-consistency.test.ts
const hostingPlans = ['startup', 'starter', 'professional', 'enterprise']

# 5. Test and commit
npm test
git add .
git commit -m "Add Startup tier at $295/month"
```

---

## Remove Tier

```bash
# 1. Delete from all messages/*.json files

# 2. Update component array
# File: components/TAKSolutionsSection.tsx
const hostingPlans = ['starter', 'professional']  # Removed 'enterprise'

# 3. Update test array
# File: __tests__/i18n/pricing-consistency.test.ts
const hostingPlans = ['starter', 'professional']  # Removed 'enterprise'

# 4. Test
npm test
npm run build
```

---

## Test Commands

| Command | Purpose |
|---------|---------|
| `npm test` | Run all tests |
| `npm test pricing` | Just pricing tests |
| `npm test -- --watch` | Watch mode |
| `npm test -- --verbose` | Detailed output |
| `npm run test:coverage` | Coverage report |

---

## File Locations

| Path | Description |
|------|-------------|
| `messages/en.json` | English (source of truth) |
| `messages/ja.json` | Japanese |
| `messages/ko.json` | Korean |
| `messages/th.json` | Thai |
| `components/TAKSolutionsSection.tsx` | Home page component |
| `components/tak/TAKServicesSection.tsx` | TAK page component |
| `__tests__/i18n/pricing-consistency.test.ts` | Pricing tests |

---

## JSON Paths

### Home Page
```
homeTakSolutions
├── hosting.plans.[starter|professional|enterprise].price
├── deployment.packages.[assessment|deployment|enterprise].price
├── training.programs.[fundamentals|nerva|advanced].price
└── additionalServices.services.[administration|plugins|hardware].price
```

### TAK Solutions Page
```
takSolutions.services
├── hosting.plans.[starter|professional|enterprise].price
├── deployment.plans.[assessment|deployment|enterprise].price
└── training.programs.[fundamentals|nerva|advanced].price
```

---

## Current Pricing

**Hosting**:
- Starter: $495/month
- Professional: $1,495/month
- Enterprise: Custom

**Deployment**:
- Assessment: $4,500
- Deployment: $15,000
- Enterprise: $45,000+

**Training**:
- Fundamentals: $595/student
- NERVA: $795/student
- Advanced: $1,495/student

**Additional**:
- System Admin: From $450/month
- Plugin Development: From $15,000
- Edge Hardware: Contact for pricing

---

## Common Errors

### "expect(received).toEqual(expected)"
- **Problem**: Pricing mismatch between languages
- **Fix**: Update all 4 language files to match

### "Cannot read property 'price' of undefined"
- **Problem**: Tier missing from a language file
- **Fix**: Add tier to all language files

### Website shows "undefined"
- **Problem**: Translation key mismatch
- **Fix**: Check component path matches JSON structure

---

## Test Output

### Success ✅
```
PASS __tests__/i18n/pricing-consistency.test.ts
✓ should have identical hosting plan prices
✓ should have identical deployment package prices
✓ should have identical training program prices
Test Suites: 9 passed, 9 total
Tests:       118 passed, 118 total
```

### Failure ❌
```
FAIL __tests__/i18n/pricing-consistency.test.ts
✗ should have identical hosting plan prices

Expected: ["$495", "$1,495", "Custom"]
Received: ["$495", "$1,495", "カスタム"]
```
→ Fix: Change "カスタム" to "Custom" in ja.json

---

## Emergency Fixes

### Revert pricing change
```bash
git log --oneline  # Find commit hash
git revert <hash>
git push
```

### Deploy hotfix
```bash
git checkout main
git checkout -b hotfix/pricing
# Make changes
npm test
git add .
git commit -m "Hotfix: Correct pricing"
git push -u origin hotfix/pricing
# Create PR and merge
```

---

## Best Practices

✓ Always run `npm test` before committing
✓ Update both homeTakSolutions AND takSolutions
✓ Test in browser after changes
✓ Use feature branches for pricing changes
✓ Keep pricing identical across languages (for now)
✓ Document changes in commit messages

---

## Full Documentation

- **Detailed pricing guide**: `docs/PRICING.md`
- **Testing guide**: `docs/TESTING.md`
- **Documentation index**: `docs/README.md`

---

## Support

1. Read test output carefully
2. Check `docs/PRICING.md` → Troubleshooting
3. Run `npm test -- --verbose`
4. Validate JSON syntax
5. Compare with working language file

---

**Last Updated**: 2025-01-XX
**Current State**: All languages use identical USD pricing
**Tests**: 118 tests, all passing ✅
