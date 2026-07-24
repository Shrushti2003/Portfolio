"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import {
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  ExternalLink,
  FileText,
  Mail,
  MapPin,
  Trophy,
  X,
} from "lucide-react";
import { CursorSystem } from "@/components/animations/CursorSystem";
import { Reveal } from "@/components/animations/Reveal";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { certificates, contactCards, projects, socialLinks, timeline } from "@/lib/portfolio-data";
import type { Project } from "@/types/portfolio";

const ArchitectureScene = dynamic(
  () => import("@/components/animations/OrbitalField").then((module) => module.OrbitalField),
  { ssr: false, loading: () => <ArchitectureFallback /> },
);

const orderedProjectIds = ["strategy-hub", "zylora", "cloudnest", "booknest", "netflix-clone"];

const expertise = [
  ["Frontend engineering", "React, Next.js, TypeScript, Tailwind CSS, Redux, Framer Motion"],
  ["Full-stack applications", "Node.js, Express.js, MongoDB, REST APIs, deployment-aware product flows"],
  ["Authentication and security", "JWT, Google sign-in, protected state, role-aware product behavior"],
  ["AI-assisted workflows", "Gemini AI reports, ATS guidance, roadmaps, prompt-shaped product logic"],
  ["Cloud and media integration", "Cloudinary, Firebase, Docker, Vercel, Render, upload pipelines"],
  ["Problem solving", "C++, DSA practice, 400+ LeetCode problems, debugging, implementation discipline"],
];

function ArchitectureFallback() {
  return (
    <div className="architecture-fallback" aria-hidden="true">
      <span />
      <span />
      <span />
      <strong>SS</strong>
    </div>
  );
}

function CountUp({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    let frame = 0;
    const start = performance.now();
    const tick = (time: number) => {
      const progress = Math.min((time - start) / 1200, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion, value]);

  return <>{reducedMotion ? value : count}+</>;
}

function ProjectPlate({ project, index }: { project: Project; index: number }) {
  return (
    <div className="project-plate" aria-label={`${project.name} abstract project architecture`}>
      <div className="plate-grid" aria-hidden="true" />
      <div className="plate-index">{String(index + 1).padStart(2, "0")}</div>
      <div className="plate-stack" aria-hidden="true">
        <span className="slab slab-one" />
        <span className="slab slab-two" />
        <span className="slab slab-three" />
        <span className="slab slab-line" />
      </div>
      <div className="plate-copy">
        <span>{project.category}</span>
        <strong>{project.name}</strong>
      </div>
    </div>
  );
}

function CaseStudyDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
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
      if (window.location.hash === `#case-${project.id}`) window.history.replaceState(null, "", "#work");
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
            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }}
            className="case-panel"
            exit={{ opacity: 0, y: 18, clipPath: "inset(0 0 100% 0)" }}
            initial={{ opacity: 0, y: 18, clipPath: "inset(0 0 100% 0)" }}
            onClick={(event) => event.stopPropagation()}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="case-top">
              <span>{project.category}</span>
              <button aria-label="Close case study" onClick={onClose} ref={closeRef} type="button">
                <X aria-hidden="true" />
              </button>
            </div>
            <h2 id="case-study-title">{project.name}</h2>
            <p className="case-lead">{project.overview}</p>
            <div className="case-facts">
              {[
                ["Role", project.role],
                ["Platform", project.platform],
                ["Status", project.status],
                ["Challenge", project.challenges],
              ].map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <p>{value}</p>
                </div>
              ))}
            </div>
            <div className="case-grid">
              <section>
                <h3>Problem</h3>
                <p>{project.problem}</p>
              </section>
              <section>
                <h3>What I built</h3>
                <p>{project.solution}</p>
              </section>
              <section>
                <h3>Architecture</h3>
                <p>{project.architecture}</p>
              </section>
              <section>
                <h3>Learning</h3>
                <p>{project.learning}</p>
              </section>
            </div>
            <div className="case-stack">
              {project.technology.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <div className="case-actions">
              {project.liveUrl ? (
                <Button asChild>
                  <a href={project.liveUrl} rel="noopener noreferrer" target="_blank">
                    Live link <ExternalLink aria-hidden="true" />
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

export function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroDepth = useTransform(scrollYProgress, [0, 0.22], [0, -48]);
  const currentYear = new Date().getFullYear();

  const orderedProjects = useMemo(
    () => orderedProjectIds.map((id) => projects.find((project) => project.id === id)).filter(Boolean) as Project[],
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
    const id = window.location.hash.replace("#case-", "");
    const project = projects.find((item) => item.id === id);
    if (project) window.setTimeout(() => setSelectedProject(project), 0);
  }, []);

  const copyEmail = useCallback(async () => {
    await navigator.clipboard.writeText("swarnakarshrushti@gmail.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }, []);

  return (
    <main className="site-shell" id="top">
      <a className="skip-link" href="#work">Skip to selected work</a>
      <CursorSystem />
      <Navbar menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((open) => !open)} onNavigate={() => setMenuOpen(false)} />
      <CaseStudyDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
      <motion.div className="progress-line" style={{ scaleX: scrollYProgress }} aria-hidden="true" />

      <AnimatePresence>
        {menuOpen ? (
          <motion.div animate={{ opacity: 1 }} className="mobile-menu" exit={{ opacity: 0 }} initial={{ opacity: 0 }}>
            <button aria-label="Close navigation menu" onClick={() => setMenuOpen(false)} type="button">
              Close <X aria-hidden="true" />
            </button>
            {[
              ["Selected Work", "#work"],
              ["Expertise", "#expertise"],
              ["About", "#about"],
              ["Journey", "#journey"],
              ["Certificates", "#certificates"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
            <a href={socialLinks.resume}>Resume <FileText aria-hidden="true" /></a>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <section className="hero-section section-frame" aria-labelledby="hero-title">
        <motion.div className="hero-copy" style={{ y: heroDepth }}>
          <Reveal>
            <p className="eyebrow">Digital Architecture in Motion</p>
            <h1 id="hero-title">Shrushti Swarnakar</h1>
            <p className="role-line">Full-Stack Developer / MERN Stack Developer / Frontend Engineer</p>
            <p className="hero-lead">
              I build complete digital products that connect refined interfaces with APIs, databases, cloud workflows, and AI-assisted systems.
            </p>
            <p className="hero-support">
              BCA 2025 graduate, CGPA 7.50, open to full-time roles, software-development internships, and graduate programs.
            </p>
            <div className="hero-actions">
              <Button asChild size="lg"><a href="#work">View Selected Work <ArrowUpRight aria-hidden="true" /></a></Button>
              <Button asChild size="lg" variant="ghost"><a href={socialLinks.resume}>View Resume <FileText aria-hidden="true" /></a></Button>
              <a className="quiet-link" href={socialLinks.github} rel="noopener noreferrer" target="_blank" aria-label="GitHub"><Code2 aria-hidden="true" /></a>
              <a className="quiet-link" href={socialLinks.linkedin} rel="noopener noreferrer" target="_blank" aria-label="LinkedIn"><ExternalLink aria-hidden="true" /></a>
            </div>
          </Reveal>
        </motion.div>
        <div className="hero-architecture">
          <ArchitectureScene />
          <div className="hero-annotation annotation-one">interface / api / data</div>
          <div className="hero-annotation annotation-two">available now</div>
        </div>
      </section>

      <section className="work-section section-frame" id="work" aria-labelledby="work-title">
        <Reveal className="section-heading">
          <span>01</span>
          <div>
            <p className="eyebrow">Selected Work</p>
            <h2 id="work-title">Case studies with structure, systems, and restraint.</h2>
          </div>
          <p>Verified projects are presented through abstract architectural visuals where real screenshots were not available.</p>
        </Reveal>
        <div className="project-list">
          {orderedProjects.map((project, index) => (
            <Reveal className="project-row" delay={index * 0.04} key={project.id}>
              <article id={`project-${project.id}`}>
                <ProjectPlate project={project} index={index} />
                <div className="project-copy">
                  <span>{String(index + 1).padStart(2, "0")} / {project.category}</span>
                  <h3>{project.name}</h3>
                  <p className="project-problem">{project.problem}</p>
                  <p>{project.solution}</p>
                  <dl>
                    <div><dt>Role</dt><dd>{project.role}</dd></div>
                    <div><dt>Challenge</dt><dd>{project.challenges}</dd></div>
                  </dl>
                  <div className="stack-line">{project.technology.slice(0, 6).join(" / ")}</div>
                  <div className="project-actions">
                    {project.liveUrl ? (
                      <Button asChild><a href={project.liveUrl} rel="noopener noreferrer" target="_blank">Live link <ExternalLink aria-hidden="true" /></a></Button>
                    ) : null}
                    <Button onClick={() => setSelectedProject(project)} type="button" variant="ghost">Open case study <ArrowUpRight aria-hidden="true" /></Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="expertise-section section-frame" id="expertise" aria-labelledby="expertise-title">
        <Reveal className="section-heading">
          <span>02</span>
          <div>
            <p className="eyebrow">Expertise</p>
            <h2 id="expertise-title">A layered model of what I build.</h2>
          </div>
          <p>Capabilities are organized like an application architecture rather than a wall of skill pills.</p>
        </Reveal>
        <div className="expertise-map">
          {expertise.map(([title, text], index) => (
            <Reveal className="expertise-row" delay={index * 0.04} key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="about-journey-section section-frame" id="about" aria-labelledby="about-title">
        <Reveal className="about-copy">
          <p className="eyebrow">About and Journey</p>
          <h2 id="about-title">From programming foundations to complete product systems.</h2>
          <p>
            Shrushti is a BCA 2025 graduate with CGPA 7.50. Her path moved from C++ and DSA into MERN and full-stack development, with projects spanning AI reports, authentication, storage, maps, commerce, and responsive frontend experiences.
          </p>
        </Reveal>
        <div className="journey-timeline" id="journey">
          {timeline.map((item, index) => (
            <Reveal className="journey-item" delay={index * 0.04} key={`${item.period}-${item.title}`}>
              <span>{item.period}</span>
              <div>
                <h3>{item.title}</h3>
                <strong>{item.meta}</strong>
                <p>{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="archive-section section-frame" id="certificates" aria-labelledby="archive-title">
        <Reveal className="section-heading">
          <span>03</span>
          <div>
            <p className="eyebrow">Certificates and Achievements</p>
            <h2 id="archive-title">A concise archive of verified progress.</h2>
          </div>
          <p>Credential files were not present in the repository, so no fake credential buttons are shown.</p>
        </Reveal>
        <div className="archive-list">
          {certificates.filter((item) => item.issuer !== "LeetCode").map((certificate, index) => (
            <Reveal className="archive-row" delay={index * 0.04} key={`${certificate.issuer}-${certificate.title}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{certificate.title}</h3>
                <p>{certificate.issuer} / {certificate.focus}</p>
              </div>
              <small>{certificate.completed}</small>
            </Reveal>
          ))}
          <Reveal className="leetcode-archive">
            <Trophy aria-hidden="true" />
            <div>
              <span>Achievement</span>
              <h3><CountUp value={400} /> LeetCode problems solved</h3>
              <p>Strengthened DSA, debugging, pattern recognition, and implementation discipline.</p>
            </div>
            <Button asChild variant="ghost"><a href={socialLinks.leetcode} rel="noopener noreferrer" target="_blank">View profile <ArrowUpRight aria-hidden="true" /></a></Button>
          </Reveal>
        </div>
      </section>

      <section className="contact-section section-frame" id="contact" aria-labelledby="contact-title">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title">Let&apos;s build something precise and useful.</h2>
          <p>Available for full-time roles, software-development internships, and graduate programs. Based in India.</p>
        </Reveal>
        <div className="contact-grid">
          <button className="email-copy" onClick={copyEmail} type="button">
            {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
            <span>{copied ? "Copied" : "Copy email"}</span>
            <strong>swarnakarshrushti@gmail.com</strong>
          </button>
          <a className="email-main" href="mailto:swarnakarshrushti@gmail.com"><Mail aria-hidden="true" /> Email</a>
          {contactCards.filter((card) => !["Email", "Current Location"].includes(card.label)).map((card) => {
            const Icon = card.icon;
            const external = card.href.startsWith("http");
            return (
              <a className="contact-link" href={card.href} key={card.label} rel={external ? "noopener noreferrer" : undefined} target={external ? "_blank" : undefined}>
                <Icon aria-hidden="true" />
                <span>{card.label}</span>
                <strong>{card.value}</strong>
              </a>
            );
          })}
          <div className="contact-link static"><MapPin aria-hidden="true" /><span>Location</span><strong>India</strong></div>
        </div>
      </section>

      <footer className="footer">
        <span>SS</span>
        <p>Shrushti Swarnakar / Full-Stack Developer / swarnakarshrushti@gmail.com</p>
        <a href="#top">Back to top</a>
        <small>{currentYear}</small>
      </footer>
    </main>
  );
}
