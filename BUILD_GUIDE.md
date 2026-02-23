# Verida Landing Page - Build Guide

## What's Been Built

A complete, production-ready Next.js landing page for Verida, deployed locally and ready for Vercel deployment.

### Project Location
```
/mnt/wdblack/dev/projects/verida-landing/
```

## Architecture Overview

The landing page is built with:
- **Next.js 15** (App Router)
- **TypeScript** for type safety
- **CSS Modules** for component-scoped styling
- **CSS Variables** for consistent design tokens
- **Framer Motion** for animations
- **React Hook Form** for form handling

### Dark Terminal Aesthetic
All styling matches the industrial/terminal aesthetic from the main Verida app:
- Cyan accents (`#22d3ee`)
- Dark backgrounds (`#0a0e1a`, `#12182b`)
- Monospace fonts (IBM Plex Mono)
- CRT scanline overlay effect
- Glow effects on interactive elements

## Project Structure

```
verida-landing/
├── app/
│   ├── components/
│   │   ├── Hero.tsx                 # Hero section with email signup
│   │   ├── HowItWorks.tsx           # 3-step governance flow
│   │   ├── UseCases.tsx             # 6 use case cards (SupportOps, etc.)
│   │   ├── Features.tsx             # 6 feature cards (governance, verification, etc.)
│   │   ├── Comparison.tsx           # Competitive comparison table
│   │   ├── EmailForm.tsx            # Reusable email subscription form
│   │   └── ui/
│   │       ├── Button.tsx           # Base button component
│   │       ├── Button.module.css    # Button styles
│   │       ├── Card.tsx             # Card component with variants
│   │       ├── Card.module.css      # Card styles
│   │       ├── Input.tsx            # Text input component
│   │       └── Input.module.css     # Input styles
│   ├── api/
│   │   └── email/
│   │       └── subscribe/
│   │           └── route.ts         # POST endpoint for email signup
│   ├── globals.css                  # Global styles + design system
│   ├── layout.tsx                   # Root layout with fonts
│   ├── page.tsx                     # Home page (orchestrates all sections)
│   └── page.module.css              # Page-level styles
├── public/                          # Static assets (empty for now)
├── package.json                     # Dependencies
├── next.config.ts                   # Next.js config
├── tsconfig.json                    # TypeScript config
├── .env.example                     # Environment variables template
├── .gitignore                       # Git ignore rules
├── .editorconfig                    # Editor configuration
└── README.md                        # Project README

```

## Sections Explained

### 1. Hero Section
**File:** `app/components/Hero.tsx`

- **Purpose:** Compelling headline, value prop, email capture
- **Copy:** "Trusted AI Execution for Operations"
- **CTA:** Email form with "Join Early Access" button
- **Messaging:** Trust, governance, confidence
- **Design:** Animated background gradient, cyan accents, smooth entrance animations

**Key Features:**
- Email form integrated with `/api/email/subscribe`
- Social proof badge ("Now in Early Access")
- Responsive on mobile

### 2. How It Works
**File:** `app/components/HowItWorks.tsx`

- **Purpose:** Show the governance flow (Design → Verify → Execute)
- **Layout:** 3-step card grid with visual flow diagram below
- **Messaging:** Emphasizes AI proposal → human verification → execution
- **Design:** Card elevation on hover, flow diagram with arrows

**Key Features:**
- Step-by-step explanation of Verida's approach
- Visual flow showing "Your Teams → AI Execution → Policy Verification → Production Ready"
- Responsive grid collapses on mobile

### 3. Use Cases
**File:** `app/components/UseCases.tsx`

- **Purpose:** Show range of applications (SupportOps, RevOps, Compliance, HR, Finance, DevOps)
- **Layout:** 6-card grid with icons and 1-sentence descriptions
- **Messaging:** "Every operations team runs different workflows"
- **Design:** Bordered card variant, left-align borders in cyan

**Key Features:**
- Icon + title + single-sentence use case
- Demonstrates breadth without overwhelming
- Easy to add more use cases

### 4. Features
**File:** `app/components/Features.tsx`

- **Purpose:** Highlight core product features and governance capabilities
- **Layout:** 6-card grid (Policy, Verification, Audit, Integrations, Builder, Deployment)
- **Messaging:** "Enterprise-Grade Controls Built In"
- **Design:** Elevated card variant with hover glow

**Key Features:**
- Each feature has emoji icon + title + description
- Ordered by importance (governance first)
- Emphasizes what makes Verida different

### 5. Comparison
**File:** `app/components/Comparison.tsx`

- **Purpose:** Direct comparison vs. competitors (Zapier, Make, n8n, Retool)
- **Layout:** HTML table with 6 features × 5 competitors
- **Messaging:** "Why Choose Verida?" with honest assessment
- **Design:** Verida column highlighted in cyan, checkmarks green, dashes muted

**Features Compared:**
1. Policy-Driven Governance (✓ only in Verida)
2. AI Execution + Verification (✓ in Verida & Retool)
3. Immutable Audit Trail (✓ in most, Verida has most mature)
4. Self-Hosted Deployment (✓ in Verida, n8n, Retool)
5. Operations-First Design (✓ only in Verida)
6. Enterprise Compliance (✓ in Verida, Retool partial)

## Styling System

### Design Tokens (in `globals.css`)

```css
:root {
  /* Colors */
  --color-primary: #0a0e1a;       /* Dark background */
  --color-secondary: #12182b;     /* Card background */
  --color-accent: #22d3ee;        /* Cyan for highlights */
  --color-success: #00ff66;       /* Green for checkmarks */
  --color-warning: #ffb700;       /* Amber for warnings */
  --color-danger: #ff3366;        /* Red for errors */
  --color-text: #e5e7eb;          /* Light text */
  --color-text-muted: #9ca3af;   /* Muted text */

  /* Fonts */
  --font-display: "Space Grotesk", sans-serif;      /* Headlines */
  --font-body: "IBM Plex Mono", monospace;          /* Body text */
  --font-mono: "JetBrains Mono", monospace;         /* Code */

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  --spacing-3xl: 4rem;
  --spacing-4xl: 6rem;

  /* Transitions */
  --transition-fast: 150ms ease-in-out;
  --transition-normal: 250ms ease-in-out;
  --transition-slow: 350ms ease-in-out;
}
```

### Component-Level Styling

Each component has its own `.module.css` file for scoped styles:

```
Component.tsx          # React component
Component.module.css   # Scoped CSS (imported and used via className)
```

This prevents style conflicts and keeps styles co-located with components.

### Animation System

Uses **Framer Motion** for smooth entrance animations:

```tsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={itemVariants}
>
  {content}
</motion.div>
```

Benefits:
- Auto-triggers on scroll into view
- Only animates once (once: true)
- Staggered animations for grid items
- Consistent across all sections

## Email Subscription Flow

### Current Implementation

1. User enters email in form (Hero or anywhere EmailForm is placed)
2. Form validates email format
3. Submits to `/api/email/subscribe` (POST)
4. API validates and logs (placeholder)
5. Returns success message
6. Form shows green success confirmation

### API Route

**File:** `app/api/email/subscribe/route.ts`

```typescript
POST /api/email/subscribe

Request:
{
  "email": "user@example.com",
  "role": "operations-lead" | "cto" | "compliance" | "developer" | "other",
  "company": "Acme Corp"
}

Response:
{
  "success": true,
  "message": "Check your email for confirmation"
}
```

### TODO: Database Integration

Once Vercel Postgres is available, the API will:
1. Store email in `verida_emails` table
2. Send confirmation email via Resend
3. Track signup source (landing page)
4. Prevent duplicates

Schema:
```sql
CREATE TABLE verida_emails (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  role VARCHAR(50),
  company VARCHAR(255),
  signed_up_at TIMESTAMP,
  confirmed_at TIMESTAMP,
  source VARCHAR(50),
  created_at TIMESTAMP
);
```

## Responsive Design

### Breakpoints

- **Mobile:** Default styles, optimized for <640px
- **Tablet:** CSS media query at 640px
- **Desktop:** CSS media query at 1024px

### Mobile Optimizations

- Full-width buttons and forms
- Reduced padding on small screens
- Single-column layouts instead of grids
- Larger touch targets (44px minimum)
- Larger font sizes for readability

### Testing Mobile

```bash
# In browser DevTools
- Ctrl+Shift+M (or Cmd+Shift+M) to toggle device emulation
- Test at iPhone 12 Pro (390px), iPad (768px), Desktop (1440px)
```

## Running Locally

### Installation

```bash
cd /mnt/wdblack/dev/projects/verida-landing
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:3000`

Hot-reload on file changes. Press Ctrl+C to stop.

### Building

```bash
npm run build
npm start
```

Production-optimized build. Tests SSR and minification locally.

### Code Quality

```bash
npm run lint
```

ESLint checks for code quality (currently ignores errors, can be enabled).

## What's Missing / TODO

### High Priority
- [ ] **Database Integration** — Vercel Postgres for email storage
- [ ] **Email Service** — Resend for confirmation emails
- [ ] **Analytics** — Vercel Analytics to track signups and conversions
- [ ] **Customer Testimonials** — Add testimonials section (once we have them)
- [ ] **Blog/Resource Links** — Add educational content section

### Medium Priority
- [ ] **Privacy Policy Page** — Legal requirement for email capture
- [ ] **Terms of Service Page** — Standard legal docs
- [ ] **Syntax Highlighting** — For code examples (if added)
- [ ] **Mobile Performance** — Image optimization, lazy loading
- [ ] **Dark Mode Toggle** — Optional (already dark by default)

### Low Priority
- [ ] **SEO Optimization** — Meta tags, structured data, sitemaps
- [ ] **A/B Testing** — Variant testing of headlines/CTAs
- [ ] **Email List Export** — Sync to external tools (Mailchimp, etc.)
- [ ] **Zapier Integration** — Auto-add emails to Zapier
- [ ] **CRM Integration** — Auto-add emails to Salesforce/Hubspot

## Customization Guide

### Changing Copy

All text is in component files. Example:

```tsx
// Hero.tsx
<h1>Trusted AI Execution for Operations</h1>
```

Change to:
```tsx
<h1>Your new headline here</h1>
```

### Changing Colors

Edit `app/globals.css`:

```css
:root {
  --color-accent: #22d3ee;  /* Change to your color */
}
```

All component variations update automatically.

### Adding a Section

1. Create `app/components/NewSection.tsx`
2. Add styles in `app/components/NewSection.module.css`
3. Import in `app/page.tsx` and add `<NewSection />`
4. Done!

### Changing Fonts

Edit `app/layout.tsx` Google Fonts import:
```tsx
<link
  href="https://fonts.googleapis.com/css2?family=YOUR+FONT:wght@400;600;700"
  rel="stylesheet"
/>
```

Then update `globals.css`:
```css
--font-display: "Your Font", sans-serif;
```

## Performance Metrics

Target metrics post-launch:

- **Lighthouse Score:** > 90 (all categories)
- **Core Web Vitals:**
  - LCP (Largest Contentful Paint): < 2.5s
  - FID (First Input Delay): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1
- **Page Load:** < 3s on 4G
- **Email Form Conversion:** 3-5% (visitors → email)

## Deployment to Vercel

### Prerequisites
- GitHub account (public or private repo)
- Vercel account (free tier sufficient)

### Steps

1. **Create GitHub repo:**
   ```bash
   cd /mnt/wdblack/dev/projects/verida-landing
   git init
   git add .
   git commit -m "Initial commit: Verida landing page"
   git remote add origin https://github.com/webemo-aaron/verida-landing.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to https://vercel.com
   - Click "New Project"
   - Import GitHub repo
   - Click "Deploy"
   - Vercel auto-builds and deploys

3. **Custom Domain:**
   - Go to project settings
   - Add custom domain (e.g., verida.io, governed.io)
   - Update DNS records in domain registrar

4. **Environment Variables:**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add any needed variables (.env.example template provided)

### Auto-Deploy

Every push to main branch automatically:
- Runs build
- Runs tests
- Deploys to production

## Git Workflow

```bash
# Create feature branch
git checkout -b feat/new-section

# Make changes
# ...

# Commit
git add .
git commit -m "feat: add testimonials section"

# Push
git push origin feat/new-section

# Create PR on GitHub, merge to main
# Vercel auto-deploys
```

## Next Steps for Launch

1. ✅ **Design & Build Locally** (DONE)
2. 🔄 **User Review & Approval** (IN PROGRESS)
3. 📝 **Add Real Copy** (pending your feedback)
4. 🗄️ **Set Up Database** (Vercel Postgres)
5. 📧 **Configure Email Service** (Resend)
6. 🚀 **Deploy to Vercel** (one-click once repo is ready)
7. 📊 **Monitor Analytics** (Vercel Analytics)
8. 🎯 **Iterate Based on Data** (A/B test, refine)

## Questions & Support

Key implementation decisions:
- **CSS Modules over Tailwind:** Matches app architecture, prevents style conflicts
- **Framer Motion for animations:** Smooth, performant, scroll-trigger animations
- **No Database Yet:** Placeholder API ready for Postgres + Resend integration
- **Email Form Inline:** Captures leads high on page, validated client-side

Ready to review and collect feedback before Vercel deployment.
