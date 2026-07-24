"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import {
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  Database,
  ExternalLink,
  FileText,
  GraduationCap,
  Code2,
  Layers3,
  Mail,
  MapPin,
  Server,
  ShieldCheck,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { certificates, contactCards, projects, socialLinks, stackGroups, timeline } from "@/lib/portfolio-data";
import type { Project } from "@/types/portfolio";

const ProjectCore = dynamic(
  () => import("@/components/animations/OrbitalField").then((module) => module.OrbitalField),
  {
    ssr: false,
    loading: () => <ProjectCoreFallback />,
  },
);

const selectedOrder = ["strategy-hub", "zylora", "cloudnest", "booknest", "netflix-clone"];

const capabilityMap = [
  {
    title: "Product interfaces",
    icon: Sparkles,
    text: "Responsive flows, dashboard hierarchy, commerce browsing, and touch-ready interaction states.",
    projects: ["BookNest", "Netflix Clone", "Strategy Hub"],
  },
  {
    title: "Full-stack applications",
    icon: Layers3,
    text: "React/Next.js frontends connected to Express APIs, MongoDB models, authentication, and deployed products.",
    projects: ["Strategy Hub", "Zylora", "CloudNest Drive"],
  },
  {
    title: "Authentication and APIs",
    icon: ShieldCheck,
    text: "JWT, Google sign-in, role-aware states, protected data, and practical REST API design.",
    projects: ["Strategy Hub", "Zylora", "CloudNest Drive"],
  },
  {
    title: "Cloud and media systems",
    icon: Server,
    text: "Uploads, previews, folders, Cloudinary pipelines, storage dashboards, and quota-aware UI.",
    projects: ["CloudNest Drive"],
  },
  {
    title: "AI-assisted workflows",
    icon: BrainCircuit,
    text: "Gemini reports, prompt-shaped product flows, ATS guidance, roadmaps, and AI pricing concepts.",
    projects: ["Strategy Hub", "Zylora"],
  },
  {
    title: "Data-backed products",
    icon: Database,
    text: "MongoDB-backed listings, saved reports, resources, wishlists, folders, and persistent user state.",
    projects: ["Strategy Hub", "Zylora", "BookNest"],
  },
];

function ProjectCoreFallback() {
  return (
    <div className="core-fallback" aria-hidden="true">
      <div className="core-shell">
        <span className="core-mark">SS</span>
        {["UI", "API", "DB", "AI", "UX", "Cloud"].map((label, index) => (
          <span className={`core-node node-${index}`} key={label}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectArtwork({ project, index }: { project: Project; index: number }) {
  const terms = project.gallery.slice(0, 5);

  return (
    <div className={`project-art project-art-${index % 4}`} aria-label={`${project.name} project identity artwork`}>
      <div className="art-header">
        <span>{project.category}</span>
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="art-stage">
        <div className="art-map">
          {terms.map((term, termIndex) => (
            <span className={`art-chip chip-${termIndex}`} key={term}>
              {term}
            </span>
          ))}
        </div>
        <div className="art-product">
          <span>{project.name}</span>
          <small>{project.metrics.join(" / ")}</small>
        </div>
      </div>
    </div>
  );
}

function CaseStudyDrawer({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const previous = document.activeElement as HTMLElement | null;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    window.history.replaceState(null, "", `#case-${project.id}`);
    window.setTimeout(() => closeRef.current?.focus(), 20);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
      if (window.location.hash === `#case-${project.id}`) {
        window.history.replaceState(null, "", "#work");
      }
      previous?.focus?.();
    };
  }, [onClose, project]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          animate={{ opacity: 1 }}
          aria-labelledby="case-study-title"
          aria-modal="true"
          className="case-overlay"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
        >
          <motion.article
            animate={{ x: 0 }}
            className="case-drawer"
            exit={{ x: "100%" }}
            initial={{ x: "100%" }}
            onClick={(event) => event.stopPropagation()}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="case-topline">
              <span>{project.category}</span>
              <button aria-label="Close case study" onClick={onClose} ref={closeRef} type="button">
                <X aria-hidden="true" />
              </button>
            </div>
            <h2 id="case-study-title">{project.name}</h2>
            <p className="case-overview">{project.overview}</p>
            <div className="case-facts">
              {[
                ["Role", project.role],
                ["Status", project.status],
                ["Platform", project.platform],
                ["Challenge", project.challenges],
              ].map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <p>{value}</p>
                </div>
              ))}
            </div>
            <div className="case-grid">
              {[
                ["Problem", project.problem],
                ["What Shrushti Built", project.solution],
                ["Architecture", project.architecture],
                ["Learning", project.learning],
              ].map(([title, text]) => (
                <section key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </section>
              ))}
            </div>
            <div className="case-stack" aria-label={`${project.name} technology stack`}>
              {project.technology.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <div className="case-actions">
              {project.liveUrl ? (
                <Button asChild>
                  <a href={project.liveUrl} rel="noopener noreferrer" target="_blank">
                    Live demo <ExternalLink aria-hidden="true" />
                  </a>
                </Button>
              ) : null}
              <Button asChild variant="ghost">
                <a href={socialLinks.github} rel="noopener noreferrer" target="_blank">
                  GitHub profile <Code2 aria-hidden="true" />
                </a>
              </Button>
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function CountUp({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    let frame = 0;
    const start = performance.now();
    const tick = (time: number) => {
      const progress = Math.min((time - start) / 1100, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [prefersReducedMotion, value]);

  return <>{prefersReducedMotion ? value : count}+</>;
}

export function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  const orderedProjects = useMemo(
    () => selectedOrder.map((id) => projects.find((project) => project.id === id)).filter(Boolean) as Project[],
    [],
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const projectId = window.location.hash.replace("#case-", "");
    if (!projectId) return;
    const project = projects.find((item) => item.id === projectId);
    if (project) window.setTimeout(() => setSelectedProject(project), 0);
  }, []);

  return (
    <main className="site-shell" id="top">
      <a className="skip-link" href="#work">
        Skip to selected work
      </a>
      <Navbar
        menuOpen={mobileMenuOpen}
        onMenuToggle={() => setMobileMenuOpen((open) => !open)}
        onNavigate={() => setMobileMenuOpen(false)}
      />
      <CaseStudyDrawer project={selectedProject} onClose={() => setSelectedProject(null)} />

      <AnimatePresence>
        {mobileMenuOpen ? (
          <motion.div animate={{ opacity: 1 }} className="mobile-menu" exit={{ opacity: 0 }} initial={{ opacity: 0 }}>
            <button aria-label="Close navigation menu" onClick={() => setMobileMenuOpen(false)} type="button">
              <X aria-hidden="true" /> Close
            </button>
            {[
              ["Work", "#work"],
              ["Capabilities", "#capabilities"],
              ["About", "#about"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a href={href} key={href} onClick={() => setMobileMenuOpen(false)}>
                {label}
              </a>
            ))}
            <a className="mobile-resume" href={socialLinks.resume}>
              Resume <FileText aria-hidden="true" />
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <section className="hero-section section-frame" aria-labelledby="hero-title">
        <div className="hero-copy">
          <Reveal>
            <p className="section-kicker">Full-stack / MERN developer</p>
            <h1 id="hero-title">Shrushti Swarnakar</h1>
            <p className="hero-line">Full-stack developer building thoughtful products from interface to infrastructure.</p>
            <p className="hero-support">
              BCA 2025 graduate with verified work across React, Next.js, TypeScript, Node.js, Express,
              MongoDB, authentication, cloud integrations, and AI-assisted product flows.
            </p>
            <div className="availability">
              <span aria-hidden="true" />
              Open to full-time roles, internships, and graduate programs
            </div>
            <div className="hero-actions">
              <Button asChild size="lg">
                <a href="#work">
                  Explore selected work <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <a href={socialLinks.resume}>
                  Resume <FileText aria-hidden="true" />
                </a>
              </Button>
              <a className="icon-link" href={socialLinks.github} rel="noopener noreferrer" target="_blank" aria-label="GitHub profile">
                <Code2 aria-hidden="true" />
              </a>
              <a className="icon-link" href={socialLinks.linkedin} rel="noopener noreferrer" target="_blank" aria-label="LinkedIn profile">
                <ExternalLink aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
        <div className="hero-visual">
          <ProjectCore />
        </div>
        <a className="scroll-cue" href="#work">
          <span>Selected work</span>
        </a>
      </section>

      <section className="work-section section-frame" id="work" aria-labelledby="work-title">
        <Reveal>
          <p className="section-kicker">Selected Work</p>
          <div className="section-heading">
            <h2 id="work-title">Five builds, led by product evidence.</h2>
            <p>
              The strongest projects are presented as concise case studies. Live links appear only where the
              repository data provides a verified URL.
            </p>
          </div>
        </Reveal>
        <div className="project-list">
          {orderedProjects.map((project, index) => (
            <Reveal className="project-row" delay={index * 0.04} key={project.id}>
              <article id={`project-${project.id}`}>
                <ProjectArtwork project={project} index={index} />
                <div className="project-copy">
                  <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
                  <p className="project-category">{project.category}</p>
                  <h3>{project.name}</h3>
                  <p className="project-problem">{project.problem}</p>
                  <p>{project.solution}</p>
                  <dl>
                    <div>
                      <dt>Role</dt>
                      <dd>{project.role}</dd>
                    </div>
                    <div>
                      <dt>Technical challenge</dt>
                      <dd>{project.challenges}</dd>
                    </div>
                  </dl>
                  <div className="project-stack">
                    {project.technology.slice(0, 6).map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  <div className="project-actions">
                    {project.liveUrl ? (
                      <Button asChild>
                        <a href={project.liveUrl} rel="noopener noreferrer" target="_blank">
                          Live demo <ExternalLink aria-hidden="true" />
                        </a>
                      </Button>
                    ) : null}
                    <Button onClick={() => setSelectedProject(project)} type="button" variant="ghost">
                      Case study <ArrowUpRight aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="capability-section section-frame" id="capabilities" aria-labelledby="capabilities-title">
        <Reveal>
          <p className="section-kicker">Capabilities / Technical Profile</p>
          <div className="section-heading">
            <h2 id="capabilities-title">What Shrushti can build.</h2>
            <p>Skills are grouped by practical output and tied back to projects recruiters can inspect.</p>
          </div>
        </Reveal>
        <div className="capability-grid">
          {capabilityMap.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <Reveal className="capability-item" delay={index * 0.04} key={capability.title}>
                <Icon aria-hidden="true" />
                <h3>{capability.title}</h3>
                <p>{capability.text}</p>
                <div>
                  {capability.projects.map((project) => (
                    <span key={project}>{project}</span>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="tech-rail">
          {stackGroups.flatMap((group) => group.items).filter((item, index, arr) => arr.indexOf(item) === index).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </Reveal>
      </section>

      <section className="about-section section-frame" id="about" aria-labelledby="about-title">
        <Reveal className="about-intro">
          <p className="section-kicker">About and Journey</p>
          <h2 id="about-title">From C++ fundamentals to full-stack product systems.</h2>
          <p>
            Shrushti is a 2025 BCA graduate focused on complete product builds: interfaces that are easy
            to use, backend APIs that support the flow, and data models that make the product real.
          </p>
        </Reveal>
        <div className="timeline">
          {timeline.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal className="timeline-item" delay={index * 0.04} key={`${item.period}-${item.title}`}>
                <span className="timeline-period">{item.period}</span>
                <div>
                  <Icon aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p className="timeline-meta">{item.meta}</p>
                  <p>{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="credentials-section section-frame" id="credentials" aria-labelledby="credentials-title">
        <Reveal>
          <p className="section-kicker">Credentials</p>
          <div className="section-heading">
            <h2 id="credentials-title">Compact proof points.</h2>
            <p>Education, training milestones, resume access, and problem-solving practice in one place.</p>
          </div>
        </Reveal>
        <div className="credentials-layout">
          <Reveal className="leetcode-proof">
            <Trophy aria-hidden="true" />
            <span>LeetCode achievement</span>
            <strong>
              <CountUp value={400} /> problems solved
            </strong>
            <p>Consistent practice strengthened data structures, algorithms, debugging, and efficient code.</p>
            <Button asChild variant="ghost">
              <a href={socialLinks.leetcode} rel="noopener noreferrer" target="_blank">
                View profile <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          </Reveal>
          <div className="credential-list">
            {certificates.map((certificate) => (
              <Reveal className="credential-item" key={`${certificate.issuer}-${certificate.title}`}>
                <BookOpen aria-hidden="true" />
                <div>
                  <span>{certificate.issuer}</span>
                  <h3>{certificate.title}</h3>
                  <p>{certificate.focus}</p>
                  <small>{certificate.completed}</small>
                </div>
              </Reveal>
            ))}
            <Reveal className="credential-item">
              <GraduationCap aria-hidden="true" />
              <div>
                <span>Education</span>
                <h3>Bachelor of Computer Applications</h3>
                <p>BCA graduate, 2025. CGPA 7.50.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="contact-section section-frame" id="contact" aria-labelledby="contact-title">
        <Reveal>
          <p className="section-kicker">Contact</p>
          <h2 id="contact-title">Let&apos;s build something useful.</h2>
          <p>
            Available for full-time software engineering roles, Software Development Internship opportunities, and
            graduate programs. Current location: India.
          </p>
        </Reveal>
        <div className="contact-actions">
          {contactCards
            .filter((card) => card.label !== "Current Location")
            .map((card) => {
              const Icon = card.icon;
              const isExternal = card.href.startsWith("http");
              return (
                <a
                  className="contact-link"
                  href={card.href}
                  key={card.label}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  target={isExternal ? "_blank" : undefined}
                >
                  <Icon aria-hidden="true" />
                  <span>{card.label}</span>
                  <strong>{card.value}</strong>
                </a>
              );
            })}
          <a
            className="mailto-composer"
            href="mailto:swarnakarshrushti@gmail.com?subject=Opportunity%20for%20Shrushti%20Swarnakar&body=Hi%20Shrushti%2C%0A%0AI%27d%20like%20to%20connect%20about..."
          >
            <Mail aria-hidden="true" />
            Compose email
          </a>
        </div>
        <div className="location-line">
          <MapPin aria-hidden="true" />
          India
        </div>
      </section>

      <footer className="footer">
        <span className="footer-mark">SS</span>
        <p>Designed and developed by Shrushti Swarnakar. Copyright {currentYear}.</p>
        <a href="#top">Back to top</a>
      </footer>
    </main>
  );
}
