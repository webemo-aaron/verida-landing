# Verida Landing Page

The official landing page for **Verida** — Trusted AI Execution for Operations.

## Overview

Verida is a trust-first AI execution platform designed for business operations teams that need controlled delegation of AI work. This landing page showcases the product's core value proposition through:

- **Hero Section** — Bold positioning and early access email capture
- **How It Works** — Governance flow (Design → Verify → Execute)
- **Use Cases** — SupportOps, RevOps, Compliance, HR, Finance, DevOps
- **Features** — Policy governance, real-time verification, audit trails, integrations
- **Comparison** — How Verida compares to competitors (Zapier, Make, n8n, Retool)

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** CSS Modules + CSS Variables (dark terminal aesthetic)
- **Animations:** Framer Motion
- **Database:** Vercel Postgres (planned)
- **Email:** Resend (planned)
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Git

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/webemo-aaron/verida-landing.git
cd verida-landing
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
verida-landing/
├── app/
│   ├── components/              # React components
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── UseCases.tsx
│   │   ├── Features.tsx
│   │   ├── Comparison.tsx
│   │   ├── EmailForm.tsx
│   │   └── ui/                  # Base UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── Input.tsx
│   ├── api/
│   │   └── email/
│   │       └── subscribe/
│   │           └── route.ts     # Email subscription endpoint
│   ├── globals.css              # Global styles + design tokens
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── public/                      # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

## Design System

### Color Palette

- **Primary:** `#0a0e1a` (near-black)
- **Secondary:** `#12182b` (dark blue)
- **Accent:** `#22d3ee` (cyan)
- **Success:** `#00ff66` (neon green)
- **Warning:** `#ffb700` (amber)
- **Danger:** `#ff3366` (red)

### Typography

- **Display:** Space Grotesk (bold, geometric)
- **Body:** IBM Plex Mono (readable, code-like)
- **Mono:** JetBrains Mono (code samples)

### Visual Features

- Dark terminal aesthetic (matches Verida app)
- CRT scanline overlay effect
- Cyan glow on interactive elements
- Smooth transitions and entrance animations
- Responsive design (mobile-first)

## Email Signup

The landing page captures early access signups via the email subscription form.

### API Endpoint

**POST** `/api/email/subscribe`

Request body:
```json
{
  "email": "user@example.com",
  "role": "operations-lead",
  "company": "Acme Corp"
}
```

Response:
```json
{
  "success": true,
  "message": "Check your email for confirmation"
}
```

**TODO:** Integrate with Vercel Postgres and Resend email service.

## Deployment

The landing page is designed to deploy easily to Vercel:

1. Push code to GitHub
2. Connect repository to Vercel
3. Vercel automatically deploys on push to main branch
4. Environment variables configured in Vercel dashboard

## Next Steps

- [ ] Implement Vercel Postgres integration for email storage
- [ ] Set up Resend for confirmation emails
- [ ] Add analytics (Vercel Analytics)
- [ ] Create privacy policy and terms pages
- [ ] Add customer testimonials section
- [ ] Set up email list export to marketing tools
- [ ] Performance optimization (images, code splitting)
- [ ] A/B testing framework for CTAs and headlines

## Contributing

For now, this is maintained by the core Verida team. Open a PR with any improvements.

## License

Copyright © 2026 Verida. All rights reserved.

---

Built with Next.js, TypeScript, and ❤️ for operations teams everywhere.
