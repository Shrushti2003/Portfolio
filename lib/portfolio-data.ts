import {
  Award,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  ExternalLink,
  FileText,
  GraduationCap,
  Layers3,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import type { ContactCard, IconListItem, Project, TimelineItem } from "@/types/portfolio";

export const projects: Project[] = [
  {
    id: "strategy-hub",
    name: "Strategy Hub",
    label: "Flagship Project",
    category: "AI SaaS Platform",
    overview:
      "An AI-powered interview preparation platform that helps users improve resumes, prepare for interviews, identify skill gaps, generate learning roadmaps, and practice with personalized AI-generated interview questions.",
    problem:
      "Many candidates prepare using multiple disconnected tools for resumes, interview questions, ATS checks, skill gaps, and learning plans.",
    solution:
      "Created a centralized AI platform combining resume analysis, interview preparation, ATS optimization, saved reports, and personalized learning guidance.",
    architecture:
      "Next.js, React, TypeScript, TailwindCSS, Node.js, Express, MongoDB, Gemini AI, JWT Authentication, Puppeteer, Cloudinary, and reusable report-generation pipelines.",
    challenges:
      "Handling AI response consistency, resume parsing, long-running AI operations, authentication, and reusable report generation.",
    learning:
      "Prompt engineering, authentication, backend APIs, AI integration, state management, and dashboard architecture.",
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
    gallery: ["Dashboard", "Resume Parsing", "AI Report", "Roadmap Generator", "Saved Reports", "PDF Export"],
    metrics: ["Gemini AI", "ATS Builder", "Saved Reports"],
    liveUrl: "https://strategy-hub-interview-app.vercel.app",
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
      "A sustainability platform connecting users through donations, resale, nearby resources, NGOs, maps, messaging, and AI-assisted pricing.",
    problem:
      "People struggle to find trustworthy nearby donation and reuse opportunities.",
    solution:
      "Created an intelligent platform that simplifies resource discovery and promotes sustainable communities.",
    architecture:
      "React, TypeScript, Redux, Node.js, Express, MongoDB, Firebase, Leaflet, OpenStreetMap, and FastAPI AI.",
    challenges:
      "Authentication, map integration, nearby search, role management, and connected product flows.",
    learning:
      "API design, database modeling, authentication, geolocation, and multi-service architecture.",
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
    gallery: ["Desktop Map", "Resource Cards", "Mobile Search", "Messaging", "Authentication", "AI Pricing"],
    metrics: ["Geo search", "Firebase auth", "Docker setup"],
    liveUrl: "https://zylora-frontend.vercel.app",
    accent: "from-[#090909] via-[#5B0A27] to-[#FF2D7A]",
    duration: "Full-stack build",
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
      "A Google Drive inspired cloud storage application with authentication, folders, sharing, storage management, and secure uploads.",
    problem:
      "Managing cloud storage requires secure authentication, organized folders, and intuitive file management.",
    solution:
      "Built a cloud storage platform with user authentication, folder organization, media previews, sharing, and cloud integration.",
    architecture:
      "React, Node.js, Express, MongoDB, Cloudinary, JWT, Google OAuth, and cloud upload pipelines.",
    challenges:
      "Secure uploads, folder hierarchy, cloud storage, authentication, and quota-aware dashboard states.",
    learning:
      "Cloud integration, backend APIs, authentication, upload middleware, and storage management.",
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
    gallery: ["Desktop Dashboard", "Folder System", "Media Preview", "Share Modal", "Quota Card", "Mobile Files"],
    metrics: ["Cloudinary", "Refresh cookies", "Quota tracking"],
    liveUrl: "https://cloudnest-liart.vercel.app",
    accent: "from-sky-300 via-blue-500 to-violet-500",
    duration: "Cloud product build",
    status: "Completed",
    role: "Solo Developer",
    platform: "Web App",
    difficulty: "Advanced",
    filters: ["Full Stack", "Cloud", "Backend"],
  },
  {
    id: "booknest",
    name: "BookNest",
    label: "Commerce",
    category: "Online Book Store",
    overview:
      "A modern bookstore interface focused on responsive browsing, search, wishlist functionality, and clean UI.",
    problem:
      "Online bookstores often become cluttered and difficult to navigate.",
    solution:
      "Designed a clean and modern interface prioritizing user experience, search clarity, wishlist behavior, and responsive browsing.",
    architecture:
      "Next.js, React, TypeScript, REST APIs, reusable frontend architecture, responsive cards, and state-driven wishlist flows.",
    challenges:
      "Responsive UI, search experience, wishlist management, and clean product detail layout.",
    learning:
      "Frontend architecture, responsive design, state management, and commerce-focused information hierarchy.",
    features: [
      "Book Search",
      "Wishlist",
      "Auth-Aware UI",
      "Book Details",
      "Responsive Storefront",
      "Search States",
    ],
    technology: ["React", "Next.js", "TypeScript", "TailwindCSS", "REST APIs"],
    gallery: ["Storefront", "Book Details", "Wishlist", "Search Results", "Tablet View", "Mobile View"],
    metrics: ["Wishlist", "Search", "Responsive"],
    liveUrl: "https://lumibooks.vercel.app",
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
    duration: "Frontend practice build",
    status: "Completed",
    role: "Solo Developer",
    platform: "Responsive Web",
    difficulty: "Intermediate",
    filters: ["Frontend"],
  },
];

export const projectFilters = ["All", "AI", "Full Stack", "Frontend", "Backend", "Cloud"];

export const socialLinks = {
  github: "https://github.com/Shrushti2003",
  linkedin: "https://www.linkedin.com/in/shrushti-swarnakar/",
  leetcode: "https://leetcode.com/u/Shrushti2003/",
  resume: "/shrushti-swarnakar-resume.txt",
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
  ["5+", "Production Projects"],
  ["400+", "LeetCode Problems"],
  ["20+", "Technologies"],
  ["7.50", "CGPA"],
  ["2025", "BCA Graduate"],
  ["Open", "For Opportunities"],
];

export const timeline: TimelineItem[] = [
  {
    period: "2022 - 2025",
    title: "Bachelor of Computer Applications",
    icon: GraduationCap,
    meta: "CGPA 7.50",
    text: "Built academic foundations across programming, data structures, operating systems, database management, computer networks, and software engineering.",
    points: ["Programming Fundamentals", "Data Structures", "Database Management", "Computer Networks"],
  },
  {
    period: "2023 - 2024",
    title: "C++ using Data Structures & Algorithms",
    icon: Code2,
    meta: "Coding Ninjas",
    text: "Built a strong programming foundation through C++ and DSA while pursuing BCA.",
    points: ["Trading Application", "Encryption & Decryption System", "Gym Management System", "Quiz Application"],
  },
  {
    period: "2025",
    title: "Bachelor of Computer Applications Completed",
    icon: Award,
    meta: "CGPA 7.50",
    text: "Successfully completed BCA while continuously improving practical development skills through independent learning and project development.",
    points: ["Graduated 2025", "Practical project building", "Clean code habits", "Product thinking"],
  },
  {
    period: "2025 - 2026",
    title: "MERN Stack & Full Stack Development",
    icon: Layers3,
    meta: "100xDevs",
    text: "Focused on modern full-stack development using the MERN stack and built production-oriented projects covering auth, REST APIs, JWT, Cloudinary, MongoDB, Express, React, Next.js, TypeScript, deployment, responsive UI, and AI integrations.",
    points: ["Strategy Hub", "Zylora", "CloudNest Drive", "BookNest"],
  },
  {
    period: "Current",
    title: "Open to Opportunities",
    icon: ShieldCheck,
    meta: "Available now",
    text: "Preparing for full-time software engineering and internship opportunities while improving backend architecture, AI integrations, Docker, cloud deployment, and system design knowledge.",
    points: [
      "Advanced Backend Development",
      "System Design",
      "Docker",
      "Cloud Deployment",
    ],
  },
];

export const certificates = [
  {
    issuer: "Coding Ninjas",
    title: "C++",
    focus: "Data Structures & Algorithms",
    completed: "Completed 2023",
  },
  {
    issuer: "100xDevs",
    title: "MERN Stack",
    focus: "Full Stack Development",
    completed: "Completed 2026",
  },
  {
    issuer: "LeetCode",
    title: "400+ Problems Solved",
    focus: "Algorithms & Data Structures",
    completed: "2023 - 2026",
  },
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
  ["Pinned Repositories", "Strategy Hub, Zylora, CloudNest Drive, BookNest"],
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
    value: "India",
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

