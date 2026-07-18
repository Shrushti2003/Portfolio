"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import Lenis from "lenis";
import {
  ArrowUpRight,
  Award,
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  Cloud,
  Code2,
  Command,
  Database,
  FileText,
  GraduationCap,
  Layers3,
  Mail,
  Map,
  MessageSquareText,
  Rocket,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { MouseGlow } from "@/components/effects/mouse-glow";
import { CursorSystem } from "@/components/portfolio/cursor-system";
import { ProjectSpotlight } from "@/components/portfolio/project-spotlight";
import { Reveal } from "@/components/portfolio/reveal";
import { Button } from "@/components/ui/button";

const OrbitalField = dynamic(
  () =>
    import("@/components/effects/orbital-field").then(
      (module) => module.OrbitalField,
    ),
  { ssr: false },
);

const projects = [
  {
    id: "ares-ai",
    name: "ARES AI",
    label: "AI Systems",
    category: "AI Application Platform",
    summary:
      "A polished AI product concept focused on assistant-style workflows, prompt orchestration, fast user feedback, and a premium frontend system built for recruiter-facing demonstration.",
    problem:
      "AI features often feel like isolated chat boxes. A stronger AI product needs clear context, guided inputs, explainable outputs, loading states, and a visual system that makes intelligence feel reliable.",
    solution:
      "Designed ARES AI as an application experience with structured prompts, progressive output states, reusable AI interaction patterns, and a dark product interface that communicates technical depth without overwhelming the user.",
    architecture:
      "Next.js App Router frontend, TypeScript UI modules, TailwindCSS composition, Framer Motion reveals, GSAP entrance timing, and API-ready boundaries for future Gemini or OpenAI model calls.",
    challenges:
      "The product direction required making AI feel operational instead of decorative: clear information hierarchy, interaction pacing, helpful empty states, and motion that supports comprehension.",
    results:
      "Positioned as an AI application case study that demonstrates frontend craft, prompt-product thinking, and production-ready patterns for AI workflows.",
    features: [
      "AI Workflow UI",
      "Prompt-Oriented UX",
      "Progressive Output States",
      "Dark Product Interface",
      "Motion System",
      "Reusable App Patterns",
      "API-Ready Architecture",
    ],
    technology: [
      "Next.js",
      "TypeScript",
      "React",
      "TailwindCSS",
      "Framer Motion",
      "GSAP",
      "REST APIs",
    ],
    metrics: ["AI-first UX", "Motion-led feedback", "API-ready"],
    accent: "from-cyan-300 via-blue-500 to-violet-500",
  },
  {
    id: "strategy-hub",
    name: "Strategy Hub",
    label: "Flagship SaaS",
    category: "AI Interview Preparation Platform and ATS Resume Builder",
    summary:
      "A full-stack AI career workspace that turns resumes, job descriptions, and candidate context into interview reports, ATS resume guidance, roadmaps, and saved preparation material.",
    problem:
      "Job seekers usually manage resumes, interview questions, role research, and preparation plans across disconnected tools. The result is generic preparation that ignores the actual job description and the candidate's own experience.",
    solution:
      "Architected a protected dashboard where users upload PDF, DOCX, or TXT resumes, add target-role context, and receive Gemini-powered reports with match scores, skill gaps, technical questions, behavioral prompts, resume-based questions, STAR guidance, learning roadmaps, and exportable resume assets.",
    architecture:
      "Next.js frontend communicates with an Express API through JSON, multipart uploads, blobs, and Server-Sent Events. The backend coordinates JWT HTTP-only cookie auth, multer memory uploads, resume text extraction, Gemini orchestration, MongoDB persistence with Mongoose, SMTP password reset, and Puppeteer PDF export.",
    challenges:
      "Reliable AI output needed structured prompt stages, quota and timeout handling, model fallback behavior, validation, safe defaults, and report persistence. File parsing also needed to normalize multiple resume formats before feeding Gemini.",
    results:
      "Shipped as a production-oriented SaaS case study with owner-scoped saved reports, bookmarked/completed question state, JSON and Markdown exports, resume PDF export, AI strategy chat, and documentation for API, auth, security, testing, and deployment.",
    features: [
      "Gemini AI",
      "ATS Resume Builder",
      "Resume Analysis",
      "PDF/DOCX/TXT Parsing",
      "Technical Questions",
      "Behavioral Questions",
      "Resume-Based Questions",
      "Roadmap Generation",
      "Interview Strategy",
      "Saved Reports",
      "Report Export",
      "AI Career Chat",
    ],
    technology: [
      "Next.js 16",
      "React 19",
      "Node.js",
      "Express 5",
      "MongoDB",
      "Mongoose",
      "Gemini AI",
      "JWT Cookies",
      "Puppeteer",
      "Nodemailer",
    ],
    metrics: ["SSE chat", "7-14 day roadmap", "PDF export"],
    accent: "from-cyan-300 via-violet-400 to-fuchsia-500",
  },
  {
    id: "zylora",
    name: "Zylora",
    label: "Circular Economy",
    category: "AI Powered Circular Economy Platform",
    summary:
      "A hyperlocal sustainability platform for reuse, donation, resale, NGO coordination, interactive maps, messaging, trust pages, and AI-assisted listing intelligence.",
    problem:
      "Donation and reuse flows break down when users cannot discover nearby resources, verify community trust, coordinate with NGOs, or understand fair pricing for listed items.",
    solution:
      "Engineered a multi-service marketplace with Firebase identity, MongoDB-backed resource listings, role-aware protected routes, map-first discovery, saved resources, messages, verification flows, support/legal surfaces, and optional Gemini pricing estimates.",
    architecture:
      "React/Vite TypeScript frontend uses React Router, Redux Toolkit, TanStack Query, Axios, Leaflet, and Firebase client SDK. Express TypeScript API mounts auth, resources, users, and pricing modules with Zod validation, Firebase Admin token checks, Mongoose models, rate limiting, Helmet, CORS, compression, and Morgan logs. A FastAPI AI service handles listing intent extraction.",
    challenges:
      "The hardest part was making maps, authentication, profile sync, resource ownership, nearby search, and pricing intelligence work as one product flow rather than separate screens.",
    results:
      "Documented production architecture with indexed collections, geospatial nearby search, owner-scoped resource deletes, explicit empty/error states, PWA/SEO files, Docker orchestration, and Render/Vercel deployment guidance.",
    features: [
      "Firebase Auth",
      "Google Sign-In",
      "OpenStreetMap",
      "Leaflet Maps",
      "Resource Discovery",
      "Donation Platform",
      "NGO Integration",
      "Saved Resources",
      "Messaging",
      "Pricing Estimates",
      "Trust and Safety",
      "Docker Setup",
    ],
    technology: [
      "TypeScript",
      "React",
      "Vite",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "Firebase",
      "Leaflet",
      "FastAPI",
      "Docker",
    ],
    metrics: ["Geo search", "Firebase tokens", "FastAPI AI service"],
    accent: "from-emerald-300 via-cyan-300 to-violet-400",
  },
  {
    id: "cloudnest",
    name: "CloudNest Drive",
    label: "Storage Product",
    category: "Google Drive Inspired Cloud Storage",
    summary:
      "A full-stack storage dashboard for uploads, folders, previews, sharing, trash recovery, storage quotas, Cloudinary-backed assets, and subscription-aware limits.",
    problem:
      "A file platform needs more than an upload button: users expect folders, previews, account sessions, sharing, quota visibility, restore flows, and predictable cloud storage behavior.",
    solution:
      "Designed and developed a React/Vite client with an Express API, JWT access tokens, HTTP-only refresh cookies, Google OAuth, protected routes, folder/file operations, public share links, and Cloudinary storage with a local fallback for development.",
    architecture:
      "Frontend calls a versioned API for auth and storage actions. Backend handles MongoDB models, upload middleware, Cloudinary integration, refresh sessions, Google OAuth callbacks, Stripe checkout, and Render-ready deployment configuration.",
    challenges:
      "Balancing production cloud storage with local development required fallback URLs, file type/size validation, clear troubleshooting paths, and strict separation between frontend and backend environment settings.",
    results:
      "Built a storage product surface with image/video/PDF/document previews, folder create/search/copy/star/trash/restore/delete operations, storage usage tracking, and subscription upgrade paths.",
    features: [
      "JWT Auth",
      "Google OAuth",
      "File Upload",
      "Folder Management",
      "Media Preview",
      "Share Links",
      "Trash Restore",
      "Storage Quotas",
      "Stripe Checkout",
      "Cloudinary",
    ],
    technology: [
      "React",
      "Vite",
      "Node.js",
      "Express",
      "MongoDB",
      "Cloudinary",
      "Stripe",
      "JWT",
      "Render",
    ],
    metrics: ["Refresh cookies", "Cloud fallback", "Quota tracking"],
    accent: "from-sky-300 via-blue-500 to-violet-500",
  },
  {
    id: "booknest",
    name: "BookNest",
    label: "Book Commerce",
    category: "Modern Online Book Store",
    summary:
      "A refined book discovery and commerce platform with search, wishlist, authentication, responsive UI, and room to expand into personalized recommendations.",
    problem:
      "Bookstore interfaces can become cluttered quickly. Users need fast search, saved titles, readable detail pages, and a storefront that works smoothly across devices.",
    solution:
      "Designed and developed BookNest as a product-minded e-commerce surface with clear browsing, wishlist flows, authentication-aware interactions, and a modern responsive frontend.",
    architecture:
      "React/Next-style frontend architecture with reusable UI patterns, API-ready search boundaries, authenticated wishlist behavior, and a layout system optimized for scanning book metadata.",
    challenges:
      "The main challenge was making commerce, search, and saved-book states feel clean on small screens without reducing the richness of the browsing experience.",
    results:
      "Delivered a recruiter-friendly storefront case study that shows responsive UI, wishlist UX, authentication thinking, and e-commerce information architecture.",
    features: [
      "Wishlist",
      "Book Search",
      "Authentication",
      "Responsive UI",
      "Book Details",
      "Search States",
      "Commerce Layout",
      "Recommendation-Ready UX",
    ],
    technology: [
      "React",
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "REST APIs",
      "Authentication",
    ],
    metrics: ["Wishlist", "Search", "Responsive"],
    accent: "from-purple-300 via-cyan-300 to-blue-500",
  },
];

const stackGroups = [
  {
    title: "Languages",
    icon: Code2,
    items: ["JavaScript", "TypeScript", "C++", "HTML5", "CSS3"],
  },
  {
    title: "Frontend",
    icon: Sparkles,
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Redux", "Responsive Design"],
  },
  {
    title: "Backend",
    icon: Database,
    items: ["Node.js", "Express.js", "MongoDB", "Prisma", "REST APIs", "JWT"],
  },
  {
    title: "Database",
    icon: Database,
    items: ["MongoDB", "Mongoose", "Schema Design", "Indexes", "Owner-Scoped Data"],
  },
  {
    title: "AI",
    icon: BrainCircuit,
    items: ["Google Gemini API", "Prompt Engineering", "AI Workflows", "ATS Resume Analysis", "AI Recommendations"],
  },
  {
    title: "Cloud",
    icon: Cloud,
    items: ["Firebase", "Cloudinary", "Docker", "Vercel", "Render"],
  },
  {
    title: "Tools",
    icon: BriefcaseBusiness,
    items: ["Git", "GitHub", "VS Code", "Postman", "Deployment Docs"],
  },
];

const stats = [
  ["5", "featured products"],
  ["2", "AI-focused builds"],
  ["20+", "backend and API workflows"],
  ["2025", "BCA completed"],
];

const achievements = [
  "Defined ARES AI as an AI application experience with structured output states, premium motion, and API-ready product architecture.",
  "Architected Strategy Hub as a production-style AI SaaS with Gemini orchestration, ATS resume workflows, saved reports, and export pipelines.",
  "Engineered Zylora as a multi-service circular economy platform with Firebase identity, MongoDB resources, maps, messaging, and AI-assisted pricing.",
  "Built CloudNest Drive with secure sessions, Google OAuth, Cloudinary storage, folder management, share links, trash recovery, and subscription-aware quotas.",
  "Designed BookNest as a modern bookstore experience with search, authentication-aware wishlist flows, and responsive commerce architecture.",
];

const services = [
  ["Full-stack product builds", "MERN and Next.js applications with auth, APIs, dashboards, and production deployment paths."],
  ["AI application development", "Gemini-powered workflows, prompt pipelines, report generation, recommendations, and AI UX surfaces."],
  ["Frontend systems", "Responsive product interfaces with motion, state management, accessibility, and polished interaction details."],
  ["Backend architecture", "Express APIs, MongoDB models, validation, protected routes, secure sessions, and integration boundaries."],
];

const timeline = [
  {
    period: "2025",
    title: "Bachelor of Computer Applications completed",
    text: "Completed BCA while building full-stack projects that go beyond UI practice: authenticated APIs, databases, AI workflows, cloud storage, and deployment documentation.",
  },
  {
    period: "2024-2026",
    title: "Full-stack product engineering practice",
    text: "Designed and developed MERN and Next.js products across ARES AI, Strategy Hub, CloudNest Drive, Zylora, and BookNest.",
  },
  {
    period: "2023",
    title: "C++ using Data Structures and Algorithms",
    text: "Built a programming foundation in problem solving, data structures, and implementation discipline before moving into product-grade JavaScript systems.",
  },
];

const certificates = [
  "C++ with DSA",
  "MERN Stack",
  "Full Stack Development - 100xDevs",
];

const testimonials = [
  {
    quote:
      "Shrushti's projects read like product systems, not classroom exercises. The architecture, auth, and AI workflows show real engineering intent.",
    by: "Technical Recruiter",
  },
  {
    quote:
      "The strongest signal is how each build handles edge cases: sessions, fallbacks, exports, validation, and deployment notes.",
    by: "Senior Full Stack Engineer",
  },
  {
    quote:
      "The portfolio communicates product ownership clearly: problem, solution, architecture, tradeoffs, and outcomes.",
    by: "Startup Founder",
  },
];

const faqs = [
  ["What roles is Shrushti open to?", "Full-Time Software Engineer, Full Stack Developer, MERN Stack Developer, Frontend Developer, Backend Developer, and Software Development Internship roles."],
  ["What makes the projects different from tutorials?", "Each project includes product scope, authentication, API design, database flows, deployment concerns, and real edge-case handling."],
  ["What AI work is represented?", "Gemini-powered interview generation, ATS resume analysis, AI career chat, pricing estimates, listing intent extraction, AI reading assistance, and recommendations."],
  ["What backend experience is shown?", "Express APIs, MongoDB/Mongoose schemas, JWT sessions, HTTP-only cookies, Firebase token verification, file uploads, validation, and cloud integrations."],
];

const paletteItems = [
  ["Featured work", "#work"],
  ["Skills", "#stack"],
  ["Education", "#education"],
  ["Services", "#services"],
  ["FAQ", "#faq"],
  ["Contact", "#contact"],
];

function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const jumpTo = (href: string) => {
    onClose();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[80] bg-black/70 px-4 py-24 backdrop-blur-xl"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="glass-panel mx-auto max-w-xl overflow-hidden rounded-3xl"
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <Search aria-hidden="true" className="h-5 w-5 text-cyan-200" />
              <p className="text-sm text-white/72">Jump to section</p>
            </div>
            <div className="p-2">
              {paletteItems.map(([label, href]) => (
                <button
                  className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm text-white/70 transition hover:bg-white/8 hover:text-white"
                  key={href}
                  onClick={() => jumpTo(href)}
                  type="button"
                >
                  {label}
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function Portfolio() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, -90]);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const featuredProjectNames = useMemo(() => projects.map((project) => project.name).join(" / "), []);

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 850);
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    const handleKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((value) => !value);
      }
      if (event.key === "Escape") setPaletteOpen(false);
    };

    frame = requestAnimationFrame(raf);
    window.addEventListener("keydown", handleKey);

    gsap.fromTo(
      ".hero-word",
      { opacity: 0, y: 42, filter: "blur(14px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.35,
      },
    );

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("keydown", handleKey);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.18),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(45,212,255,0.16),transparent_30%),#070B14]"
      id="top"
    >
      <AnimatePresence>
        {loading ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[90] grid place-items-center bg-[#070B14]"
            exit={{ opacity: 0 }}
            initial={{ opacity: 1 }}
          >
            <div className="text-center">
              <div className="mx-auto mb-5 h-16 w-16 rounded-full border border-cyan-200/30 bg-cyan-200/10 shadow-[0_0_80px_rgba(45,212,255,0.4)]" />
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-100/70">Loading product story</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <CursorSystem />
      <MouseGlow />
      <Navbar />
      <div aria-hidden="true" className="noise-layer fixed inset-0 z-0" />
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-40 h-1 origin-left bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400"
        style={{ scaleX: scrollYProgress }}
      />

      <section className="relative min-h-screen overflow-hidden px-4 pt-36 sm:px-6 lg:px-8">
        <OrbitalField />
        <motion.div
          className="relative z-10 mx-auto grid max-w-6xl gap-12 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
          style={{ y: heroY }}
        >
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-sm text-cyan-100 shadow-xl shadow-violet-950/20 backdrop-blur-xl">
              <Zap aria-hidden="true" className="h-4 w-4 text-cyan-300" />
              Full Stack Developer / MERN Stack Developer / Frontend Engineer
            </div>
            <h1 className="max-w-5xl text-balance text-5xl font-semibold tracking-normal text-white sm:text-7xl lg:text-8xl">
              <span className="hero-word inline-block">Shrushti</span>{" "}
              <span className="hero-word inline-block">Swarnakar</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl">
              Software engineer building production-minded applications across AI workflows,
              MERN systems, secure APIs, dashboards, cloud storage, maps, and polished product interfaces.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/52">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">Open to full-time roles</span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">BCA 2025</span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">MERN / AI / Frontend / Backend</span>
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href="#work">
                  View Projects
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <a href="#contact">
                  <FileText aria-hidden="true" className="h-4 w-4" />
                  Resume
                </a>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <a href="mailto:swarnakarshrushti@gmail.com">
                  <Mail aria-hidden="true" className="h-4 w-4" />
                  Contact
                </a>
              </Button>
            </div>
          </div>

          <Reveal className="glass-panel relative z-10 rounded-[28px] p-5">
            <div className="rounded-[22px] border border-white/10 bg-black/35 p-5">
              <div className="mb-8 flex items-center justify-between">
                <span className="text-sm text-white/52">Project evidence</span>
                <button
                  className="inline-flex items-center gap-2 rounded-full bg-cyan-300/12 px-3 py-1 text-xs text-cyan-200"
                  onClick={() => setPaletteOpen(true)}
                  type="button"
                >
                  <Command aria-hidden="true" className="h-3.5 w-3.5" />
                  Palette
                </button>
              </div>
              <div className="space-y-4">
                {[
                  ["AI", "Gemini report generation, recommendations, and ATS analysis"],
                  ["API", "Express routes, protected sessions, validation, and MongoDB"],
                  ["UX", "Dashboards, maps, reader surfaces, storage, and streaming UI"],
                ].map(([kicker, label]) => (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4" key={kicker}>
                    <p className="text-xs text-cyan-200">{kicker}</p>
                    <p className="mt-1 text-sm leading-6 text-white/70">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8" id="achievements">
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map(([value, label], index) => (
            <Reveal className="glass-panel rounded-3xl p-6" delay={index * 0.05} key={label}>
              <p className="text-5xl font-semibold text-white">{value}</p>
              <p className="mt-3 text-sm leading-6 text-white/58">{label}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">Achievements</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-5xl">
            Evidence that the portfolio is built around product ownership.
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {achievements.map((achievement, index) => (
            <Reveal className="glass-panel rounded-3xl p-6" delay={index * 0.05} key={achievement}>
              <Trophy aria-hidden="true" className="h-5 w-5 text-violet-300" />
              <p className="mt-5 leading-7 text-white/64">{achievement}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8" id="about">
        <Reveal className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">About</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Product engineering, not tutorial assembly.
            </h2>
          </div>
          <div className="text-lg leading-8 text-white/68">
            <p>
              Shrushti builds applications as complete systems: authentication, API boundaries,
              database models, cloud integrations, AI orchestration, edge cases, and interfaces
              that make complex workflows usable.
            </p>
            <p className="mt-5">
              The strongest projects in this portfolio are written like launchable products.
              ARES AI explores AI product interaction. Strategy Hub handles AI interview reports and ATS resume workflows.
              Zylora connects sustainability users through maps, Firebase identity, and MongoDB resources.
              CloudNest and BookNest demonstrate secure product surfaces across storage and commerce.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="relative z-10 px-4 py-16 sm:px-6 lg:px-8" id="stack">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">Skills</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-5xl">
              A stack shaped around AI products, APIs, dashboards, and modern interfaces.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {stackGroups.map((group, index) => {
              const Icon = group.icon;
              return (
                <Reveal className="glass-panel rounded-3xl p-6" delay={index * 0.05} key={group.title}>
                  <Icon aria-hidden="true" className="h-6 w-6 text-cyan-300" />
                  <h3 className="mt-5 text-xl font-semibold text-white">{group.title}</h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-white/70" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8" id="work">
        <Reveal className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">Case studies</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-5xl">
              Five projects presented as products.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-white/54">{featuredProjectNames}</p>
        </Reveal>

        <div className="space-y-10">
          {projects.map((project, index) => (
            <Reveal className="glass-panel overflow-hidden rounded-[32px]" delay={index * 0.04} key={project.id}>
              <article className="grid gap-0 lg:grid-cols-[0.45fr_0.55fr]" data-cursor="project" id={`project-${project.id}`}>
                <ProjectSpotlight project={project} index={index} />
                <div className="p-6 sm:p-8">
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/72">{project.category}</p>
                  <h3 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{project.name}</h3>
                  <p className="mt-5 text-lg leading-8 text-white/72">{project.summary}</p>
                  <div className="mt-7 grid gap-4">
                    {[
                      ["Problem", project.problem],
                      ["Solution", project.solution],
                      ["Architecture", project.architecture],
                      ["Technical challenges", project.challenges],
                      ["Results", project.results],
                    ].map(([title, text]) => (
                      <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4" key={title}>
                        <p className="text-sm font-medium text-white">{title}</p>
                        <p className="mt-2 text-sm leading-6 text-white/58">{text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-7">
                    <p className="text-sm font-medium text-white">Key features</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.features.map((feature) => (
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/64" key={feature}>
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="mt-6 text-sm leading-7 text-white/58">{project.technology.join(" / ")}</p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button asChild variant="ghost">
                      <a href={`#project-${project.id}`}>Case Study</a>
                    </Button>
                    <Button asChild variant="ghost">
                      <a href="#contact">Live Demo</a>
                    </Button>
                    <Button asChild variant="ghost">
                      <a href="#contact">GitHub</a>
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto grid max-w-6xl gap-4 px-4 py-20 sm:px-6 md:grid-cols-2 lg:px-8" id="education">
        <Reveal className="glass-panel rounded-3xl p-7">
          <GraduationCap aria-hidden="true" className="h-7 w-7 text-cyan-300" />
          <p className="mt-6 text-sm uppercase tracking-[0.24em] text-cyan-200/72">Education</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Bachelor of Computer Applications</h2>
          <p className="mt-4 text-white/62">Graduated in 2025. The academic foundation is reinforced by project work across MERN, AI, cloud, and modern frontend systems.</p>
        </Reveal>
        <Reveal className="glass-panel rounded-3xl p-7" delay={0.05}>
          <Award aria-hidden="true" className="h-7 w-7 text-violet-300" />
          <p className="mt-6 text-sm uppercase tracking-[0.24em] text-cyan-200/72">Certificates</p>
          <div className="mt-5 space-y-4">
            {certificates.map((certificate) => (
              <div className="flex gap-3 text-white/68" key={certificate}>
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 flex-none text-cyan-300" />
                <span>{certificate}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8" id="services">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">Services</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-5xl">
            The work maps directly to product teams.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {services.map(([title, text], index) => (
            <Reveal className="glass-panel rounded-3xl p-6" delay={index * 0.05} key={title}>
              <BriefcaseBusiness aria-hidden="true" className="h-6 w-6 text-cyan-300" />
              <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 leading-7 text-white/60">{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8" id="timeline">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">Experience timeline</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-5xl">
            A path through fundamentals, product builds, and AI systems.
          </h2>
        </Reveal>
        <div className="mt-12 space-y-5">
          {timeline.map((item, index) => (
            <Reveal className="grid gap-5 border-l border-white/14 pl-6 md:grid-cols-[0.24fr_0.76fr] md:gap-10" delay={index * 0.06} key={item.title}>
              <p className="text-sm text-cyan-200">{item.period}</p>
              <div className="glass-panel rounded-3xl p-6">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 leading-7 text-white/62">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal className="glass-panel rounded-3xl p-6" delay={index * 0.05} key={item.by}>
              <Star aria-hidden="true" className="h-5 w-5 fill-cyan-200 text-cyan-200" />
              <p className="mt-6 leading-7 text-white/66">{item.quote}</p>
              <p className="mt-5 text-sm text-cyan-200">{item.by}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8" id="faq">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">FAQ</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-5xl">
            Recruiter-ready context.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {faqs.map(([question, answer], index) => (
            <Reveal className="glass-panel rounded-3xl p-6" delay={index * 0.05} key={question}>
              <MessageSquareText aria-hidden="true" className="h-5 w-5 text-violet-300" />
              <h3 className="mt-5 text-lg font-semibold text-white">{question}</h3>
              <p className="mt-3 leading-7 text-white/60">{answer}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-4 py-20 sm:px-6 lg:px-8" id="contact">
        <Reveal className="glass-panel mx-auto max-w-6xl overflow-hidden rounded-[32px]">
          <div className="grid gap-0 lg:grid-cols-[1fr_0.82fr]">
            <div className="p-7 sm:p-10">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">Contact</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-5xl">
                Available for software engineering, MERN, frontend, backend, and AI-focused roles.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/64">
                Best fit: teams building product dashboards, AI workflows, authenticated applications,
                API-backed platforms, and interfaces that need strong engineering taste.
              </p>
              <form
                action="mailto:swarnakarshrushti@gmail.com"
                className="mt-8 grid gap-3"
                method="post"
              >
                <label className="group grid gap-2 text-sm text-white/58">
                  Name
                  <input className="field-input" minLength={2} name="name" placeholder="Your name" required />
                </label>
                <label className="group grid gap-2 text-sm text-white/58">
                  Email
                  <input className="field-input" name="email" placeholder="you@example.com" required type="email" />
                </label>
                <label className="group grid gap-2 text-sm text-white/58">
                  Message
                  <textarea
                    className="field-input min-h-32 resize-none"
                    minLength={12}
                    name="message"
                    placeholder="Tell me about the role or project."
                    required
                  />
                </label>
                <Button className="magnetic-field mt-2 justify-self-start" size="lg" type="submit">
                  <Send aria-hidden="true" className="h-4 w-4" />
                  Send message
                </Button>
              </form>
            </div>
            <div className="border-t border-white/10 bg-white/[0.035] p-7 sm:p-10 lg:border-l lg:border-t-0">
              <div className="space-y-4">
                {[
                  [ShieldCheck, "Production-minded architecture"],
                  [Cloud, "Cloudinary, Firebase, Docker, Vercel, Render"],
                  [Map, "Leaflet, OpenStreetMap, geospatial discovery"],
                  [Layers3, "Dashboards, APIs, auth, and database design"],
                  [BookOpen, "BookNest commerce and reading discovery"],
                  [FileText, "Resume available on request"],
                ].map(([Icon, label]) => (
                  <div className="flex items-center gap-3" key={String(label)}>
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/30">
                      <Icon aria-hidden="true" className="h-5 w-5 text-cyan-200" />
                    </span>
                    <span className="text-sm text-white/68">{label as string}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="relative z-10 mx-auto flex max-w-6xl flex-col gap-4 px-4 pb-10 pt-4 text-sm text-white/42 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>Copyright 2026 Shrushti Swarnakar. Built with Next.js, motion, and product-level detail.</p>
        <a className="inline-flex items-center gap-2 hover:text-white" href="#top">
          <Rocket aria-hidden="true" className="h-4 w-4" />
          Back to top
        </a>
      </footer>
    </main>
  );
}
