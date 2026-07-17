"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import Lenis from "lenis";
import {
  ArrowUpRight,
  Award,
  BrainCircuit,
  Braces,
  Cloud,
  Code2,
  Database,
  Layers3,
  Mail,
  Map,
  Rocket,
  ShieldCheck,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { MouseGlow } from "@/components/effects/mouse-glow";
import { Button } from "@/components/ui/button";

const OrbitalField = dynamic(
  () =>
    import("@/components/effects/orbital-field").then(
      (module) => module.OrbitalField,
    ),
  { ssr: false },
);

const featuredProjects = [
  {
    name: "Strategy Hub Interview Platform",
    category: "Gen AI Platform",
    label: "Flagship Project",
    description:
      "An AI-powered interview preparation platform that generates ATS resume analysis, technical interview questions, behavioral prompts, resume-led questions, interview strategies, and personalized learning roadmaps with Google Gemini AI.",
    features: [
      "Gemini AI",
      "ATS Resume Builder",
      "Resume Analysis",
      "Resume Upload",
      "PDF Parsing",
      "Authentication",
      "AI Question Generation",
      "Technical Questions",
      "Behavioral Questions",
      "Resume Questions",
      "Interview Strategy",
      "Learning Roadmap",
      "Dashboard",
      "Dark UI",
      "Performance Optimizations",
    ],
    technology: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Gemini AI",
      "Tailwind",
      "JWT",
      "Cloudinary",
    ],
    accent: "from-cyan-300 via-violet-400 to-fuchsia-500",
  },
  {
    name: "Zylora",
    category: "AI Powered Circular Economy Platform",
    label: "Sustainability System",
    description:
      "A sustainability platform connecting citizens, NGOs, recyclers, and organizations through AI-powered resource discovery and interactive map-first workflows.",
    features: [
      "OpenStreetMap",
      "Leaflet",
      "NGO Dashboard",
      "Authentication",
      "Resource Discovery",
      "AI Assistance",
      "Responsive Dashboard",
    ],
    technology: [
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB",
      "Prisma",
      "Leaflet",
      "Firebase",
      "Tailwind",
    ],
    accent: "from-emerald-300 via-cyan-300 to-violet-400",
  },
  {
    name: "CloudNest Drive",
    category: "Cloud Storage Application",
    label: "Drive Experience",
    description:
      "A Google Drive inspired storage product with authenticated dashboards, organized uploads, cloud asset handling, and fast file interactions.",
    features: [
      "Authentication",
      "File Upload",
      "Cloud Storage",
      "Dashboard",
      "Cloudinary Integration",
    ],
    technology: ["Next.js", "Cloudinary", "Authentication", "Tailwind"],
    accent: "from-sky-300 via-blue-500 to-violet-500",
  },
  {
    name: "LumiBooks",
    category: "Modern Online Book Store",
    label: "Commerce UI",
    description:
      "A polished bookstore experience focused on fast discovery, wishlist flows, account-aware interactions, and responsive browsing.",
    features: ["Authentication", "Wishlist", "Book Search", "Responsive Design"],
    technology: ["React", "API Integration", "Tailwind", "Authentication"],
    accent: "from-amber-200 via-pink-400 to-violet-500",
  },
  {
    name: "Java Student Manager",
    category: "Desktop CRUD Application",
    label: "Java Swing",
    description:
      "A practical desktop management system built with Java Swing for student records, edits, search, and everyday CRUD operations.",
    features: ["Java Swing", "CRUD", "Desktop UI", "Search"],
    technology: ["Java", "Swing", "OOP", "JDBC-ready Architecture"],
    accent: "from-violet-300 via-slate-100 to-cyan-300",
  },
];

const stackGroups = [
  {
    title: "Frontend",
    icon: Code2,
    items: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Shadcn UI"],
  },
  {
    title: "Motion and 3D",
    icon: Sparkles,
    items: ["Framer Motion", "GSAP", "React Three Fiber", "Three.js", "Lenis"],
  },
  {
    title: "Backend",
    icon: Database,
    items: ["Node.js", "Express", "MongoDB", "Prisma", "JWT"],
  },
  {
    title: "AI and Cloud",
    icon: BrainCircuit,
    items: ["Gemini AI", "Cloudinary", "Firebase", "PDF Parsing", "REST APIs"],
  },
];

const achievements = [
  ["5", "featured builds across AI, cloud, commerce, and desktop"],
  ["15+", "AI and full-stack capabilities shipped inside Strategy Hub"],
  ["90+", "performance-minded target for production deployment"],
];

const timeline = [
  {
    period: "Now",
    title: "AI Application Developer",
    text: "Designing full-stack Gen AI workflows that turn resumes, job context, and user goals into practical interview preparation systems.",
  },
  {
    period: "Recent",
    title: "Full Stack Product Builder",
    text: "Building authenticated dashboards, cloud upload flows, API-backed products, and responsive interfaces with modern JavaScript stacks.",
  },
  {
    period: "Foundation",
    title: "Software Engineering Practice",
    text: "Grounded in Java, CRUD systems, OOP, database-aware thinking, and the discipline needed to ship maintainable tools.",
  },
];

const contactSignals = [
  { icon: ShieldCheck, label: "Production-minded builds" },
  { icon: Cloud, label: "Cloudinary and Firebase workflows" },
  { icon: Map, label: "Map-based discovery products" },
  { icon: Layers3, label: "Dashboard systems and API integration" },
  { icon: Award, label: "Premium dark UI craft" },
];

function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      transition={{ delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

export function Portfolio() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, -90]);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

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
      },
    );

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.24),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(45,212,255,0.16),transparent_30%),#03030a]"
      id="top"
    >
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
          className="relative z-10 mx-auto grid max-w-6xl gap-12 pb-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-center"
          style={{ y: heroY }}
        >
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-sm text-cyan-100 shadow-xl shadow-violet-950/20 backdrop-blur-xl">
              <Zap aria-hidden="true" className="h-4 w-4 text-cyan-300" />
              Full Stack Developer / AI Application Developer
            </div>
            <h1 className="max-w-5xl text-balance text-5xl font-semibold tracking-normal text-white sm:text-7xl lg:text-8xl">
              <span className="hero-word inline-block">Shrushti</span>{" "}
              <span className="hero-word inline-block">Swarnakar</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl">
              I build dark, sharp, product-grade web experiences where full-stack
              engineering, AI workflows, dashboards, cloud integrations, and
              polished interaction design meet.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href="#work">
                  View featured work
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <a href="mailto:hello@shrushti.dev">
                  <Mail aria-hidden="true" className="h-4 w-4" />
                  Start a conversation
                </a>
              </Button>
            </div>
          </div>

          <FadeIn className="glass-panel relative z-10 rounded-[28px] p-5">
            <div className="rounded-[22px] border border-white/10 bg-black/35 p-5">
              <div className="mb-10 flex items-center justify-between">
                <span className="text-sm text-white/52">Current focus</span>
                <span className="rounded-full bg-cyan-300/12 px-3 py-1 text-xs text-cyan-200">
                  Gen AI Platforms
                </span>
              </div>
              <div className="space-y-5">
                {[
                  ["01", "ATS resume intelligence"],
                  ["02", "Gemini-powered question generation"],
                  ["03", "Dashboard-first product systems"],
                ].map(([index, label]) => (
                  <div
                    className="flex items-center justify-between border-b border-white/10 pb-5 last:border-b-0 last:pb-0"
                    key={label}
                  >
                    <div>
                      <p className="text-xs text-white/36">{index}</p>
                      <p className="mt-1 text-lg font-medium text-white">{label}</p>
                    </div>
                    <Braces aria-hidden="true" className="h-5 w-5 text-violet-300" />
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8" id="about">
        <FadeIn className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">
              About
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Product sense with engineering depth.
            </h2>
          </div>
          <div className="text-lg leading-8 text-white/68">
            <p>
              Shrushti builds practical software with a strong eye for user
              flow: authentication, resumes, cloud uploads, maps, dashboards,
              AI prompts, API boundaries, and data models that hold together.
            </p>
            <p className="mt-5">
              The work is intentionally broad but connected by one pattern:
              turning complex systems into interfaces that feel focused,
              responsive, and calm.
            </p>
          </div>
        </FadeIn>
      </section>

      <section className="relative z-10 px-4 py-16 sm:px-6 lg:px-8" id="stack">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">
              Tech stack
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-5xl">
              Modern tools for fast, expressive, production-ready builds.
            </h2>
          </FadeIn>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {stackGroups.map((group, index) => {
              const Icon = group.icon;

              return (
                <FadeIn
                  className="glass-panel rounded-3xl p-6"
                  delay={index * 0.05}
                  key={group.title}
                >
                  <Icon aria-hidden="true" className="h-6 w-6 text-cyan-300" />
                  <h3 className="mt-5 text-xl font-semibold text-white">
                    {group.title}
                  </h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-white/70"
                        key={item}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8" id="work">
        <FadeIn className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">
              Featured projects
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-5xl">
              The work is ordered by signal, not chronology.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-white/54">
            Strategy Hub leads the portfolio because it best represents the AI,
            full-stack, performance, and product-design range.
          </p>
        </FadeIn>

        <div className="space-y-5">
          {featuredProjects.map((project, index) => (
            <FadeIn
              className="group glass-panel overflow-hidden rounded-[28px]"
              delay={index * 0.04}
              key={project.name}
            >
              <article className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
                <div
                  className={`animated-gradient min-h-64 bg-gradient-to-br ${project.accent} p-6 text-black lg:min-h-full`}
                >
                  <div className="flex h-full flex-col justify-between rounded-3xl border border-black/10 bg-black/10 p-5 backdrop-blur-sm">
                    <div>
                      <span className="rounded-full bg-black/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
                        {project.label}
                      </span>
                      <h3 className="mt-8 text-3xl font-semibold tracking-normal sm:text-4xl">
                        {project.name}
                      </h3>
                    </div>
                    <div className="mt-12 flex items-center gap-3 text-sm font-medium">
                      <Rocket aria-hidden="true" className="h-4 w-4" />
                      {String(index + 1).padStart(2, "0")} / Featured
                    </div>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/72">
                    {project.category}
                  </p>
                  <p className="mt-5 text-lg leading-8 text-white/72">
                    {project.description}
                  </p>
                  <div className="mt-7">
                    <p className="text-sm font-medium text-white">Features</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.features.map((feature) => (
                        <span
                          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/64"
                          key={feature}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-7 border-t border-white/10 pt-5">
                    <p className="text-sm font-medium text-white">Technology</p>
                    <p className="mt-3 text-sm leading-7 text-white/58">
                      {project.technology.join(" / ")}
                    </p>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {achievements.map(([value, label], index) => (
            <FadeIn
              className="glass-panel rounded-3xl p-6"
              delay={index * 0.06}
              key={label}
            >
              <Trophy aria-hidden="true" className="h-5 w-5 text-violet-300" />
              <p className="mt-7 text-5xl font-semibold text-white">{value}</p>
              <p className="mt-3 text-sm leading-6 text-white/58">{label}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8" id="timeline">
        <FadeIn>
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">
            Experience timeline
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-5xl">
            A path through AI products, dashboards, and durable fundamentals.
          </h2>
        </FadeIn>
        <div className="mt-12 space-y-5">
          {timeline.map((item, index) => (
            <FadeIn
              className="grid gap-5 border-l border-white/14 pl-6 md:grid-cols-[0.24fr_0.76fr] md:gap-10"
              delay={index * 0.06}
              key={item.title}
            >
              <p className="text-sm text-cyan-200">{item.period}</p>
              <div className="glass-panel rounded-3xl p-6">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 leading-7 text-white/62">{item.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-4 py-20 sm:px-6 lg:px-8" id="contact">
        <FadeIn className="glass-panel mx-auto max-w-6xl overflow-hidden rounded-[32px]">
          <div className="grid gap-0 lg:grid-cols-[1fr_0.82fr]">
            <div className="p-7 sm:p-10">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">
                Contact
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-5xl">
                Have an AI product, dashboard, or full-stack build in mind?
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/64">
                Shrushti is focused on polished products with strong user flows:
                authentication, data, cloud assets, AI logic, and interfaces that
                feel ready for real users.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <a href="mailto:hello@shrushti.dev">
                    <Mail aria-hidden="true" className="h-4 w-4" />
                    Email Shrushti
                  </a>
                </Button>
                <Button asChild size="lg" variant="ghost">
                  <a href="https://github.com/" rel="noreferrer" target="_blank">
                    <Code2 aria-hidden="true" className="h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              </div>
            </div>
            <div className="border-t border-white/10 bg-white/[0.035] p-7 sm:p-10 lg:border-l lg:border-t-0">
              <div className="space-y-4">
                {contactSignals.map(({ icon: Icon, label }) => (
                  <div className="flex items-center gap-3" key={label}>
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/30">
                      <Icon aria-hidden="true" className="h-5 w-5 text-cyan-200" />
                    </span>
                    <span className="text-sm text-white/68">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <footer className="relative z-10 mx-auto flex max-w-6xl flex-col gap-4 px-4 pb-10 pt-4 text-sm text-white/42 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>Copyright 2026 Shrushti Swarnakar. Built with Next.js, motion, and care.</p>
        <a className="hover:text-white" href="#top">
          Back to top
        </a>
      </footer>
    </main>
  );
}
