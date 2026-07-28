# Shrushti Swarnakar — Portfolio

A modern and responsive developer portfolio showcasing my full stack projects, technical skills, certificates, achievements, and development journey.

The website features a clean dark interface, smooth animations, interactive project showcases, detailed case studies, and a custom CGI-inspired hero section.

## Live Portfolio

[View Live Portfolio](https://portfolio-nine-rho-gcua117klc.vercel.app)

![Shrushti Swarnakar Portfolio Website](./website%20photo.png)

## About Me

I’m Shrushti Swarnakar, a Full Stack Developer and BCA graduate from Pune, India. I enjoy building responsive web applications that combine thoughtful design with reliable functionality.

My work includes AI-powered platforms, cloud storage applications, marketplace systems, authentication flows, REST APIs, and database-driven dashboards. I am currently looking for Software Engineer, Full Stack Developer, and Backend Developer opportunities.

## Portfolio Features

- Clean, modern, and responsive interface
- Interactive CGI-inspired hero section
- Smooth reveal animations and transitions
- Selected projects with screenshots and live links
- Dedicated case study pages for major projects
- Interactive technology constellation
- Project filtering by development category
- Certificates and achievements section
- Downloadable resume
- GitHub, LinkedIn, LeetCode, and email links
- Responsive desktop and mobile navigation
- Accessible controls and semantic page structure
- SEO metadata, sitemap, and robots configuration
- Local font loading for improved performance
- Vercel and Cloudflare Worker deployment support

## Selected Projects

### Strategy Hub

An AI-powered interview preparation platform that provides resume feedback, ATS guidance, interview questions, saved reports, and personalized learning roadmaps.

**Key features:** Gemini AI reports, ATS resume guidance, resume parsing, interview questions, saved reports, roadmap generation, PDF export, authentication, and a responsive dashboard.

**Technologies:** Next.js, React, TypeScript, Node.js, Express.js, MongoDB, Mongoose, JWT, Gemini AI, Puppeteer, and Cloudinary

[Live Demo](https://strategy-hub-interview-app.vercel.app) · [GitHub Repository](https://github.com/Shrushti2003/Strategy-Hub-Interview-App)

### Zylora

A circular economy platform designed for buying, selling, donating, and discovering reusable items. It includes geolocation, role-based dashboards, messaging, and AI-assisted pricing.

**Key features:** Google sign-in, nearby search, interactive maps, resource listings, buyer and seller dashboards, saved items, messaging, and AI pricing.

**Technologies:** React, TypeScript, Vite, Node.js, Express.js, MongoDB, Firebase, Leaflet, OpenStreetMap, FastAPI, and Docker

[Live Demo](https://zylora-frontend.vercel.app) · [GitHub Repository](https://github.com/Shrushti2003/Zylora)

### CloudNest Drive

A cloud storage dashboard for uploading, organizing, previewing, sharing, and recovering files. It also includes storage limits, subscription screens, and support flows.

**Key features:** File uploads, folders, media previews, share links, trash recovery, storage quotas, Google OAuth, subscriptions, and support pages.

**Technologies:** React, Vite, Node.js, Express.js, MongoDB, Cloudinary, Stripe, Google OAuth, and JWT

[Live Demo](https://cloudnest-liart.vercel.app) · [GitHub Repository](https://github.com/Shrushti2003/Google-Drive-Clone)

### LumiBooks

A responsive online bookstore that allows users to explore books, browse categories, view book details, and use a dedicated reading interface.

**Key features:** Book discovery, category browsing, trending books, detailed book pages, authentication, user dashboard, and reading interface.

**Technologies:** Next.js, React, TypeScript, Node.js, MongoDB, and Tailwind CSS

[Live Demo](https://lumibooks.vercel.app) · [GitHub Repository](https://github.com/Shrushti2003/Online-Book-Store)

### Netflix Clone

A responsive streaming platform interface with authentication pages, movie and series browsing, content details, and person pages.

**Key features:** Responsive landing page, authentication screens, movie and series browsing, content details, and cast information.

**Technologies:** React, Vite, Node.js, Express.js, MongoDB, and JWT

[GitHub Repository](https://github.com/Shrushti2003/netflix-clone)

## Technology Stack

### Frontend

- React
- Next.js
- TypeScript
- JavaScript
- HTML5
- CSS3
- Tailwind CSS
- Vite
- Framer Motion

### Backend

- Node.js
- Express.js
- REST APIs
- JWT Authentication

### Database and Storage

- MongoDB
- Mongoose
- Firebase
- Cloudinary

### Tools and Deployment

- Git
- GitHub
- Vercel
- Cloudflare Workers
- Wrangler
- ESLint
- Docker

## Portfolio Technology

This portfolio was developed using:

- React 19
- Next.js 16
- TypeScript
- Vinext
- Vite
- Framer Motion
- Lucide React
- Radix UI
- CSS custom properties
- Local Geist fonts

## Project Structure

```text
app/
├── projects/[slug]/       Dynamic project case study routes
├── globals.css            Global styles and responsive design
├── layout.tsx             Root layout and metadata
├── page.tsx               Main portfolio page
├── robots.ts              Search engine crawling rules
└── sitemap.ts             Generated sitemap

components/
├── animations/            Cursor and reveal animations
├── layout/                Navigation components
├── sections/              Portfolio sections and case studies
└── ui/                    Reusable interface components

lib/
├── portfolio-data.ts      Projects, skills, and portfolio content
├── site-config.ts         Site metadata and public URL
└── utils.ts               Shared utility functions

public/
├── certificates/          Certificate files and previews
├── documents/             Downloadable resume
├── fonts/                 Local Geist font files
├── media/                 Hero artwork and media assets
└── projects/              Project screenshots

tests/                     Server-rendered route tests
types/                     Shared TypeScript definitions
worker/                    Cloudflare Worker entry
```

## Getting Started

### Prerequisites

Make sure the following are installed:

- Node.js 22.13 or newer
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Shrushti2003/Portfolio.git
```

2. Open the project directory:

```bash
cd Portfolio
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL displayed in the terminal.

## Environment Variables

The portfolio does not require any private runtime secrets.

To configure the public website URL, create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

Use `.env.example` as the template.

Do not commit `.env.local` or any file containing private credentials.

## Available Commands

Start the development server:

```bash
npm run dev
```

Create the Vinext and Cloudflare Worker production build:

```bash
npm run build
```

Create the production build for Vercel:

```bash
npm run build:vercel
```

Run the generated Worker build locally:

```bash
npm run start
```

Check the project with ESLint:

```bash
npm run lint
```

Check TypeScript types:

```bash
npm run typecheck
```

Build the project and run the server-rendered route tests:

```bash
npm test
```

## Deployment on Vercel

1. Push the project to a GitHub repository.
2. Import the repository into Vercel.
3. Use the following build command:

```bash
npm run build:vercel
```

4. Add the following environment variable:

```env
NEXT_PUBLIC_SITE_URL=https://your-final-domain.vercel.app
```

5. Deploy the project.

The included `vercel.json` configures the Vercel build process.

## Performance and Accessibility

The portfolio includes:

- Responsive layouts for different screen sizes
- Locally hosted fonts
- Optimized WebP hero artwork
- Lightweight interface animations
- Reduced-motion support
- Semantic HTML sections
- Accessible labels for icon-only controls
- Keyboard-friendly interactive elements
- SEO-friendly metadata
- Sitemap and robots configuration

## Achievements

- Solved 423+ LeetCode problems
- Built and deployed multiple AI-powered and full stack applications
- Completed Full Stack Web Development training
- Earned Data Structures completion and excellence certificates

## Contact

I am open to Software Engineer, Full Stack Developer, and Backend Developer opportunities.

- **Email:** [swarnakarshrushti@gmail.com](mailto:swarnakarshrushti@gmail.com)
- **LinkedIn:** [Shrushti Swarnakar](https://www.linkedin.com/in/shrushti-swarnakar/)
- **GitHub:** [Shrushti2003](https://github.com/Shrushti2003)
- **LeetCode:** [Shrushti2003](https://leetcode.com/u/Shrushti2003/)
- **Portfolio:** [View Website](https://portfolio-nine-rho-gcua117klc.vercel.app)

## Author

Designed and developed by **Shrushti Swarnakar**.
