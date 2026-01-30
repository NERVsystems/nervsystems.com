# NERV Systems Website

Modern, minimalist website for NERV Systems - Tactical AI for Mission Planning and Edge Intelligence.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom tactical theme
- **Design Aesthetic** - Dark tactical/military theme with HUD-inspired elements

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## Design System

### Colors

- **Background**: `#0a0e14` (tactical-bg)
- **Surface**: `#111822` (tactical-surface)
- **Accent**: `#00ff41` (tactical-accent) - Matrix green for CTAs and highlights
- **Text**: `#e6e6e6` (tactical-text)
- **Text Dim**: `#8a8a8a` (tactical-textDim)

### Typography

- **Primary Font**: System sans-serif with Inter fallback
- **Monospace**: Consolas/Monaco for tactical elements, codes, and labels

### UI Elements

- **Grid Background**: Subtle green grid overlay (40px × 40px)
- **Scan Lines**: Animated scan effect on hero section
- **HUD Corners**: Corner brackets on feature cards
- **Glow Effects**: Text shadow on primary headings
- **Tactical Borders**: Green borders with subtle glow

## Project Structure

```
nervsystems.com/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles & utilities
├── components/
│   ├── TacticalNav.tsx      # Navigation bar
│   ├── HeroSection.tsx      # Hero with stats
│   ├── FeaturesSection.tsx  # Platform capabilities
│   ├── TAKSection.tsx       # TAK integration showcase
│   └── Footer.tsx           # Site footer
├── public/                  # Static assets
└── tailwind.config.ts       # Tailwind configuration
```

## Key Features

- **Tactical Aesthetic** - Dark theme with military/command center inspiration
- **Responsive Design** - Mobile-first approach
- **SEO Optimized** - Comprehensive meta tags and Open Graph
- **Smooth Animations** - Subtle, professional transitions
- **Accessibility** - Semantic HTML and ARIA labels

## Deployment

This site can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Any Node.js hosting**

## License

Proprietary - NERV Systems © 2026
