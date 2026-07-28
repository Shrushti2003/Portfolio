# Shrushti Swarnakar Portfolio

Personal portfolio for Shrushti Swarnakar, a BCA 2025 graduate from Pune, India. The site presents full stack and frontend projects, certificates, coding practice, contact links and a visual hero built around the current CGI developer artwork.

## Tech Stack

- Vinext with Next-style App Router files
- Vite build pipeline
- React 19 and TypeScript
- Framer Motion for lightweight reveal and UI motion
- Lucide React icons
- CSS custom properties and plain CSS for layout and styling
- Local Geist font files served from `public/fonts/`
- Vinext/Sites worker entry through `worker/index.ts`

## Features

- Responsive Hero, Selected Work, Expertise, About, Journey, Certificates and Contact sections
- Contained CGI developer scene with a single canvas effects layer
- Project case-study routes for Strategy Hub, Zylora, CloudNest Drive, LumiBooks and Netflix Clone
- Verified project screenshots and certificate previews served from `public/`
- Accessible labels for icon-only actions and carousel controls
- Metadata, robots and sitemap support

## Local Setup

Use Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by the Vinext development server.

## Production Checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run build:vercel
npm run start
```

`npm test` builds the Vinext Worker output and runs server-rendered route checks.
Run `npm run build` before `npm run start`; the start script previews the generated Worker and static assets from `dist/`.
Run `npm run build:vercel` before deploying to Vercel.

## Environment Variables

No private runtime secrets are required for the current portfolio.

Create `.env.local` only when you want to override the public site URL used for metadata. Use this same variable in Vercel:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

Use `.env.example` as the template. Do not commit real secret values.

## Project Structure

```text
app/                     App routes, metadata, robots and sitemap
components/animations/   Reusable motion helpers
components/layout/       Navigation
components/sections/     Portfolio sections and case-study pages
components/ui/           Small reusable UI primitives
lib/                     Portfolio data, site config and utilities
public/certificates/     Certificate files and previews
public/documents/        Resume and downloadable documents
public/fonts/            Local Geist font files
public/media/            Hero CGI artwork and generated media assets
public/projects/         Project screenshots grouped by project
tests/                   Server-rendered regression checks
types/                   Shared TypeScript types
worker/                  Cloudflare worker entry for Vinext
```

## Deployment

This repository keeps the current Vinext/Sites build and also includes a Vercel build path.

For the existing Vinext/Sites worker output:

```bash
npm run build
```

For Vercel:

1. Import the GitHub repository into Vercel.
2. Use the included `vercel.json`, which sets the build command to `npm run build:vercel`.
3. Set `NEXT_PUBLIC_SITE_URL` to the final public domain.
4. Deploy from the selected branch.

Before any production deployment, set `NEXT_PUBLIC_SITE_URL` to the final public domain so canonical metadata, sitemap and structured data use the correct URL.

## Contact

- Email: swarnakarshrushti@gmail.com
- GitHub: https://github.com/Shrushti2003
- LinkedIn: https://www.linkedin.com/in/shrushti-swarnakar/
- LeetCode: https://leetcode.com/u/Shrushti2003/
