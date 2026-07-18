"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import Lenis from "lenis";
import {
  ArrowUpRight,
  Award,
  BrainCircuit,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  ExternalLink,
  FileText,
  GraduationCap,
  Layers3,
  Mail,
  Rocket,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Trophy,
  X,
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

type Project = {
  id: string;
  name: string;
  label: string;
  category: string;
  overview: string;
  problem: string;
  solution: string;
  architecture: string;
  challenges: string;
  learning: string;
  features: string[];
  technology: string[];
  gallery: string[];
  metrics: string[];
  accent: string;
};

const projects: Project[] = [
  {
    id: "strategy-hub",
    name: "Strategy Hub",
    label: "Flagship",
    category: "AI Interview Preparation Platform",
    overview:
      "A full-stack career preparation workspace that analyzes resumes and job descriptions, then generates interview reports, ATS guidance, roadmaps, and saved preparation material.",
    problem:
      "Interview preparation is usually scattered across resumes, notes, job descriptions, and generic question banks.",
    solution:
      "Built a protected dashboard where users upload resumes, add target-role context, and receive structured AI reports with match scores, skill gaps, questions, and exportable preparation assets.",
    architecture:
      "Next.js frontend, Express API, MongoDB/Mongoose persistence, JWT HTTP-only cookie auth, file upload parsing, Gemini orchestration, SMTP reset flow, and PDF export.",
    challenges:
      "Normalizing resume files, keeping AI output structured, handling timeout/quota states, and making report data easy to revisit.",
    learning:
      "Improved my understanding of full-stack product flow, secure auth, file handling, AI prompt design, and dashboard information architecture.",
    features: [
      "Gemini AI Reports",
      "ATS Resume Guidance",
      "PDF/DOCX/TXT Parsing",
      "Saved Reports",
      "Roadmap Generation",
      "AI Career Chat",
      "PDF Export",
    ],
    technology: [
      "Next.js",
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Gemini AI",
    ],
    gallery: ["Resume upload", "AI report", "Roadmap", "Saved dashboard"],
    metrics: ["AI reports", "JWT auth", "PDF export"],
    accent: "from-cyan-300 via-violet-400 to-fuchsia-500",
  },
  {
    id: "zylora",
    name: "Zylora",
    label: "Sustainability",
    category: "Circular Economy Platform",
    overview:
      "A hyperlocal reuse and donation platform with resource listings, maps, authentication, saved items, messaging, and AI-assisted pricing ideas.",
    problem:
      "People often want to donate, reuse, or resell items, but discovery, trust, and local coordination are hard to manage.",
    solution:
      "Created a map-first product experience with Firebase identity, MongoDB resources, role-aware routes, nearby discovery, and clean empty/error states.",
    architecture:
      "React/Vite TypeScript client, Redux Toolkit, TanStack Query, Firebase Auth, Express TypeScript API, MongoDB/Mongoose, Leaflet maps, and a FastAPI AI service.",
    challenges:
      "Making maps, auth, resource ownership, saved resources, and pricing intelligence feel like one connected product.",
    learning:
      "Strengthened my skills in protected routes, Firebase token handling, geospatial UX, API validation, and multi-service project structure.",
    features: [
      "Google Sign-In",
      "Leaflet Maps",
      "Nearby Search",
      "Resource Listings",
      "Saved Items",
      "Messaging",
      "AI Pricing",
    ],
    technology: [
      "React",
      "TypeScript",
      "Vite",
      "Node.js",
      "Express",
      "MongoDB",
      "Firebase",
      "Leaflet",
      "Docker",
    ],
    gallery: ["Map discovery", "Listing page", "Saved resources", "Profile flow"],
    metrics: ["Geo search", "Firebase auth", "Docker setup"],
    accent: "from-emerald-300 via-cyan-300 to-violet-400",
  },
  {
    id: "cloudnest",
    name: "CloudNest Drive",
    label: "Storage",
    category: "Cloud Storage Dashboard",
    overview:
      "A Google Drive-inspired storage product with uploads, folders, previews, sharing, trash recovery, storage quotas, and Cloudinary-backed assets.",
    problem:
      "A useful storage app needs clear folder flows, account sessions, preview states, sharing, restore behavior, and quota feedback.",
    solution:
      "Built a dashboard-style client with an Express API, JWT sessions, Google OAuth, folder/file actions, public share links, and cloud upload handling.",
    architecture:
      "React/Vite frontend, Express backend, MongoDB models, JWT access tokens, HTTP-only refresh cookies, Cloudinary, Google OAuth, Stripe checkout, and Render deployment notes.",
    challenges:
      "Balancing production cloud uploads with local fallback behavior, file validations, preview states, and secure session handling.",
    learning:
      "Learned more about cloud asset pipelines, refresh sessions, upload middleware, and product-grade dashboard states.",
    features: [
      "File Uploads",
      "Folders",
      "Media Preview",
      "Share Links",
      "Trash Restore",
      "Storage Quotas",
      "Google OAuth",
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
    ],
    gallery: ["Drive dashboard", "Preview panel", "Trash recovery", "Quota card"],
    metrics: ["Cloudinary", "Refresh cookies", "Quota tracking"],
    accent: "from-sky-300 via-blue-500 to-violet-500",
  },
  {
    id: "booknest",
    name: "BookNest",
    label: "Commerce",
    category: "Online Book Store",
    overview:
      "A responsive bookstore experience focused on browsing, search, wishlist behavior, clean product detail pages, and authentication-aware interactions.",
    problem:
      "Bookstore UIs can become cluttered quickly, especially when search, wishlists, and detail pages compete for attention.",
    solution:
      "Designed a calmer commerce flow with readable metadata, clear cards, saved-book states, and responsive layouts for scanning.",
    architecture:
      "Reusable React/Next-style components, API-ready search boundaries, authenticated wishlist thinking, and a layout system tuned for product browsing.",
    challenges:
      "Keeping browsing rich on desktop while making the same flows compact and readable on mobile.",
    learning:
      "Practiced e-commerce information architecture, responsive card systems, form states, and cleaner frontend composition.",
    features: [
      "Book Search",
      "Wishlist",
      "Auth-Aware UI",
      "Book Details",
      "Responsive Storefront",
      "Search States",
    ],
    technology: ["React", "Next.js", "TypeScript", "TailwindCSS", "REST APIs"],
    gallery: ["Storefront", "Book details", "Wishlist", "Search results"],
    metrics: ["Wishlist", "Search", "Responsive"],
    accent: "from-purple-300 via-cyan-300 to-blue-500",
  },
  {
    id: "netflix-clone",
    name: "Netflix Clone",
    label: "Frontend",
    category: "Streaming UI Clone",
    overview:
      "A frontend-focused streaming interface built to practice polished layouts, media browsing patterns, responsive sections, and clean visual hierarchy.",
    problem:
      "A media UI needs to handle dense visual content without becoming noisy or hard to scan.",
    solution:
      "Built a dark, responsive streaming interface with hero content, category rows, hover states, and recognizable browsing patterns.",
    architecture:
      "React-based UI composition with reusable sections, responsive cards, API-ready content lists, and lightweight state for browsing interactions.",
    challenges:
      "Creating a familiar streaming feel while keeping layout spacing, hover feedback, and mobile behavior smooth.",
    learning:
      "Improved my frontend eye for spacing, dark UI contrast, card rhythm, responsive grids, and interaction polish.",
    features: [
      "Hero Banner",
      "Movie Rows",
      "Hover Effects",
      "Responsive Layout",
      "Media Cards",
      "Dark UI",
    ],
    technology: ["React", "JavaScript", "CSS", "REST APIs", "Responsive Design"],
    gallery: ["Hero row", "Movie grid", "Hover card", "Mobile layout"],
    metrics: ["Frontend UI", "Responsive", "Hover states"],
    accent: "from-red-400 via-fuchsia-400 to-violet-500",
  },
];

const socialLinks = {
  github: "https://github.com/Shrushti2003",
  linkedin: "https://www.linkedin.com/in/shrushti-swarnakar/",
  leetcode: "https://leetcode.com/u/Shrushti2003/",
  resume: "/shrushti-swarnakar-resume.txt",
};

const rotatingRoles = [
  "Full Stack Developer",
  "MERN Stack Developer",
  "Frontend Engineer",
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
    items: ["React", "Next.js", "TailwindCSS", "Framer Motion", "GSAP", "Three.js"],
  },
  {
    title: "Backend",
    icon: Layers3,
    items: ["Node.js", "Express.js", "REST APIs", "JWT", "API Validation"],
  },
  {
    title: "Database",
    icon: Database,
    items: ["MongoDB", "Mongoose", "Prisma", "Indexes", "Schema Design"],
  },
  {
    title: "Cloud",
    icon: Cloud,
    items: ["Firebase", "Cloudinary", "Docker", "Vercel", "Render"],
  },
  {
    title: "AI",
    icon: BrainCircuit,
    items: ["Gemini API", "Prompt Engineering", "AI Reports", "AI UX", "Automation Ideas"],
  },
  {
    title: "Tools",
    icon: Code2,
    items: ["Git", "GitHub", "VS Code", "Postman", "Debugging"],
  },
];

const stats = [
  ["5+", "Production Projects"],
  ["400+", "LeetCode Problems"],
  ["20+", "Technologies"],
  ["7.50", "CGPA"],
  ["2025", "BCA Graduate"],
  ["Open", "For Opportunities"],
];

const timeline = [
  {
    period: "2023",
    title: "Completed C++ using DSA",
    points: ["Built problem-solving fundamentals", "Practiced data structures and implementation discipline"],
  },
  {
    period: "2024",
    title: "Started MERN Stack journey",
    points: ["Built multiple full-stack projects", "Focused on APIs, authentication, databases, and UI polish"],
  },
  {
    period: "2025",
    title: "Completed BCA and shipped stronger projects",
    points: [
      "Completed MERN + Full Stack Development through 100xDevs",
      "Built Strategy Hub, Zylora, CloudNest Drive, BookNest, and Netflix Clone",
    ],
  },
  {
    period: "Current",
    title: "Learning and applying advanced concepts",
    points: [
      "Studying backend architecture, Docker, AI integrations, and system design",
      "Searching for full-time software engineering and internship opportunities",
    ],
  },
];

const certificates = [
  "C++",
  "Data Structures & Algorithms",
  "MERN Stack",
  "Full Stack Development",
  "100xDevs",
];

const paletteItems = [
  ["Home", "#top"],
  ["Projects", "#work"],
  ["About", "#about"],
  ["Skills", "#stack"],
  ["Journey", "#timeline"],
  ["Certificates", "#certificates"],
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

function DeveloperCard() {
  const previewLines = [
    "npm run build-products",
    "✓ auth, APIs, dashboards",
    "✓ AI reports and UX flows",
    "✓ cloud storage and maps",
    "✓ clean UI, motion, polish",
  ];

  return (
    <Reveal className="relative z-10">
      <div className="developer-card rounded-[30px] border border-white/12 bg-[#0E1726]/78 p-5 shadow-2xl shadow-cyan-950/30 backdrop-blur-2xl">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-300" />
            <span className="h-3 w-3 rounded-full bg-emerald-300" />
          </div>
          <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1 text-xs text-cyan-100">
            live project console
          </span>
        </div>
        <div className="rounded-3xl border border-white/10 bg-black/45 p-5 font-mono text-sm leading-7 text-white/76">
          {previewLines.map((line, index) => (
            <motion.p
              className="hero-code-line"
              initial={{ opacity: 0, x: -12 }}
              key={line}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              viewport={{ once: true }}
            >
              <span className="mr-4 text-cyan-300/60">{index + 1}</span>
              {line}
            </motion.p>
          ))}
        </div>
        <a
          className="leetcode-card mt-4 flex items-center justify-between rounded-3xl border border-amber-300/22 bg-amber-300/[0.07] p-4 text-white"
          data-cursor="project"
          href={socialLinks.leetcode}
          rel="noreferrer"
          target="_blank"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-amber-200/80">LeetCode</p>
            <p className="mt-1 text-3xl font-semibold">400+</p>
            <p className="text-sm text-white/56">Problems Solved - 2023-2026</p>
          </div>
          <motion.span
            animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.08, 1] }}
            className="grid h-12 w-12 place-items-center rounded-full bg-amber-300/15 text-amber-200"
            transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.2 }}
          >
            <Trophy aria-hidden="true" className="h-6 w-6" />
          </motion.span>
        </a>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {projects.slice(0, 4).map((project, index) => (
            <motion.a
              className="floating-project rounded-2xl border border-white/10 bg-white/[0.045] p-4"
              data-cursor="project"
              href={`#project-${project.id}`}
              key={project.id}
              style={{ transform: `translateY(${index % 2 === 0 ? 0 : 12}px)` }}
              whileHover={{ y: -6, scale: 1.03 }}
            >
              <p className="text-xs text-cyan-200">{project.label}</p>
              <p className="mt-2 text-sm font-semibold text-white">{project.name}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose, project]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[85] overflow-y-auto bg-[#050812]/86 px-4 py-8 backdrop-blur-2xl"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
        >
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-white/12 bg-[#0E1726] shadow-2xl shadow-black/50"
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={`animated-gradient h-2 bg-gradient-to-r ${project.accent}`} />
            <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5 sm:p-7">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-cyan-200/74">{project.category}</p>
                <h2 className="mt-3 text-3xl font-semibold text-white" id="case-study-title">
                  {project.name}
                </h2>
              </div>
              <button
                aria-label="Close case study"
                className="grid h-11 w-11 flex-none place-items-center rounded-full border border-white/12 bg-white/[0.05] text-white transition hover:bg-white/10"
                onClick={onClose}
                type="button"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
            <div className="grid gap-5 p-5 sm:p-7 lg:grid-cols-[0.78fr_0.42fr]">
              <div className="space-y-4">
                {[
                  ["Overview", project.overview],
                  ["Problem", project.problem],
                  ["Solution", project.solution],
                  ["Architecture", project.architecture],
                  ["Challenges", project.challenges],
                  ["Learning Outcomes", project.learning],
                ].map(([title, text]) => (
                  <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-5" key={title}>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100">{title}</h3>
                    <p className="mt-3 leading-7 text-white/66">{text}</p>
                  </section>
                ))}
              </div>
              <aside className="space-y-4">
                <div className="rounded-3xl border border-white/10 bg-black/24 p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100">Tech Stack</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technology.map((item) => (
                      <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-white/68" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-black/24 p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100">Features</h3>
                  <div className="mt-4 grid gap-2">
                    {project.features.map((feature) => (
                      <div className="flex items-center gap-2 text-sm text-white/68" key={feature}>
                        <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-cyan-300" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-black/24 p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100">Gallery</h3>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {project.gallery.map((item) => (
                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-xs text-white/62" key={item}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function Portfolio() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, -80]);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  const featuredProjectNames = useMemo(() => projects.map((project) => project.name).join(" / "), []);

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 1650);
    const roleTimer = window.setInterval(
      () => setRoleIndex((value) => (value + 1) % rotatingRoles.length),
      2200,
    );
    const lenis = new Lenis({ lerp: 0.075, smoothWheel: true });
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
      { opacity: 0, y: 38, clipPath: "inset(0 0 100% 0)", filter: "blur(12px)" },
      {
        opacity: 1,
        y: 0,
        clipPath: "inset(0 0 0% 0)",
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.35,
      },
    );

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(roleTimer);
      window.removeEventListener("keydown", handleKey);
      cancelAnimationFrame(frame);
      lenis.destroy();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(129,140,248,0.16),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(34,211,238,0.16),transparent_30%),linear-gradient(180deg,#050814_0%,#0B1020_46%,#111827_100%)]"
      id="top"
    >
      <AnimatePresence>
        {loading ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[90] grid place-items-center bg-[#050814]"
            exit={{ opacity: 0 }}
            initial={{ opacity: 1 }}
          >
            <div className="text-center">
              <div className="loader-grid mx-auto mb-5 grid h-20 w-20 place-items-center rounded-3xl border border-cyan-200/30 bg-cyan-200/10 text-lg font-semibold text-cyan-100 shadow-[0_0_80px_rgba(45,212,255,0.38)]">
                <span>SS</span>
              </div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-100/70">Compiling Portfolio</p>
              <p className="mt-3 text-xs text-white/38">Loading Projects - Wiring Motion - Building UI</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <CursorSystem />
      <MouseGlow />
      <Navbar />
      <div aria-hidden="true" className="aurora-field fixed inset-0 z-0" />
      <div aria-hidden="true" className="star-field fixed inset-0 z-0" />
      <div aria-hidden="true" className="noise-layer fixed inset-0 z-0" />
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-40 h-1 origin-left bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400"
        style={{ scaleX: scrollYProgress }}
      />

      <section className="relative min-h-screen overflow-hidden px-4 pt-32 sm:px-6 lg:px-8">
        <OrbitalField />
        <motion.div
          className="relative z-10 mx-auto grid max-w-6xl gap-12 pb-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center"
          style={{ y: heroY }}
        >
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-sm text-cyan-100 shadow-xl shadow-violet-950/20 backdrop-blur-xl">
              <Zap aria-hidden="true" className="h-4 w-4 text-cyan-300" />
              Open to Full-Time - Internship - Graduate Programs
            </div>
            <p className="hero-word text-xl text-white/70">Hi, I&apos;m</p>
            <h1 className="mt-3 max-w-5xl text-balance text-5xl font-semibold tracking-normal text-white sm:text-7xl lg:text-8xl">
              <span className="hero-word inline-block">Shrushti</span>{" "}
              <span className="hero-word inline-block text-cyan-100">Swarnakar</span>
            </h1>
            <div className="mt-5 h-12 overflow-hidden text-2xl font-semibold text-cyan-100 sm:text-4xl">
              <AnimatePresence mode="wait">
                <motion.p
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
                  initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                  key={rotatingRoles[roleIndex]}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                >
                  {rotatingRoles[roleIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
              Building production-quality web applications through real-world projects, continuous learning, strong engineering fundamentals, and modern development practices.
            </p>
            <p className="mt-4 max-w-2xl leading-7 text-white/56">
              BCA Graduate (2025) passionate about scalable MERN applications, intuitive user experiences, secure backend systems, and AI-powered products.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/58">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">BCA 2025 - CGPA 7.50</span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">MERN Stack Developer</span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">400+ LeetCode Problems</span>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild className="magnetic-field" size="lg">
                <a href="#work">
                  View Projects
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild className="magnetic-field" size="lg" variant="ghost">
                <a download href={socialLinks.resume}>
                  <FileText aria-hidden="true" className="h-4 w-4" />
                  Resume
                </a>
              </Button>
              <Button asChild className="magnetic-field" size="lg" variant="ghost">
                <a href="mailto:swarnakarshrushti@gmail.com">
                  <Mail aria-hidden="true" className="h-4 w-4" />
                  Contact
                </a>
              </Button>
              <Button asChild className="magnetic-field" size="lg" variant="ghost">
                <a href={socialLinks.github} rel="noreferrer" target="_blank">
                  <Code2 aria-hidden="true" className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button asChild className="magnetic-field" size="lg" variant="ghost">
                <a href={socialLinks.linkedin} rel="noreferrer" target="_blank">
                  <ExternalLink aria-hidden="true" className="h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
              <Button asChild className="magnetic-field leetcode-button" size="lg" variant="ghost">
                <a href={socialLinks.leetcode} rel="noreferrer" target="_blank">
                  <Trophy aria-hidden="true" className="h-4 w-4" />
                  LeetCode 400+
                </a>
              </Button>
            </div>
          </div>

          <DeveloperCard />
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8" id="about">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {stats.map(([value, label], index) => (
            <Reveal className="counter-tile rounded-3xl border border-white/10 bg-[#161F36]/54 p-6" delay={index * 0.05} key={label}>
              <motion.p
                className="text-4xl font-semibold text-white xl:text-5xl"
                initial={{ opacity: 0, scale: 0.82 }}
                transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, scale: 1 }}
              >
                {value}
              </motion.p>
              <p className="mt-3 text-sm leading-6 text-white/58">{label}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 grid gap-8 lg:grid-cols-[0.68fr_1.32fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">About</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              I like building projects that feel complete.
            </h2>
          </div>
          <div className="grid gap-4 text-white/66 sm:grid-cols-2">
            {[
              ["Curiosity", "I enjoy understanding why a feature works, not just how to make it appear on screen."],
              ["Product Thinking", "I care about user flow, empty states, errors, speed, and the small details that make software easier to use."],
              ["Backend Logic", "I practice auth, APIs, databases, file handling, validation, and deployment-minded structure."],
              ["AI Integration", "I am learning how to turn AI features into useful product workflows instead of decorative chat boxes."],
            ].map(([title, text]) => (
              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5" key={title}>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6">{text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="relative z-10 px-4 py-20 sm:px-6 lg:px-8" id="work">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">Projects</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-5xl">
                Five personal projects, built to practice real product engineering.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-white/54">{featuredProjectNames}</p>
          </Reveal>

          <div className="grid gap-8">
            {projects.map((project, index) => (
              <Reveal className="project-shell overflow-hidden rounded-[32px] border border-white/12 bg-[#0E1726]/66" delay={index * 0.04} key={project.id}>
                <article className="grid gap-0 lg:grid-cols-[0.48fr_0.52fr]" data-cursor="project" id={`project-${project.id}`}>
                  <ProjectSpotlight project={project} index={index} />
                  <div className="p-6 sm:p-8">
                    <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/72">{project.category}</p>
                    <h3 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{project.name}</h3>
                    <p className="mt-5 text-base leading-7 text-white/68">{project.overview}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.features.slice(0, 5).map((feature) => (
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/64" key={feature}>
                          {feature}
                        </span>
                      ))}
                    </div>
                    <p className="mt-5 text-sm leading-7 text-white/54">{project.technology.join(" / ")}</p>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <Button asChild className="magnetic-field" variant="ghost">
                        <a href="#contact">
                          Live Demo
                          <ExternalLink aria-hidden="true" className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button asChild className="magnetic-field" variant="ghost">
                        <a href={socialLinks.github} rel="noreferrer" target="_blank">
                          GitHub
                          <Code2 aria-hidden="true" className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button
                        className="magnetic-field"
                        onClick={() => setSelectedProject(project)}
                        type="button"
                        variant="ghost"
                      >
                        Read Case Study
                        <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 py-20 sm:px-6 lg:px-8" id="stack">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">Skills</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-5xl">
              A technology constellation I keep expanding through projects.
            </h2>
          </Reveal>
          <div className="tech-galaxy mt-12 grid gap-4 md:grid-cols-7">
            {stackGroups.map((group, index) => {
              const Icon = group.icon;

              return (
                <Reveal className="tech-cluster rounded-3xl border border-white/10 bg-white/[0.035] p-5 md:col-span-2 odd:md:col-span-3" delay={index * 0.05} key={group.title}>
                  <div className="flex items-center justify-between">
                    <Icon aria-hidden="true" className="h-6 w-6 text-cyan-300" />
                    <span className="text-xs text-white/38">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">{group.title}</h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span className="tech-chip rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-white/70" key={item}>
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

      <section className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8" id="timeline">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">Journey</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-5xl">
            Learning through fundamentals, projects, and sharper product decisions.
          </h2>
        </Reveal>
        <div className="mt-12 space-y-5">
          {timeline.map((item, index) => (
            <Reveal className="timeline-row grid gap-5 border-l border-cyan-200/18 pl-6 md:grid-cols-[0.22fr_0.78fr] md:gap-10" delay={index * 0.06} key={item.title}>
              <p className="text-sm font-semibold text-cyan-200">{item.period}</p>
              <div className="rounded-3xl border border-white/10 bg-[#161F36]/50 p-6">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.points.map((point) => (
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-white/64" key={point}>
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto grid max-w-6xl gap-4 px-4 py-20 sm:px-6 md:grid-cols-2 lg:px-8" id="certificates">
        <Reveal className="rounded-3xl border border-white/10 bg-[#0E1726]/70 p-7">
          <GraduationCap aria-hidden="true" className="h-7 w-7 text-cyan-300" />
          <p className="mt-6 text-sm uppercase tracking-[0.24em] text-cyan-200/72">Education</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Bachelor of Computer Applications</h2>
          <p className="mt-4 text-white/62">BCA Graduate, 2025.</p>
        </Reveal>
        <Reveal className="rounded-3xl border border-white/10 bg-[#0E1726]/70 p-7" delay={0.05}>
          <Award aria-hidden="true" className="h-7 w-7 text-violet-300" />
          <p className="mt-6 text-sm uppercase tracking-[0.24em] text-cyan-200/72">Certificates</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {certificates.map((certificate) => (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/68" key={certificate}>
                <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-cyan-300" />
                {certificate}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="relative z-10 px-4 py-20 sm:px-6 lg:px-8" id="contact">
        <Reveal className="contact-panel mx-auto max-w-6xl overflow-hidden rounded-[34px] border border-white/12 bg-[#0E1726]/78">
          <div className="grid gap-0 lg:grid-cols-[1fr_0.78fr]">
            <div className="p-7 sm:p-10">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">Contact</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-5xl">
                Let&apos;s Build Something Amazing Together.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/64">
                I&apos;m looking for a team where I can learn fast, contribute carefully, and keep building better full-stack products.
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
                    placeholder="Tell me about the role, internship, or opportunity."
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
              <div className="grid gap-4">
                {[
                  [Mail, "Email", "swarnakarshrushti@gmail.com"],
                  [Code2, "GitHub", "github.com/Shrushti2003"],
                  [ExternalLink, "LinkedIn", "linkedin.com/in/shrushti-swarnakar"],
                  [Trophy, "LeetCode", "400+ problems solved - 2023-2026"],
                  [FileText, "Resume", "Download from the hero button"],
                  [ShieldCheck, "Availability", "Open for Full-Time Roles, Internships, and Graduate Programs"],
                ].map(([Icon, label, value]) => (
                  <div className="rounded-3xl border border-white/10 bg-black/22 p-5" key={String(label)}>
                    <Icon aria-hidden="true" className="h-5 w-5 text-cyan-200" />
                    <p className="mt-4 text-sm text-cyan-100">{label as string}</p>
                    <p className="mt-1 text-sm leading-6 text-white/62">{value as string}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="relative z-10 mx-auto max-w-6xl px-4 pb-10 pt-4 text-sm text-white/42 sm:px-6 lg:px-8">
        <div className="mb-6 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>
            Designed & Developed by <span className="text-white/74">Shrushti Swarnakar</span>
          </p>
          <p>Built using Next.js, React, TypeScript, TailwindCSS, Framer Motion, and GSAP.</p>
          <a className="inline-flex items-center gap-2 hover:text-white" href="#top">
            <Rocket aria-hidden="true" className="h-4 w-4" />
            Back to top
          </a>
        </div>
      </footer>
    </main>
  );
}
