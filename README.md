# GE Cleaning Services Website

Production-ready Next.js landing page for **GE Cleaning Services** (UAE), with premium responsive design, smooth animations, WhatsApp booking flow, SEO metadata, and editable business content.

## Tech stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Editable content configuration

Update business and page content in:

- `/home/runner/work/ge-cleaning-services/ge-cleaning-services/lib/site-config.ts`

This central file includes business details, services, FAQs, testimonials, navigation links, trust stats, and location placeholder fields.

## Deployment

### Vercel (recommended)

1. Import the repository in Vercel.
2. Framework preset: **Next.js**.
3. Build command: `npm run build`
4. Output: default Next.js output

### Generic Node deployment

```bash
npm run build
npm run start
```

## Important business links in use

- Phone/WhatsApp: `+971 58 563 0041` (normalized: `971585630041`)
- Instagram: https://www.instagram.com/grandemiratescleaning

A specific map URL is intentionally left as a configurable placeholder until a verified location link is provided.
