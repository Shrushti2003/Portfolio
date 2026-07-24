"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import {
  ArrowUpRight,
  Award,
  BrainCircuit,
  Check,
  Code2,
  Copy,
  ExternalLink,
  FileText,
  GraduationCap,
  Layers3,
  MapPin,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";
import { CursorSystem } from "@/components/animations/CursorSystem";
import { Reveal } from "@/components/animations/Reveal";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { certificates, contactCards, projects, socialLinks, stackGroups, timeline } from "@/lib/portfolio-data";
import type { Project } from "@/types/portfolio";

const CodeSculpture = dynamic(
  () => import("@/components/animations/OrbitalField").then((module) => module.OrbitalField),
  { ssr: false, loading: () => <SculptureFallback /> },
);

const projectOrder = ["strategy-hub", "zylora", "cloudnest", "booknest", "netflix-clone"];

const projectThemes: Record<string, { theme: string; sticker: string; verb: string }> = {
  "strategy-hub": { theme: "project-violet", sticker: "AI prep lab", verb: "Analyzes" },
  zylora: { theme: "project-green", sticker: "Reuse network", verb: "Connects" },
  cloudnest: { theme: "project-blue", sticker: "Cloud vault", verb: "Stores" },
  booknest: { theme: "project-peach", sticker: "Book commerce", verb: "Guides" },
  "netflix-clone": { theme: "project-red", sticker: "Streaming UI", verb: "Polishes" },
};

const capabilities = [
  {
    title: "Frontend experiences",
    icon: Sparkles,
    text: "Expressive responsive interfaces, motion systems, product surfaces, and touch-friendly UI details.",
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "Framer Motion"],
    projects: ["BookNest", "Strategy Hub", "Netflix Clone"],
  },
  {
    title: "Full-stack products",
    icon: Layers3,
    text: "Complete MERN-style products with real flows, dashboards, data persistence, and deployment awareness.",
    stack: ["Node.js", "Express.js", "MongoDB", "Mongoose", "REST APIs"],
    projects: ["Strategy Hub", "Zylora", "CloudNest Drive"],
  },
  {
    title: "Auth, APIs and data",
    icon: ShieldCheck,
    text: "JWT, OAuth-aware flows, protected routes, saved reports, resource listings, folders, and wishlist state.",
    stack: ["JWT", "Firebase", "MongoDB", "REST APIs", "Postman"],
    projects: ["Zylora", "CloudNest Drive", "Strategy Hub"],
  },
  {
    title: "AI and cloud workflows",
    icon: BrainCircuit,
    text: "Gemini-powered reports, AI-guided roadmaps, pricing ideas, Cloudinary uploads, and product automation.",
    stack: ["Gemini AI", "Cloudinary", "Docker", "Vercel", "Render"],
    projects: ["Strategy Hub", "Zylora", "CloudNest Drive"],
  },
  {
    title: "Problem solving",
    icon: Trophy,
    text: "400+ LeetCode problems strengthened DSA patterns, debugging, and efficient implementation habits.",
    stack: ["C++", "JavaScript", "Algorithms", "Data Structures"],
    projects: ["LeetCode", "C++ DSA"],
  },
];

function SculptureFallback() {
  return (
    <div className="sculpture-fallback" aria-hidden="true">
      <div className="fallback-window one">React</div>
      <div className="fallback-window two">API</div>
      <div className="fallback-window three">DB</div>
      <div className="fallback-monogram">SS</div>
    </div>
  );
}

function Magnetic({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`magnetic-wrap ${className}`}>{children}</span>;
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

function ProjectPoster({ project, index }: { project: Project; index: number }) {
  const theme = projectThemes[project.id];
  const features = project.features.slice(0, 5);

  return (
    <div className={`project-poster ${theme.theme}`}>
      <div className="poster-orbit" aria-hidden="true" />
      <div className="poster-top">
        <span>{theme.sticker}</span>
        <strong>{String(index + 1).padStart(2, "0")}</strong>
      </div>
      <div className="poster-stack" aria-hidden="true">
        <div className="poster-window main-window">
          <span>{project.name}</span>
          <small>{theme.verb} product flow</small>
        </div>
        <div className="poster-window mini-window">{project.technology[0]}</div>
        <div className="poster-window mini-window alt">{project.technology[1]}</div>
      </div>
      <div className="poster-features">
        {features.map((feature) => (
          <span key={feature}>{feature}</span>
        ))}
      </div>
    </div>
  );
}

function CaseStudyDrawer({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const previous = document.activeElement as HTMLElement | null;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    window.history.replaceState(null, "", `#case-${project.id}`);
    window.setTimeout(() => closeRef.current?.focus(), 20);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", close);
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
            animate={{ clipPath: "inset(0 0 0 0 round 34px)", y: 0 }}
            className={`case-drawer ${projectThemes[project.id]?.theme ?? ""}`}
            exit={{ clipPath: "inset(0 0 100% 0 round 34px)", y: 28 }}
            initial={{ clipPath: "inset(0 0 100% 0 round 34px)", y: 28 }}
            onClick={(event) => event.stopPropagation()}
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="case-topline">
              <span>{project.category}</span>
              <button aria-label="Close case study" onClick={onClose} ref={closeRef} type="button">
                <X aria-hidden="true" />
              </button>
            </div>
            <div className="case-hero">
              <span className="case-sticker">{projectThemes[project.id]?.sticker}</span>
              <h2 id="case-study-title">{project.name}</h2>
              <p>{project.overview}</p>
            </div>
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
                ["Solution", project.solution],
                ["Architecture", project.architecture],
                ["What I learned", project.learning],
              ].map(([title, text]) => (
                <section key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </section>
              ))}
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

export function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);
  const currentYear = new Date().getFullYear();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.18], [0, -80]);
  const ribbonX = useTransform(scrollYProgress, [0, 1], ["0%", "-32%"]);

  const orderedProjects = useMemo(
    () => projectOrder.map((id) => projects.find((project) => project.id === id)).filter(Boolean) as Project[],
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
    const project = projects.find((item) => item.id === projectId);
    if (project) window.setTimeout(() => setSelectedProject(project), 0);
  }, []);

  const copyEmail = useCallback(async () => {
    await navigator.clipboard.writeText("swarnakarshrushti@gmail.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }, []);

  return (
    <main className="playground-shell" id="top">
      <a className="skip-link" href="#work">
        Skip to selected work
      </a>
      <CursorSystem />
      <Navbar
        menuOpen={mobileMenuOpen}
        onMenuToggle={() => setMobileMenuOpen((open) => !open)}
        onNavigate={() => setMobileMenuOpen(false)}
      />
      <CaseStudyDrawer project={selectedProject} onClose={() => setSelectedProject(null)} />
      <motion.div aria-hidden="true" className="progress-brush" style={{ scaleX: scrollYProgress }} />

      <AnimatePresence>
        {mobileMenuOpen ? (
          <motion.div
            animate={{ clipPath: "circle(150% at 90% 8%)" }}
            className="mobile-menu"
            exit={{ clipPath: "circle(0% at 90% 8%)" }}
            initial={{ clipPath: "circle(0% at 90% 8%)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <button aria-label="Close navigation menu" onClick={() => setMobileMenuOpen(false)} type="button">
              Close <X aria-hidden="true" />
            </button>
            {[
              ["Work", "#work"],
              ["Skills", "#skills"],
              ["Journey", "#journey"],
              ["Certificates", "#certificates"],
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
        <motion.div className="hero-copy" style={{ y: heroY }}>
          <Reveal>
            <span className="studio-badge">Shrushti&apos;s Creative Code Playground</span>
            <h1 id="hero-title">
              <span>Shrushti</span>
              <span>Swarnakar</span>
            </h1>
            <p className="role-line">Full-Stack Developer / MERN Stack Developer / Frontend Engineer</p>
            <p className="hero-line">I build complete digital products where interfaces, APIs, databases, cloud flows, and AI ideas click into place.</p>
            <div className="hero-actions">
              <Magnetic>
                <Button asChild size="lg">
                  <a href="#work">
                    Explore My Work <ArrowUpRight aria-hidden="true" />
                  </a>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild size="lg" variant="ghost">
                  <a href={socialLinks.resume}>
                    View Resume <FileText aria-hidden="true" />
                  </a>
                </Button>
              </Magnetic>
              <a className="round-link" href={socialLinks.github} rel="noopener noreferrer" target="_blank" aria-label="Open GitHub profile">
                Git
              </a>
              <a className="round-link" href={socialLinks.linkedin} rel="noopener noreferrer" target="_blank" aria-label="Open LinkedIn profile">
                In
              </a>
            </div>
          </Reveal>
          <Reveal className="availability-strip" delay={0.15}>
            <span aria-hidden="true" />
            Available for full-time roles, software-development internships, and graduate programs
          </Reveal>
        </motion.div>
        <div className="hero-stage">
          <CodeSculpture />
          <div className="hero-sticker sticker-one">React</div>
          <div className="hero-sticker sticker-two">MongoDB</div>
          <div className="hero-sticker sticker-three">AI flows</div>
        </div>
        <motion.div aria-hidden="true" className="hero-ribbon" style={{ x: ribbonX }}>
          Full-stack developer / MERN stack / frontend engineer / product builder / DSA practice /
        </motion.div>
      </section>

      <section className="work-section section-frame" id="work" aria-labelledby="work-title">
        <Reveal className="section-intro colorful-intro">
          <span className="section-index">01</span>
          <p className="section-kicker">Selected projects</p>
          <h2 id="work-title">Product stories with color, code, and proof.</h2>
          <p>
            Five verified projects, presented as playful case studies. Live demo buttons only appear where a real URL exists in the project data.
          </p>
        </Reveal>
        <div className="project-showcase">
          {orderedProjects.map((project, index) => (
            <Reveal className={`project-feature ${projectThemes[project.id]?.theme}`} delay={index * 0.05} key={project.id}>
              <article id={`project-${project.id}`}>
                <ProjectPoster project={project} index={index} />
                <div className="project-copy">
                  <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
                  <p className="project-category">{project.category}</p>
                  <h3>{project.name}</h3>
                  <p className="project-problem">{project.problem}</p>
                  <p>{project.solution}</p>
                  <div className="project-meta-grid">
                    <div>
                      <span>Role</span>
                      <strong>{project.role}</strong>
                    </div>
                    <div>
                      <span>Technical challenge</span>
                      <strong>{project.challenges}</strong>
                    </div>
                  </div>
                  <div className="project-stack">
                    {project.technology.slice(0, 7).map((tech) => (
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
                      Open case study <ArrowUpRight aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="skills-section section-frame" id="skills" aria-labelledby="skills-title">
        <Reveal className="section-intro dark-intro">
          <span className="section-index">02</span>
          <p className="section-kicker">Capabilities and skills</p>
          <h2 id="skills-title">A playful toolkit for real product work.</h2>
          <p>Technologies are organized by what they help Shrushti build, not fake percentages.</p>
        </Reveal>
        <div className="capability-playground">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <Reveal className={`capability-bubble bubble-${index}`} delay={index * 0.04} key={capability.title}>
                <Icon aria-hidden="true" />
                <h3>{capability.title}</h3>
                <p>{capability.text}</p>
                <div className="bubble-stack">
                  {capability.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <small>{capability.projects.join(" / ")}</small>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="tech-marquee" aria-label="Technology stack">
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 28, ease: "linear", repeat: Infinity }}>
            {[...stackGroups.flatMap((group) => group.items), ...stackGroups.flatMap((group) => group.items)].map((tech, index) => (
              <span key={`${tech}-${index}`}>{tech}</span>
            ))}
          </motion.div>
        </Reveal>
      </section>

      <section className="leetcode-section section-frame" id="leetcode" aria-labelledby="leetcode-title">
        <Reveal className="leetcode-card">
          <div className="algorithm-path" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div>
            <p className="section-kicker">Problem solving</p>
            <h2 id="leetcode-title">
              <CountUp value={400} /> LeetCode problems solved
            </h2>
            <p>
              Consistent DSA practice strengthened pattern recognition, debugging, implementation speed, and the ability to reason through product logic.
            </p>
          </div>
          <Button asChild variant="ghost">
            <a href={socialLinks.leetcode} rel="noopener noreferrer" target="_blank">
              View LeetCode <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        </Reveal>
      </section>

      <section className="about-section section-frame" id="about" aria-labelledby="about-title">
        <Reveal className="about-copy">
          <span className="section-index">03</span>
          <p className="section-kicker">About me</p>
          <h2 id="about-title">I like turning messy ideas into working software.</h2>
          <p>
            Shrushti is a 2025 BCA graduate with a 7.50 CGPA, moving from C++ and DSA fundamentals into MERN and full-stack product development. The work centers on complete builds: frontend experience, APIs, authentication, database-backed features, cloud integrations, and AI-assisted workflows.
          </p>
        </Reveal>
        <Reveal className="about-collage" delay={0.1}>
          <div className="collage-card coral">BCA 2025</div>
          <div className="collage-card lime">CGPA 7.50</div>
          <div className="collage-card violet">MERN builder</div>
          <div className="collage-card cyan">India</div>
        </Reveal>
      </section>

      <section className="journey-section section-frame" id="journey" aria-labelledby="journey-title">
        <Reveal className="section-intro">
          <span className="section-index">04</span>
          <p className="section-kicker">Development journey</p>
          <h2 id="journey-title">A learning path that keeps turning into products.</h2>
        </Reveal>
        <div className="journey-path">
          {timeline.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal className="journey-milestone" delay={index * 0.05} key={`${item.period}-${item.title}`}>
                <span className="path-year">{item.period}</span>
                <div>
                  <Icon aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <strong>{item.meta}</strong>
                  <p>{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="certificates-section section-frame" id="certificates" aria-labelledby="certificates-title">
        <Reveal className="section-intro dark-intro">
          <span className="section-index">05</span>
          <p className="section-kicker">Certificates</p>
          <h2 id="certificates-title">Verified learning, no invented credentials.</h2>
          <p>Credential files or URLs were not present in the repository, so these are shown as verified learning records without fake buttons.</p>
        </Reveal>
        <div className="certificate-stack">
          {certificates.filter((certificate) => certificate.issuer !== "LeetCode").map((certificate, index) => (
            <Reveal className="certificate-paper" delay={index * 0.06} key={`${certificate.issuer}-${certificate.title}`}>
              <span className="paper-seal" aria-hidden="true">
                <Award />
              </span>
              <p>{certificate.issuer}</p>
              <h3>{certificate.title}</h3>
              <strong>{certificate.focus}</strong>
              <small>{certificate.completed}</small>
              <span className="no-credential">Credential link not available in repository</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="education-section section-frame" id="education" aria-labelledby="education-title">
        <Reveal className="education-panel">
          <GraduationCap aria-hidden="true" />
          <div>
            <p className="section-kicker">Education and resume</p>
            <h2 id="education-title">Bachelor of Computer Applications, 2025.</h2>
            <p>CGPA 7.50. Resume is available as the verified text file included in the portfolio repository.</p>
          </div>
          <Button asChild>
            <a href={socialLinks.resume}>
              View Resume <FileText aria-hidden="true" />
            </a>
          </Button>
        </Reveal>
      </section>

      <section className="contact-section section-frame" id="contact" aria-labelledby="contact-title">
        <Reveal className="contact-hero">
          <p className="section-kicker">Contact</p>
          <h2 id="contact-title">Let&apos;s build something useful.</h2>
          <p>Open to full-time roles, software-development internships, and graduate programs. Based in India.</p>
        </Reveal>
        <div className="contact-board">
          <button className="copy-email" onClick={copyEmail} type="button">
            {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
            {copied ? "Copied!" : "Copy email"}
            <strong>swarnakarshrushti@gmail.com</strong>
          </button>
          <a className="mail-composer" href="mailto:swarnakarshrushti@gmail.com?subject=Opportunity%20for%20Shrushti%20Swarnakar&body=Hi%20Shrushti%2C%0A%0AI%27d%20like%20to%20connect%20about...">
            <Send aria-hidden="true" />
            Write email
          </a>
          {contactCards
            .filter((card) => !["Email", "Current Location"].includes(card.label))
            .map((card) => {
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
          <div className="contact-location">
            <MapPin aria-hidden="true" />
            India
          </div>
        </div>
      </section>

      <footer className="footer">
        <div>
          <span className="footer-mark">SS</span>
          <p>Shrushti Swarnakar / Full-Stack Developer / swarnakarshrushti@gmail.com</p>
        </div>
        <a href="#top">
          Back to top <Rocket aria-hidden="true" />
        </a>
        <small>Copyright {currentYear}. Built as a creative code playground.</small>
      </footer>
    </main>
  );
}
