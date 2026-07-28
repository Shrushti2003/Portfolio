import {
  Award,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  ExternalLink,
  FileText,
  GitBranch,
  GraduationCap,
  KeyRound,
  Layers3,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import type {
  CertificateItem,
  ContactCard,
  FoundationalProject,
  IconListItem,
  Project,
  ProjectCaseStudy,
  TechStackItem,
  TimelineItem,
} from "@/types/portfolio";

export const projects: Project[] = [
  {
    id: "strategy-hub",
    name: "Strategy Hub",
    label: "Flagship Project",
    category: "AI SaaS Platform",
    overview:
      "An interview practice workspace for resume feedback, ATS checks, interview questions, saved reports and learning roadmaps.",
    problem:
      "Interview preparation can become scattered across resume reviews, ATS feedback, practice questions, skill gaps, and learning plans.",
    solution:
      "I built a Next.js dashboard with authenticated reports, Gemini guidance, resume parsing, PDF export and reusable backend routes for longer AI tasks.",
    architecture:
      "Next.js, React, TypeScript, TailwindCSS, Node.js, Express, MongoDB, Gemini AI, JWT Authentication, Puppeteer, Cloudinary and reusable report generation routes.",
    challenges:
      "Keeping AI responses structured, parsing resumes reliably, protecting saved reports, and generating reusable outputs without blocking the interface.",
    learning:
      "Practiced prompt shaping, API design, authenticated dashboards, document handling and report flows.",
    features: [
      "Gemini AI Reports",
      "ATS Resume Guidance",
      "PDF/DOCX/TXT Parsing",
      "Saved Reports",
      "Roadmap Generation",
      "Interview Questions",
      "Behavioral Questions",
      "Technical Questions",
      "PDF Export",
      "Authentication",
      "Responsive Dashboard",
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
    gallery: [
      {
        src: "/projects/strategy-hub/dashboard.png",
        alt: "Strategy Hub dashboard screenshot",
        caption: "Dashboard",
      },
      {
        src: "/projects/strategy-hub/ats-resume-builder.png",
        alt: "Strategy Hub ATS resume builder screenshot",
        caption: "ATS Resume Builder",
      },
      {
        src: "/projects/strategy-hub/resume-preview.png",
        alt: "Strategy Hub resume preview screenshot",
        caption: "Resume Preview",
      },
      {
        src: "/projects/strategy-hub/resume-questions.png",
        alt: "Strategy Hub resume questions screenshot",
        caption: "Resume Questions",
      },
      {
        src: "/projects/strategy-hub/interview-strategy.png",
        alt: "Strategy Hub interview strategy screenshot",
        caption: "Interview Strategy",
      },
      {
        src: "/projects/strategy-hub/behavioral-interview.png",
        alt: "Strategy Hub behavioral interview screenshot",
        caption: "Behavioral Interview",
      },
      {
        src: "/projects/strategy-hub/technical-interview.png",
        alt: "Strategy Hub technical interview screenshot",
        caption: "Technical Interview",
      },
      {
        src: "/projects/strategy-hub/roadmap.png",
        alt: "Strategy Hub roadmap screenshot",
        caption: "Roadmap",
      },
      {
        src: "/projects/strategy-hub/profile.png",
        alt: "Strategy Hub profile screenshot",
        caption: "Profile",
      },
      {
        src: "/projects/strategy-hub/sign-in.png",
        alt: "Strategy Hub sign in screenshot",
        caption: "Sign In",
      },
      {
        src: "/projects/strategy-hub/sign-up.png",
        alt: "Strategy Hub sign up screenshot",
        caption: "Sign Up",
      },
      {
        src: "/projects/strategy-hub/home.png",
        alt: "Strategy Hub home screenshot",
        caption: "Home",
      },
    ],
    metrics: ["Gemini AI", "ATS Builder", "Saved Reports"],
    liveUrl: "https://strategy-hub-interview-app.vercel.app",
    repoUrl: "https://github.com/Shrushti2003/Strategy-Hub-Interview-App",
    caseStudySlug: "strategy-hub",
    accent: "from-[#5B0A27] via-[#FF2D7A] to-[#F2EFEA]",
    duration: "Flagship build",
    status: "Completed",
    role: "Solo Developer",
    platform: "Web App",
    difficulty: "Advanced",
    filters: ["AI", "Full Stack", "Backend"],
  },
  {
    id: "zylora",
    name: "Zylora",
    label: "Sustainability",
    category: "Circular Economy Platform",
    overview:
      "A reuse and donation platform for listings, nearby discovery, messaging and role based community flows.",
    problem:
      "Donation and reuse flows need clear discovery, trust, nearby context, and separate experiences for buyers, sellers, donors, and organizations.",
    solution:
      "I built a React and Node.js platform with Firebase sign in, map search, MongoDB listings, dashboards, messaging and AI pricing support.",
    architecture:
      "React, TypeScript, Redux, Node.js, Express, MongoDB, Firebase, Leaflet, OpenStreetMap, and FastAPI AI.",
    challenges:
      "Coordinating authentication, role based dashboards, geolocation, map rendering, listing states and marketplace interactions.",
    learning:
      "Improved API modeling, database relationships, geolocation UI, authentication state, and multi-service integration.",
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
    gallery: [
      {
        src: "/projects/zylora/home.png",
        alt: "Zylora home screenshot",
        caption: "Home",
      },
      {
        src: "/projects/zylora/marketplace.png",
        alt: "Zylora marketplace screenshot",
        caption: "Marketplace",
      },
      {
        src: "/projects/zylora/maps.png",
        alt: "Zylora maps screenshot",
        caption: "Maps",
      },
      {
        src: "/projects/zylora/donation.png",
        alt: "Zylora donation screenshot",
        caption: "Donation",
      },
      {
        src: "/projects/zylora/donate.png",
        alt: "Zylora donate screenshot",
        caption: "Donate",
      },
      {
        src: "/projects/zylora/buyer-dashboard.png",
        alt: "Zylora buyer dashboard screenshot",
        caption: "Buyer Dashboard",
      },
      {
        src: "/projects/zylora/seller-dashboard.png",
        alt: "Zylora seller dashboard screenshot",
        caption: "Seller Dashboard",
      },
      {
        src: "/projects/zylora/messaging.png",
        alt: "Zylora messaging screenshot",
        caption: "Messaging",
      },
      {
        src: "/projects/zylora/stories.png",
        alt: "Zylora stories screenshot",
        caption: "Stories",
      },
      {
        src: "/projects/zylora/verification.png",
        alt: "Zylora verification screenshot",
        caption: "Verification",
      },
      {
        src: "/projects/zylora/profile.png",
        alt: "Zylora profile screenshot",
        caption: "Profile",
      },
      {
        src: "/projects/zylora/sign-in.png",
        alt: "Zylora sign in screenshot",
        caption: "Sign In",
      },
      {
        src: "/projects/zylora/sign-up.png",
        alt: "Zylora sign up screenshot",
        caption: "Sign Up",
      },
    ],
    metrics: ["Geo search", "Firebase auth", "Docker setup"],
    liveUrl: "https://zylora-frontend.vercel.app",
    repoUrl: "https://github.com/Shrushti2003/Zylora",
    caseStudySlug: "zylora",
    accent: "from-[#090909] via-[#5B0A27] to-[#FF2D7A]",
    duration: "Full stack build",
    status: "Completed",
    role: "Solo Developer",
    platform: "Web Platform",
    difficulty: "Advanced",
    filters: ["Full Stack", "Backend", "AI"],
  },
  {
    id: "cloudnest",
    name: "CloudNest Drive",
    label: "Storage",
    category: "Cloud Storage Dashboard",
    overview:
      "A cloud storage dashboard for uploads, folders, previews, sharing, trash recovery, subscriptions and support flows.",
    problem:
      "A storage app needs secure uploads, clear folders, reliable preview states and predictable account controls.",
    solution:
      "I built a React and Express application with JWT auth, Cloudinary uploads, MongoDB records, folder navigation, quota screens and payment and support UI.",
    architecture:
      "React, Node.js, Express, MongoDB, Cloudinary, JWT, Google OAuth, and cloud upload pipelines.",
    challenges:
      "Handling upload states, folder hierarchy, cloud media references, authenticated actions, and dashboard views that stay clear as files grow.",
    learning:
      "Practiced cloud upload pipelines, backend route design, authentication, file metadata modeling and storage UI.",
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
    gallery: [
      {
        src: "/projects/cloudnest/dashboard.png",
        alt: "CloudNest Drive dashboard screenshot",
        caption: "Dashboard",
      },
      {
        src: "/projects/cloudnest/file-management.png",
        alt: "CloudNest Drive file management screenshot",
        caption: "File Management",
      },
      {
        src: "/projects/cloudnest/home.png",
        alt: "CloudNest Drive home screenshot",
        caption: "Home",
      },
      {
        src: "/projects/cloudnest/trash.png",
        alt: "CloudNest Drive trash screenshot",
        caption: "Trash",
      },
      {
        src: "/projects/cloudnest/subscription.png",
        alt: "CloudNest Drive subscription screenshot",
        caption: "Subscription",
      },
      {
        src: "/projects/cloudnest/payment.png",
        alt: "CloudNest Drive payment screenshot",
        caption: "Payment",
      },
      {
        src: "/projects/cloudnest/support-center.png",
        alt: "CloudNest Drive support center screenshot",
        caption: "Support Center",
      },
      {
        src: "/projects/cloudnest/sign-in.png",
        alt: "CloudNest Drive sign in screenshot",
        caption: "Sign In",
      },
      {
        src: "/projects/cloudnest/sign-up.png",
        alt: "CloudNest Drive sign up screenshot",
        caption: "Sign Up",
      },
    ],
    metrics: ["Cloudinary", "Refresh cookies", "Quota tracking"],
    liveUrl: "https://cloudnest-liart.vercel.app",
    repoUrl: "https://github.com/Shrushti2003/Google-Drive-Clone",
    caseStudySlug: "cloudnest-drive",
    accent: "from-sky-300 via-blue-500 to-violet-500",
    duration: "Cloud product build",
    status: "Completed",
    role: "Solo Developer",
    platform: "Web App",
    difficulty: "Advanced",
    filters: ["Full Stack", "Cloud", "Backend"],
  },
  {
    id: "lumibooks",
    name: "LumiBooks",
    label: "Commerce",
    category: "Online Book Store",
    overview:
      "A responsive bookstore experience for browsing books, viewing details, saving wishlist items, and moving through a clean reading-focused interface.",
    problem:
      "Book discovery needs calm browsing, clear categories, readable detail pages, and stateful wishlist behavior without a cluttered storefront.",
    solution:
      "I built a Next.js and TypeScript frontend with search states, category pages, reusable cards, auth-aware screens, and responsive product-detail layouts.",
    architecture:
      "Next.js, React, TypeScript, REST APIs, reusable frontend architecture, responsive cards, and state-driven wishlist flows.",
    challenges:
      "Keeping search, wishlist state, category navigation, and detail pages readable across desktop and mobile.",
    learning:
      "Strengthened responsive frontend architecture, state handling, and commerce-style information hierarchy.",
    features: [
      "Book Search",
      "Wishlist",
      "Auth-Aware UI",
      "Book Details",
      "Responsive Storefront",
      "Search States",
    ],
    technology: ["React", "Next.js", "TypeScript", "TailwindCSS", "REST APIs"],
    gallery: [
      {
        src: "/projects/lumibooks/home.png",
        alt: "LumiBooks home screenshot",
        caption: "Home",
      },
      {
        src: "/projects/lumibooks/book-details.png",
        alt: "LumiBooks book details screenshot",
        caption: "Book Details",
      },
      {
        src: "/projects/lumibooks/browse-categories.png",
        alt: "LumiBooks browse categories screenshot",
        caption: "Browse Categories",
      },
      {
        src: "/projects/lumibooks/browse-categories-grid.png",
        alt: "LumiBooks browse categories grid screenshot",
        caption: "Browse Categories Grid",
      },
      {
        src: "/projects/lumibooks/trending.png",
        alt: "LumiBooks trending books screenshot",
        caption: "Trending",
      },
      {
        src: "/projects/lumibooks/reading-page.png",
        alt: "LumiBooks reading page screenshot",
        caption: "Reading Page",
      },
      {
        src: "/projects/lumibooks/dashboard.png",
        alt: "LumiBooks dashboard screenshot",
        caption: "Dashboard",
      },
      {
        src: "/projects/lumibooks/sign-in.png",
        alt: "LumiBooks sign in screenshot",
        caption: "Sign In",
      },
      {
        src: "/projects/lumibooks/sign-up.png",
        alt: "LumiBooks sign up screenshot",
        caption: "Sign Up",
      },
    ],
    metrics: ["Wishlist", "Search", "Responsive"],
    liveUrl: "https://lumibooks.vercel.app",
    repoUrl: "https://github.com/Shrushti2003/Online-Book-Store",
    caseStudySlug: "lumibooks",
    accent: "from-[#F2EFEA] via-[#68102D] to-[#FF2D7A]",
    duration: "Frontend product build",
    status: "Completed",
    role: "Solo Developer",
    platform: "Responsive Web",
    difficulty: "Intermediate",
    filters: ["Frontend"],
  },
  {
    id: "netflix-clone",
    name: "Netflix Clone",
    label: "Frontend",
    category: "Streaming UI Clone",
    overview:
      "A frontend practice project that recreates familiar streaming patterns with a dark visual system, media rows, detail pages, and responsive browsing.",
    problem:
      "Streaming interfaces have dense visual content, so spacing, contrast, hierarchy, and responsive behavior need careful handling.",
    solution:
      "I built reusable React sections for the landing page, login flow, media rows, hover feedback, detail screens, and mobile-friendly layouts.",
    architecture:
      "React-based UI composition with reusable sections, responsive cards, API-ready content lists, and lightweight state for browsing interactions.",
    challenges:
      "Balancing large hero imagery, compact media cards, hover states, and readable layouts across screen sizes.",
    learning:
      "Improved frontend judgment around dark UI contrast, card rhythm, responsive composition, and interaction polish.",
    features: [
      "Hero Banner",
      "Movie Rows",
      "Hover Effects",
      "Responsive Layout",
      "Media Cards",
      "Dark UI",
    ],
    technology: ["React", "JavaScript", "CSS", "REST APIs", "Responsive Design"],
    gallery: [
      {
        src: "/projects/netflix-clone/home.png",
        alt: "Netflix Clone home screenshot",
        caption: "Home",
      },
      {
        src: "/projects/netflix-clone/landing-page.png",
        alt: "Netflix Clone landing page screenshot",
        caption: "Landing Page",
      },
      {
        src: "/projects/netflix-clone/login.png",
        alt: "Netflix Clone login screenshot",
        caption: "Login",
      },
      {
        src: "/projects/netflix-clone/sign-up.png",
        alt: "Netflix Clone sign up screenshot",
        caption: "Sign Up",
      },
      {
        src: "/projects/netflix-clone/movies-detail.png",
        alt: "Netflix Clone movie detail screenshot",
        caption: "Movie Detail",
      },
      {
        src: "/projects/netflix-clone/series.png",
        alt: "Netflix Clone series screenshot",
        caption: "Series",
      },
      {
        src: "/projects/netflix-clone/person.png",
        alt: "Netflix Clone person detail screenshot",
        caption: "Person Detail",
      },
    ],
    metrics: ["Frontend UI", "Responsive", "Hover states"],
    repoUrl: "https://github.com/Shrushti2003/netflix-clone",
    caseStudySlug: "netflix-clone",
    accent: "from-red-400 via-fuchsia-400 to-violet-500",
    duration: "Frontend practice build",
    status: "Completed",
    role: "Solo Developer",
    platform: "Responsive Web",
    difficulty: "Intermediate",
    filters: ["Frontend"],
  },
];

export const projectFilters = ["All", "AI", "Full Stack", "Frontend", "Backend", "Cloud"];

export const projectCaseStudies: Record<string, ProjectCaseStudy> = {
  "strategy-hub": {
    developmentContext:
      "Independent portfolio project built to practice AI supported full stack product flows.",
    designedFor: "Job seekers who need structured interview preparation and resume feedback.",
    context:
      "Strategy Hub combines resume optimization, interview-question generation, ATS-oriented feedback, saved reports, and learning guidance inside one authenticated workspace.",
    goal:
      "The goal was to build a job search product with document uploads, protected data, AI reports and reusable report export flows.",
    keyFeatures: [
      "Email/password authentication with JWT, HttpOnly cookies, and bcrypt password hashing.",
      "Interview report generation from job descriptions plus resume upload or self-description.",
      "PDF, DOCX, and TXT resume parsing through server-side upload handling.",
      "Gemini powered technical, behavioral, resume based and ATS guidance.",
      "Saved reports tied to each user with MongoDB and Mongoose models.",
      "PDF resume and report export using server side rendering with Puppeteer.",
    ],
    userFlow: [
      "A user signs in or creates an account.",
      "They add job context and upload a resume or describe their profile.",
      "The backend parses the input and requests structured guidance from Gemini.",
      "The dashboard presents interview questions, ATS feedback, roadmaps, and saved reports.",
      "Reports can be revisited or exported as documents.",
    ],
    architecture: [
      { label: "Frontend", value: "Next.js, React, TypeScript, Tailwind CSS, TanStack Query, Zustand, and Framer Motion." },
      { label: "Backend", value: "Node.js and Express with modular auth, interview, resume export and health routes." },
      { label: "Database", value: "MongoDB with Mongoose user and interview report models." },
      { label: "Authentication", value: "JWT cookies, bcryptjs password hashing, and protected report ownership." },
      { label: "AI", value: "Google Gemini service modules for structured interview and resume guidance." },
      { label: "Files", value: "Multer memory uploads with PDF/DOCX/TXT extraction and Puppeteer PDF exports." },
    ],
    dataModel: [
      "User records store account identity and authentication metadata.",
      "Interview report records store generated report content and user ownership.",
      "Report creation accepts resume content, job context, and candidate context.",
    ],
    apiDesign: [
      "/api/auth handles sign-up, sign-in, session checks, and sign-out.",
      "/api/interview handles report generation and saved interview report access.",
      "/api/resume-export handles document export flows.",
      "/api/health/gemini checks Gemini service availability.",
    ],
    challenges: [
      {
        title: "Reliable AI output",
        resolution:
          "The backend separates Gemini service logic from route handlers so generated sections can be shaped and reused more predictably.",
      },
      {
        title: "Document intake",
        resolution:
          "Uploads are parsed on the server for PDF, DOCX and TXT content before report generation.",
      },
      {
        title: "Protected reports",
        resolution:
          "Saved reports are tied to authenticated users instead of being shared as open client state.",
      },
    ],
    learning:
      "This project strengthened my understanding of AI supported workflows, authenticated dashboards, document handling and backend route design.",
    futureImprovements: [
      "Add stronger validation for long resume files and unsupported document formats.",
      "Add automated tests around report generation routes.",
      "Improve progress feedback for longer AI operations.",
    ],
    verifiedFrom: [
      "README",
      "frontend/package.json",
      "backend/package.json",
      "backend routes, models, middleware, and Gemini service files",
    ],
    omitted: ["No placement, user-count, or production-adoption claims were added."],
  },
  zylora: {
    developmentContext:
      "Independent full stack project built to explore reuse and donation product flows.",
    designedFor: "People, donors, buyers, sellers, and organizations participating in reuse or donation workflows.",
    context:
      "Zylora is a reuse marketplace for resource discovery, donation, resale, nearby search, messaging and role based dashboards.",
    goal:
      "The goal was to connect listing discovery, map context, authentication and multiple user roles in a practical MERN product.",
    keyFeatures: [
      "Firebase authentication integrated with role based frontend flows.",
      "Marketplace and resource listings with saved item behavior.",
      "Leaflet/OpenStreetMap screens with geolocation and nearby discovery logic.",
      "Donation and resource request flows for reuse workflows.",
      "Buyer, seller, organization, verification, impact and admin pages.",
      "Backend pricing, valuation, user, auth, and resource routes with MongoDB models.",
      "Separate FastAPI AI-service files for listing intelligence and pricing support.",
    ],
    userFlow: [
      "A visitor explores the landing page, marketplace, or resource map.",
      "They authenticate and move into role based dashboards.",
      "Users create, browse, save, message about, donate, or request resources.",
      "Admin and verification pages support trust and platform-management workflows.",
    ],
    architecture: [
      { label: "Frontend", value: "React, TypeScript, Vite, Redux Toolkit, React Query, Firebase, React Router, and Leaflet." },
      { label: "Backend", value: "Express with TypeScript, MongoDB, Mongoose, Firebase Admin, geolib, helmet, rate limiting, and zod." },
      { label: "AI service", value: "Python FastAPI service files for listing intelligence and pricing/valuation support." },
      { label: "Maps", value: "Leaflet, OpenStreetMap, and geolocation utilities." },
    ],
    dataModel: [
      "Listing, organization, resource request, valuation, platform operations, and user models are present.",
      "The data layer supports marketplace resources, roles, valuation, and platform workflows.",
    ],
    apiDesign: [
      "Auth routes coordinate authenticated user flows.",
      "Resource routes handle listing/resource operations.",
      "Pricing and valuation routes support AI pricing decisions.",
      "User routes support profile and role based behavior.",
    ],
    challenges: [
      {
        title: "Role based product flow",
        resolution:
          "The frontend separates dashboards and pages for different user contexts instead of forcing one generic view.",
      },
      {
        title: "Map discovery",
        resolution:
          "Leaflet and geolocation utilities are used to keep resource discovery tied to location context.",
      },
      {
        title: "Multiple services",
        resolution:
          "Core marketplace APIs live in Express while listing intelligence is separated into a Python FastAPI service.",
      },
    ],
    learning:
      "This project helped me practice larger product flows, map UI, role based screens and service boundaries.",
    futureImprovements: [
      "Add more automated coverage around resource and valuation routes.",
      "Improve moderation states for reports and verification.",
      "Strengthen offline and empty states around maps and messaging.",
    ],
    verifiedFrom: [
      "README",
      "frontend/package.json",
      "backend/package.json",
      "frontend pages and routes",
      "backend models and routes",
      "ai-service FastAPI files",
    ],
    omitted: ["No real community adoption, client, or impact metric was claimed."],
  },
  cloudnest: {
    developmentContext:
      "Independent full stack storage product built from a Google Drive clone source and presented as CloudNest Drive.",
    designedFor: "Users who need authenticated file uploads, folders, sharing, previews, and storage account controls.",
    context:
      "CloudNest Drive is a cloud storage dashboard with file and folder organization, media previews, trash recovery, sharing, billing and support flows.",
    goal:
      "The goal was to practice a complete storage application with secure authentication, cloud upload handling, metadata models and dashboard UX.",
    keyFeatures: [
      "Email/password authentication with JWT access tokens and HttpOnly refresh cookies.",
      "Google OAuth route support through backend auth callbacks.",
      "File upload, list, update, copy, trash, restore, delete, download, and preview routes.",
      "Folder create, list, update, trash, restore, and delete routes.",
      "Cloudinary integration for cloud file storage.",
      "Shared link, billing, Stripe, dashboard and support flows.",
      "Subscription and quota data models.",
    ],
    userFlow: [
      "A user signs up, signs in, or enters through Google OAuth.",
      "They upload files, create folders, and browse dashboard storage views.",
      "Files can be previewed, downloaded, shared, moved to trash, restored, or deleted.",
      "Billing and subscription screens support quota based account behavior.",
    ],
    architecture: [
      { label: "Frontend", value: "React, Vite, React Router, React Query, Zustand, react-dropzone, Framer Motion, GSAP, and Stripe UI packages." },
      { label: "Backend", value: "Node.js and Express with auth, files, folders, shares, billing, Stripe, and dashboard routes." },
      { label: "Database", value: "MongoDB and Mongoose models for users, files, folders, shared links, subscriptions, and activity." },
      { label: "Storage", value: "Cloudinary, multer, and Cloudinary storage packages for file/media handling." },
      { label: "Payments", value: "Stripe backend and frontend packages for subscription flows." },
    ],
    dataModel: [
      "User, File, Folder, SharedLink, Subscription, and Activity models are present.",
      "File and folder routes coordinate metadata, ownership, trash state, preview, and download behavior.",
    ],
    apiDesign: [
      "Auth routes handle email/password, Google OAuth, refresh, and protected sessions.",
      "File routes handle upload and file lifecycle operations.",
      "Folder routes manage hierarchical organization.",
      "Share, billing, Stripe, and dashboard routes support account-level workflows.",
    ],
    challenges: [
      {
        title: "File lifecycle states",
        resolution:
          "Separate file and folder routes handle upload, trash, restore, delete, preview, and download responsibilities.",
      },
      {
        title: "Cloud media references",
        resolution:
          "Cloudinary packages and server-side upload handling keep uploaded assets connected to database metadata.",
      },
      {
        title: "Account security",
        resolution:
          "JWT access tokens and HttpOnly refresh-cookie logic are used for authenticated storage operations.",
      },
    ],
    learning:
      "CloudNest Drive improved my understanding of upload pipelines, file metadata, protected APIs, and dashboard state management.",
    futureImprovements: [
      "Add automated tests for file and folder lifecycle routes.",
      "Improve upload retry and large-file progress states.",
      "Add stronger sharing permission controls.",
    ],
    verifiedFrom: [
      "README",
      "root/package.json",
      "frontend/package.json",
      "backend/package.json",
      "backend routes and Mongoose models",
    ],
    omitted: ["No storage-scale, user-count, or uptime claims were added."],
  },
  lumibooks: {
    developmentContext:
      "Independent bookstore and reading platform project displayed as LumiBooks.",
    designedFor: "Readers browsing books, saving items, using reader tools and exploring AI supported discovery flows.",
    context:
      "LumiBooks is a bookstore and reading web app with catalog pages, book details, search, library and wishlist flows, reader screens and AI recommendation routes.",
    goal:
      "The goal was to practice a larger Next.js product with authentication, catalog discovery, reader routes and backend APIs for books and AI features.",
    keyFeatures: [
      "Landing, categories, explore, search, trending, new release, wishlist and book detail routes.",
      "Sign-in and sign-up routes with Clerk packages in the frontend stack.",
      "Dashboard, library, reading-history, profile, community, and settings screens.",
      "Reader and document reader routes with EPUB and PDF dependencies.",
      "AI librarian and recommendation pages supported by backend AI routes.",
      "Backend book, library, and AI routes with Book, User, Shelf, and Note models.",
    ],
    userFlow: [
      "A visitor browses landing, category, search, trending, or book-detail screens.",
      "They authenticate to use wishlist, dashboard, library, history, profile, and settings areas.",
      "Reader routes support reading and document flows.",
      "AI pages provide recommendation and librarian style discovery.",
    ],
    architecture: [
      { label: "Frontend", value: "Next.js, React, TypeScript, Clerk, React Query, Framer Motion, GSAP, Three.js/R3F, EPUB/PDF reader packages, and Recharts." },
      { label: "Backend", value: "Express 5 with book, library, and AI routes plus validation and auth-related packages." },
      { label: "Database", value: "MongoDB and Mongoose models for books, users, shelves, and notes." },
      { label: "AI", value: "OpenAI package and AI service files connected to recommendation/librarian routes." },
    ],
    dataModel: [
      "Book, User, Shelf, and Note models are present.",
      "Library routes connect authenticated user/library behavior with saved reading data.",
      "AI routes support recommendation and librarian-style features.",
    ],
    apiDesign: [
      "Book routes support catalog and book-oriented data.",
      "Library routes support user library, shelves, notes, and reading workflows.",
      "AI routes support recommendation and librarian experiences.",
    ],
    challenges: [
      {
        title: "Large route surface",
        resolution:
          "The frontend organizes discovery, reading, account, and AI pages into separate route areas.",
      },
      {
        title: "Reader tools",
        resolution:
          "Reader and document routes use dedicated dependencies instead of treating reading as a generic detail page.",
      },
      {
        title: "AI discovery",
        resolution:
          "AI recommendation and librarian routes are isolated in backend services and frontend pages.",
      },
    ],
    learning:
      "LumiBooks helped me practice product navigation, reading workflows, route organization and AI supported discovery features.",
    futureImprovements: [
      "Add automated tests around book/library API behavior.",
      "Improve empty states for library, wishlist, and reading history.",
      "Add clearer admin or catalog management boundaries if needed.",
    ],
    verifiedFrom: [
      "README",
      "frontend/package.json",
      "backend/package.json",
      "frontend app routes",
      "backend routes, models, and services",
    ],
    omitted: ["The portfolio keeps LumiBooks as the display name even where the source repository uses bookstore naming."],
  },
  "netflix-clone": {
    developmentContext:
      "Educational frontend and backend clone project for practicing streaming interface patterns.",
    designedFor: "A learning portfolio context, not a commercial streaming service.",
    context:
      "Netflix Clone recreates familiar streaming app browsing patterns with authentication, media rows, movie and TV data, watch screens, detail screens and search history.",
    goal:
      "The goal was to practice dark UI composition, protected app routes, external media APIs, and responsive media browsing.",
    keyFeatures: [
      "Sign up, login, logout and protected route behavior.",
      "Backend auth, movie, TV, and search routes.",
      "TMDB service integration for movies, TV, search, trailers, and related media data.",
      "Home, auth, watch, search, search history and not found pages.",
      "Reusable movie slider and media browsing components.",
      "Zustand state management and cookie based JWT auth.",
    ],
    userFlow: [
      "A visitor reaches the landing/auth experience.",
      "They sign up or log in and enter protected browsing screens.",
      "The app loads movie or TV rows from TMDB-backed routes.",
      "Users can open watch/detail screens and search for media or people.",
      "Search activity is reflected in search-history flows.",
    ],
    architecture: [
      { label: "Frontend", value: "Vite, React 19, React Router, Zustand, axios, lucide-react, Tailwind-style styling, and reusable media components." },
      { label: "Backend", value: "Express 5 with auth, movie, TV, and search route groups." },
      { label: "Database", value: "MongoDB and Mongoose user model for account and search-history data." },
      { label: "Authentication", value: "JWT cookie named for the clone project and protected route middleware." },
      { label: "External API", value: "TMDB service wrapper for movie, TV, trailer, search and similar content requests." },
    ],
    dataModel: [
      "User model supports authentication data and search history behavior.",
      "Search controllers coordinate media/person search and history operations.",
    ],
    apiDesign: [
      "Auth routes handle sign-up, login, logout, and auth checks.",
      "Movie and TV routes fetch TMDB-backed categories, details, trailers, and similar media.",
      "Search routes query TMDB and manage search history.",
    ],
    challenges: [
      {
        title: "Dense media layout",
        resolution:
          "Reusable rows and sliders keep browsing screens consistent across many media items.",
      },
      {
        title: "Protected media app flow",
        resolution:
          "Backend middleware protects routes while frontend routing separates auth and browsing states.",
      },
      {
        title: "External API integration",
        resolution:
      "TMDB access is wrapped in backend service functions instead of being scattered across UI components.",
      },
    ],
    learning:
      "This project improved my understanding of protected routes, external API use, search flows and responsive dark UI patterns.",
    futureImprovements: [
      "Add automated tests around TMDB service wrappers and auth routes.",
      "Improve loading and empty states for unavailable media results.",
      "Improve row navigation and keyboard browsing.",
    ],
    verifiedFrom: [
      "package.json",
      "frontend/package.json",
      "backend controllers, models, routes, middleware, and TMDB service",
      "frontend pages and components",
    ],
    disclaimer:
      "Educational clone project only. It is not affiliated with Netflix and has no deployed live demo.",
    omitted: ["No live-demo button, deployment URL, affiliation, or production-business claim was added."],
  },
};

export const socialLinks = {
  github: "https://github.com/Shrushti2003",
  linkedin: "https://www.linkedin.com/in/shrushti-swarnakar/",
  leetcode: "https://leetcode.com/u/Shrushti2003/",
  resume: "/documents/shrushti-resume.pdf",
};

export const rotatingRoles = [
  "Full Stack Developer",
  "MERN Stack Developer",
  "Frontend Engineer",
];

export const stackGroups: IconListItem[] = [
  {
    title: "Languages",
    icon: Code2,
    items: ["JavaScript", "TypeScript", "C++", "HTML", "CSS"],
  },
  {
    title: "Frontend",
    icon: Sparkles,
    items: ["React", "Next.js", "Tailwind CSS", "Redux", "Framer Motion"],
  },
  {
    title: "Backend",
    icon: Layers3,
    items: ["Node.js", "Express.js", "REST APIs", "JWT"],
  },
  {
    title: "Database",
    icon: Database,
    items: ["MongoDB", "Mongoose", "Prisma"],
  },
  {
    title: "Cloud",
    icon: Cloud,
    items: ["Firebase", "Cloudinary", "Docker", "Vercel", "Render"],
  },
  {
    title: "AI",
    icon: BrainCircuit,
    items: ["Google Gemini", "Prompt Engineering", "AI Workflows", "ATS Resume Analysis"],
  },
  {
    title: "Tools",
    icon: Code2,
    items: ["Git", "GitHub", "VS Code", "Postman"],
  },
];

export const stats = [
  ["5+", "Portfolio Projects"],
  ["400+", "LeetCode Problems"],
  ["20+", "Technologies"],
  ["7.50", "CGPA"],
  ["2025", "BCA Graduate"],
  ["Open", "For Roles"],
];

export const timeline: TimelineItem[] = [
  {
    period: "During BCA",
    title: "Foundations and early projects",
    icon: GraduationCap,
    meta: "Programming, databases, DSA",
    text: "Built programming, database, data-structure, and problem-solving foundations while turning coursework into small working projects.",
    points: ["C++ practice", "Database concepts", "Academic projects", "Independent builds"],
  },
  {
    period: "2025",
    title: "Bachelor of Computer Applications Completed",
    icon: Award,
    meta: "CGPA 7.50",
    text: "Completed BCA in 2025 and continued strengthening practical development skills through independent learning and portfolio projects.",
    points: ["BCA graduate", "CGPA 7.50", "Project practice", "Software fundamentals"],
  },
  {
    period: "Sep 2025 - Jan 2026",
    title: "Full stack development training",
    icon: Layers3,
    meta: "100xDevs course certificate available",
    text: "Completed training in modern web development and practiced frontend UI, backend APIs, databases, authentication and full stack application flows.",
    points: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    period: "After Jan 2026",
    title: "Major full stack portfolio projects",
    icon: Sparkles,
    meta: "Independent project practice",
    text: "Applied the training by building larger projects: Strategy Hub, Zylora, CloudNest Drive, LumiBooks, and Netflix Clone.",
    points: ["Authenticated apps", "Dashboards", "APIs", "Responsive UI"],
  },
  {
    period: "Current",
    title: "Looking for software development roles",
    icon: ShieldCheck,
    meta: "Internships, graduate roles, entry level",
    text: "Seeking a team where I can contribute to real products, learn from experienced developers and keep growing as a full stack developer.",
    points: [
      "Full stack development",
      "Frontend engineering",
      "APIs and databases",
      "Product workflows",
    ],
  },
];

export const foundationalProjects: FoundationalProject[] = [
  {
    title: "Music Player App",
    href: "https://github.com/Shrushti2003/Music-Player",
    technology: "C++",
    description: "C++ music player project for practicing track selection and interactive program flow.",
  },
  {
    title: "Trading App",
    href: "https://github.com/Shrushti2003/Trading-App",
    technology: "C++",
    description: "Foundational application practice for menu flows, records, and transaction-style logic.",
  },
  {
    title: "Encryption Project",
    href: "https://github.com/Shrushti2003/Encryption-Project",
    technology: "C++",
    description: "Caesar-cipher encryption and decryption tool with user-facing input flows.",
  },
  {
    title: "Gym DB Project",
    href: "https://github.com/Shrushti2003/GYM-DB-Project",
    technology: "C++",
    description: "Database-oriented academic project for managing gym records and structured data.",
  },
  {
    title: "Quiz Game",
    href: "https://github.com/Shrushti2003/Quiz-Game",
    technology: "C++",
    description: "Question-and-answer game built to practice branching, scoring, and program structure.",
  },
  {
    title: "Car Game",
    href: "https://github.com/Shrushti2003/Car-Game",
    technology: "C++",
    description: "C++ car-game project built around player controls, obstacle-style logic, and scoring practice.",
  },
];

export const certificates: CertificateItem[] = [
  {
    title: "Data Structures in C++ - Certificate of Completion",
    issuer: "Coding Ninjas",
    date: "March 2023 - July 2023",
    source: "/certificates/coding-ninjas-data-structures-completion.pdf",
    preview: "/certificates/coding-ninjas-data-structures-completion-preview.png",
    alt: "Coding Ninjas Data Structures in C++ certificate of completion for Shrushti Swarnakar",
    note: "Verification URL visible in the certificate PDF.",
  },
  {
    title: "Data Structures in C++ - Certificate of Excellence",
    issuer: "Coding Ninjas",
    date: "March 2023 - July 2023",
    source: "/certificates/coding-ninjas-data-structures-excellence.pdf",
    preview: "/certificates/coding-ninjas-data-structures-excellence-preview.png",
    alt: "Coding Ninjas Data Structures in C++ certificate of excellence for Shrushti Swarnakar",
    note: "Top Performer certificate.",
  },
  {
    title: "0-100 Full Stack Web Development Course",
    issuer: "100xDevs",
    date: "4/9/2026",
    source: "/certificates/100xdevs-full-stack-web-development.jpeg",
    preview: "/certificates/100xdevs-full-stack-web-development.jpeg",
    alt: "100xDevs full stack web development course certificate for Shrushti Swarnakar",
    note: "Certificate number OUDO7625 is visible in the image.",
  },
];

export const techStack: TechStackItem[] = [
  { name: "JavaScript", category: "Frontend", icon: Code2, x: 0, y: -205, size: "lg", ring: "inner", evidence: "Used across React/Vite/Next.js portfolio projects." },
  { name: "TypeScript", category: "Frontend", icon: Code2, x: 235, y: -155, size: "lg", ring: "inner", evidence: "Verified in Strategy Hub, Zylora, LumiBooks, and portfolio source." },
  { name: "React", category: "Frontend", icon: Sparkles, x: 390, y: -45, size: "lg", ring: "inner", evidence: "Verified in every major frontend project and this portfolio." },
  { name: "Node.js", category: "Backend", icon: Layers3, x: 80, y: 185, size: "lg", ring: "inner", evidence: "Verified in Strategy Hub, Zylora, CloudNest Drive, LumiBooks, and Netflix Clone backends." },
  { name: "Next.js", category: "Frontend", icon: Sparkles, x: -255, y: -70, size: "md", ring: "inner", evidence: "Verified in Strategy Hub, LumiBooks, and the portfolio app." },
  { name: "HTML5", category: "Frontend", icon: Code2, x: -430, y: -155, size: "sm", ring: "middle", evidence: "Verified through frontend projects and foundational web UI work." },
  { name: "CSS3", category: "Frontend", icon: Sparkles, x: -205, y: -235, size: "md", ring: "middle", evidence: "Verified through frontend project styling and portfolio CSS." },
  { name: "Tailwind CSS", category: "Frontend", icon: Sparkles, x: -375, y: 105, size: "md", ring: "middle", evidence: "Verified in Strategy Hub and LumiBooks source/package data." },
  { name: "Vite", category: "Tools", icon: GitBranch, x: -215, y: 260, size: "sm", ring: "middle", evidence: "Verified in Zylora, CloudNest Drive, Netflix Clone, and portfolio tooling." },
  { name: "Express.js", category: "Backend", icon: Layers3, x: 300, y: 165, size: "md", ring: "middle", evidence: "Verified in all inspected backend project sources." },
  { name: "REST APIs", category: "Backend", icon: Layers3, x: 455, y: 245, size: "md", ring: "middle", evidence: "Verified through backend route groups in the major projects." },
  { name: "MongoDB", category: "Database", icon: Database, x: -430, y: 250, size: "lg", ring: "middle", evidence: "Verified in Strategy Hub, Zylora, CloudNest Drive, LumiBooks, and Netflix Clone." },
  { name: "Mongoose", category: "Database", icon: Database, x: 30, y: 340, size: "sm", ring: "outer", evidence: "Verified through Mongoose models in inspected project ZIPs." },
  { name: "JWT Auth", category: "Backend", icon: KeyRound, x: -445, y: -315, size: "md", ring: "outer", evidence: "Verified in Strategy Hub, CloudNest Drive, LumiBooks packages, and Netflix Clone." },
  { name: "Firebase", category: "Auth", icon: ShieldCheck, x: 210, y: 340, size: "sm", ring: "outer", evidence: "Verified in Zylora authentication source/package data." },
  { name: "Cloudinary", category: "Storage", icon: Cloud, x: 455, y: -275, size: "md", ring: "outer", evidence: "Verified in CloudNest Drive and LumiBooks backend/package data." },
  { name: "Zustand", category: "Frontend", icon: Sparkles, x: 500, y: 80, size: "sm", ring: "outer", evidence: "Verified in Strategy Hub, CloudNest Drive, Netflix Clone, and portfolio dependencies." },
  { name: "C++", category: "Foundations", icon: Code2, x: -505, y: -10, size: "md", ring: "outer", evidence: "Verified by Coding Ninjas certificates and foundational project repositories." },
  { name: "Git", category: "Tools", icon: GitBranch, x: -75, y: -340, size: "sm", ring: "outer", evidence: "Verified by project workflow/repository usage." },
  { name: "GitHub", category: "Tools", icon: Code2, x: 225, y: -340, size: "sm", ring: "outer", evidence: "Verified through linked public repositories and portfolio links." },
];

export const engineeringPrinciples = [
  "Build before optimizing",
  "Clean code over clever code",
  "Performance matters",
  "Responsive by default",
  "Accessibility is important",
  "Reusable components",
  "Security first",
  "User experience always matters",
];

export const currentFocus = [
  "Advanced Backend Development",
  "System Design",
  "Docker",
  "Cloud Deployment",
  "Performance Optimization",
  "AI Integration",
  "Scalable APIs",
  "Authentication",
  "Database Design",
];

export const leetcodeDifficulty = [
  ["Easy", "Foundation and pattern recognition"],
  ["Medium", "Problem solving depth"],
  ["Hard", "Stretch practice"],
];

export const githubHighlights = [
  ["Profile", "github.com/Shrushti2003"],
  ["Pinned Repositories", "Strategy Hub, Zylora, CloudNest Drive, LumiBooks"],
  ["Code Focus", "Full-stack products, AI workflows, dashboards, storage, commerce"],
  ["Latest Activity", "Continuously improving portfolio projects and learning repos"],
];

export const contactCards: ContactCard[] = [
  {
    label: "Email",
    value: "swarnakarshrushti@gmail.com",
    href: "mailto:swarnakarshrushti@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/Shrushti2003",
    href: socialLinks.github,
    icon: Code2,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/shrushti-swarnakar",
    href: socialLinks.linkedin,
    icon: ExternalLink,
  },
  {
    label: "LeetCode",
    value: "400+ problems solved",
    href: socialLinks.leetcode,
    icon: Trophy,
  },
  {
    label: "Resume",
    value: "Download resume",
    href: socialLinks.resume,
    icon: FileText,
  },
  {
    label: "Current Location",
    value: "Pune, India",
    href: "#contact",
    icon: MapPin,
  },
];

export const paletteItems = [
  ["Home", "#top"],
  ["Work", "#work"],
  ["Capabilities", "#capabilities"],
  ["About", "#about"],
  ["Credentials", "#credentials"],
  ["Contact", "#contact"],
];

