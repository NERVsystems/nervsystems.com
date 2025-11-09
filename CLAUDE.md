# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the NERV Systems corporate website - a modern, minimalist Next.js application with a tactical/military aesthetic. NERV is an advanced defense tech startup bringing AI augmentation to TAK/ATAK systems.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS with custom tactical theme
- **Node.js/npm** - Package management

## Common Commands

### Development
```bash
npm run dev          # Start development server at http://localhost:3000
npm run build        # Build production bundle
npm start            # Start production server
npm run lint         # Run ESLint
```

### Installing Dependencies
```bash
npm install          # Install all dependencies
npm install <pkg>    # Add a new package
```

## Architecture

### Design System

**Color Palette (Tactical Theme):**
- `tactical-bg`: #0a0e14 (main background)
- `tactical-surface`: #111822 (elevated surfaces)
- `tactical-accent`: #00ff41 (primary green accent, CTAs)
- `tactical-text`: #e6e6e6 (primary text)
- `tactical-textDim`: #8a8a8a (secondary text)

**Typography:**
- Sans-serif for body text
- Monospace (`font-mono`) for tactical elements, codes, labels

**Visual Elements:**
- Grid background overlay (40px × 40px)
- Scan line animations
- HUD-style corner brackets
- Glow effects on accent text
- Tactical borders with subtle green glow

### File Structure

```
app/
├── layout.tsx          # Root layout, metadata, fonts
├── page.tsx            # Homepage (main entry)
└── globals.css         # Global styles, utilities, animations

components/
├── TacticalNav.tsx     # Fixed navigation bar with scroll effects
├── HeroSection.tsx     # Hero section with stats and CTAs
├── FeaturesSection.tsx # Platform capabilities grid
├── TAKSection.tsx      # TAK integration showcase
└── Footer.tsx          # Site footer

tailwind.config.ts      # Tailwind configuration with tactical theme
```

### Component Architecture

- **All components are React Server Components** unless marked with `'use client'`
- Client components (TacticalNav, HeroSection) use hooks for interactivity
- Responsive design: mobile-first with `md:` and `lg:` breakpoints
- Animations use Tailwind's transition utilities

## Design Principles

1. **Minimalist** - Clean, focused content with intentional whitespace
2. **Tactical Aesthetic** - Military/command center inspiration with dark theme
3. **Performance** - Optimized builds, minimal JavaScript
4. **Accessibility** - Semantic HTML, proper contrast ratios
5. **Responsive** - Mobile-first, works on all screen sizes

## Key Features

- Fixed navigation with scroll-triggered background
- Animated hero section with grid background and scan lines
- Feature cards with HUD-style corners
- TAK integration showcase section
- Fully responsive layout
- SEO optimized with comprehensive metadata

## Content Strategy

- **Target Audience**: Defense/military organizations, tactical operations teams
- **Key Messaging**: AI-powered mission planning, TAK integration, edge computing
- **Tone**: Professional, technical, confident

## Deployment

Optimized for deployment to:
- **Vercel** (recommended - zero-config Next.js deployment)
- **Netlify**
- **AWS Amplify**
- Any Node.js hosting environment

Build output is fully static and can be served from CDN.

## Important Notes

- The tactical color scheme uses green (`#00ff41`) as the primary accent - maintain this for brand consistency
- Monospace font is used deliberately for tactical/military aesthetic on labels, codes, and UI elements
- All animations should be subtle and professional - avoid flashy effects
- Grid background and scan lines are key visual elements of the brand
- Component imports use `@/` alias which maps to project root
- **CRITICAL: NEVER use emoji in this website** - Emoji flag the site as AI-generated and are inappropriate for a tactical/military product. Use tactical abbreviations (UAS, SAR, ALERT, etc.), numbers (01, 02, 03), or simple ASCII symbols (▸, -, •) instead.

## Content Guidelines

- **No Emoji Ever** - This is a defense technology product. Emoji are unprofessional and immediately signal AI-generated content.
- Use military/tactical terminology: CASEVAC, LZ, ISR, UAS, SAR, etc.
- Icon replacements:
  - Use tactical codes: "UAS", "MEDEVAC", "THREAT", "SAR", "ALERT", "AIRSPACE"
  - Use numbered prefixes: "01", "02", "03"
  - Use monospace ASCII: "▸", "•", "-", ">"
- Maintain professional, operator-focused language throughout
