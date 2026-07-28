"use client";
import { type CSSProperties, type TouchEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  Copy,
  ExternalLink,
  FileText,
  MapPin,
  Trophy,
  X,
} from "lucide-react";
import { CursorSystem } from "@/components/animations/CursorSystem";
import { Reveal } from "@/components/animations/Reveal";
import { Navbar } from "@/components/layout/Navbar";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { TechStackConstellation } from "@/components/sections/TechStackConstellation";
import { Button } from "@/components/ui/button";
import { certificates, contactCards, foundationalProjects, projects, socialLinks, timeline } from "@/lib/portfolio-data";
import type { Project } from "@/types/portfolio";

const orderedProjectIds = ["strategy-hub", "zylora", "cloudnest", "lumibooks", "netflix-clone"];
const buildProcess = [
  ["IDEA", "Understand the problem and decide what the user needs."],
  ["INTERFACE", "Design responsive screens that are clear and easy to use."],
  ["LOGIC", "Connect APIs, authentication, data and application state."],
  ["PRODUCT", "Test each flow and turn the idea into a complete working application."],
];
const aboutStrengths = [
  ["01", "Product thinking", "Turning requirements into clear user flows and useful interfaces."],
  ["02", "Full stack execution", "Connecting responsive frontends with APIs, authentication and data."],
  ["03", "Learning by building", "Improving through projects, iteration and real implementation."],
];
const aboutFacts = [
  ["Based in", "Pune, India"],
  ["Education", "BCA, 2025"],
  ["Focus", "Full stack and frontend development"],
  ["Status", "Open to opportunities"],
];

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

function FoundationalProjects() {
  return (
    <section className="foundational-work" aria-labelledby="foundational-title">
      <Reveal className="foundational-heading">
        <p className="eyebrow">Foundational Projects</p>
        <h3 id="foundational-title">Earlier work that shows the progression.</h3>
      </Reveal>
      <div className="foundational-grid">
        {foundationalProjects.map((project, index) => (
          <Reveal className="foundational-card" delay={index * 0.035} key={project.href}>
            <a href={project.href} rel="noopener noreferrer" target="_blank">
              <span>{project.technology}</span>
              <strong>{project.title}</strong>
              <p>{project.description}</p>
              <small>View repository <ArrowUpRight aria-hidden="true" /></small>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
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

function ProjectCarousel({ project, index }: { project: Project; index: number }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedSources, setFailedSources] = useState<Set<string>>(() => new Set());
  const touchStartX = useRef<number | null>(null);
  const screenshots = useMemo(
    () => project.gallery.filter((screenshot) => !failedSources.has(screenshot.src)),
    [failedSources, project.gallery],
  );
  const safeActiveIndex = screenshots.length > 0 ? Math.min(activeIndex, screenshots.length - 1) : 0;
  const activeScreenshot = screenshots[safeActiveIndex];

  const showPrevious = useCallback(() => {
    if (screenshots.length === 0) return;
    setActiveIndex((current) => (current === 0 ? screenshots.length - 1 : current - 1));
  }, [screenshots.length]);

  const showNext = useCallback(() => {
    if (screenshots.length === 0) return;
    setActiveIndex((current) => (current + 1) % screenshots.length);
  }, [screenshots.length]);

  const handleImageError = useCallback((src: string) => {
    setFailedSources((current) => {
      const next = new Set(current);
      next.add(src);
      return next;
    });
  }, []);

  const handleTouchStart = useCallback((event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }, []);

  const handleTouchEnd = useCallback((event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = touchStartX.current - endX;
    touchStartX.current = null;
    if (Math.abs(delta) < 42) return;
    if (delta > 0) showNext();
    else showPrevious();
  }, [showNext, showPrevious]);

  if (!activeScreenshot) return <ProjectPlate project={project} index={index} />;

  return (
    <div className="project-carousel" aria-label={`${project.name} screenshots`}>
      <div className="carousel-frame" onTouchEnd={handleTouchEnd} onTouchStart={handleTouchStart}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={activeScreenshot.alt}
          className="is-active"
          decoding="async"
          key={activeScreenshot.src}
          loading="eager"
          onError={() => handleImageError(activeScreenshot.src)}
          src={activeScreenshot.src}
        />
      </div>
      <div className="carousel-topline">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{activeScreenshot.caption}</span>
      </div>
      {screenshots.length > 1 ? (
        <>
          <div className="carousel-controls">
            <button aria-label={`Show previous ${project.name} screenshot`} onClick={showPrevious} type="button">
              <ChevronLeft aria-hidden="true" />
            </button>
            <button aria-label={`Show next ${project.name} screenshot`} onClick={showNext} type="button">
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
          <div className="carousel-dots" role="tablist" aria-label={`${project.name} screenshot pagination`}>
            {screenshots.map((screenshot, screenshotIndex) => (
              <button
                aria-label={`Show ${screenshot.caption}`}
                aria-selected={screenshotIndex === safeActiveIndex}
                className={screenshotIndex === safeActiveIndex ? "is-active" : undefined}
                key={screenshot.src}
                onClick={() => setActiveIndex(screenshotIndex)}
                role="tab"
                type="button"
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

function CertificateGallery() {
  return (
    <div className="certificate-grid">
      {certificates.map((certificate, index) => (
        <Reveal className="certificate-card" delay={index * 0.04} key={certificate.source}>
          <a href={certificate.source} rel="noopener noreferrer" target="_blank">
            <span className="certificate-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="certificate-preview">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={certificate.alt} loading="lazy" src={certificate.preview} />
            </span>
            <span className="certificate-body">
              <span>{certificate.issuer}</span>
              <strong>{certificate.title}</strong>
              {certificate.date ? <small>{certificate.date}</small> : null}
              {certificate.note ? <em>{certificate.note}</em> : null}
            </span>
            <span className="certificate-action">
              View certificate <ExternalLink aria-hidden="true" />
            </span>
          </a>
        </Reveal>
      ))}
    </div>
  );
}

export function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const currentYear = new Date().getFullYear();

  const orderedProjects = useMemo(
    () => orderedProjectIds.map((id) => projects.find((project) => project.id === id)).filter(Boolean) as Project[],
    [],
  );

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
            <a href={socialLinks.resume} rel="noopener noreferrer" target="_blank">Resume <FileText aria-hidden="true" /></a>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <section className="hero-section section-frame" aria-labelledby="hero-title">
        <motion.div className="hero-copy">
          <Reveal>
            <h1 className="hero-name" id="hero-title">
              <span>Shrushti</span>
              <span>Swarnakar</span>
            </h1>
            <div className="role-line" aria-label="Full stack developer. MERN Stack, frontend engineering and API based products.">
              <strong>Full stack developer</strong>
              <span>MERN Stack, frontend engineering and API based products</span>
            </div>
            <p className="hero-lead">
              I build thoughtful web products where polished interfaces meet dependable backend systems.
            </p>
            <p className="hero-support">
              From responsive React experiences to APIs, authentication and databases, I enjoy turning complex ideas into practical products people can use.
            </p>
            <div className="hero-availability" aria-label="BCA 2025, Pune India. Open to internships and entry level software roles.">
              <span>BCA 2025 · Pune, India</span>
              <span className="availability-badge"><i aria-hidden="true" />Open to internships and entry level software roles</span>
            </div>
            <div className="hero-actions">
              <Button asChild size="lg">
                <a aria-label="Go to contact section" href="#contact">Let&apos;s Connect <ArrowUpRight aria-hidden="true" /></a>
              </Button>
              <Button asChild size="lg" variant="ghost"><a href={socialLinks.resume} rel="noopener noreferrer" target="_blank">View Resume <FileText aria-hidden="true" /></a></Button>
              <a className="quiet-link" href={socialLinks.github} rel="noopener noreferrer" target="_blank" aria-label="Open GitHub profile" title="GitHub profile"><Code2 aria-hidden="true" /><span className="sr-only">GitHub</span></a>
              <a className="quiet-link" href={socialLinks.linkedin} rel="noopener noreferrer" target="_blank" aria-label="Open LinkedIn profile" title="LinkedIn profile"><ExternalLink aria-hidden="true" /><span className="sr-only">LinkedIn</span></a>
            </div>
          </Reveal>
        </motion.div>
        <div className="hero-architecture">
          <HeroVisual />
        </div>
      </section>

      <section className="work-section section-frame" id="work" aria-labelledby="work-title">
        <Reveal className="section-heading">
          <span>01</span>
          <div>
            <p className="eyebrow">Selected Work</p>
            <h2 id="work-title">Projects I built while learning full stack development.</h2>
          </div>
        </Reveal>
        <div className="project-list">
          {orderedProjects.map((project, index) => (
            <Reveal className="project-row" delay={index * 0.04} key={project.id}>
              <article id={`project-${project.id}`}>
                <ProjectCarousel project={project} index={index} />
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
                    <Button asChild variant="ghost">
                      <a href={`/projects/${project.caseStudySlug}`}>
                        Open case study <ArrowUpRight aria-hidden="true" />
                      </a>
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <FoundationalProjects />
      </section>

      <section className="expertise-section section-frame" id="expertise" aria-labelledby="expertise-title">
        <Reveal className="expertise-heading">
          <p className="eyebrow">Expertise</p>
          <h2 id="expertise-title">Tools I use to build full stack web apps.</h2>
          <p>Explore the technologies I have used in my projects and training.</p>
        </Reveal>
        <TechStackConstellation />
      </section>

      <section className="about-journey-section section-frame" id="about" aria-labelledby="about-title">
        <div className="about-editorial">
          <Reveal className="about-copy">
            <p className="eyebrow">About me</p>
            <h2 id="about-title">I care about how a product feels and how well it works.</h2>
            <div className="about-story">
              <p>
                I&apos;m Shrushti, a BCA graduate from Pune who enjoys building complete web applications. I like working on both the interface people use and the backend systems that make everything function.
              </p>
              <p>
                I&apos;ve worked with React, APIs, authentication, databases and deployment through projects such as Strategy Hub, Zylora and CloudNest Drive. Building these projects has helped me understand user flows, solve technical problems and develop an idea into a working application.
              </p>
              <p>
                I&apos;m currently looking for my first opportunity in software development. I want to contribute to real products, learn from an experienced team and continue improving my skills.
              </p>
            </div>
          </Reveal>
          <Reveal className="build-process-visual" delay={0.08}>
            <div className="process-orbit" aria-hidden="true" />
            <div className="process-signal" aria-hidden="true" />
            <div className="process-node-grid" aria-label="Build process from idea to product">
              {buildProcess.map(([label, description], index) => (
                <button className="process-node" key={label} style={{ "--node-index": index } as CSSProperties} type="button">
                  <span>{label}</span>
                  <small>{description}</small>
                </button>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal className="about-strengths" delay={0.1}>
          {aboutStrengths.map(([index, title, text]) => (
            <article key={title}>
              <span>{index}</span>
              <strong>{title}</strong>
              <p>{text}</p>
            </article>
          ))}
        </Reveal>
        <Reveal className="about-facts" delay={0.14}>
          {aboutFacts.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </Reveal>
        <div className="journey-timeline" id="journey" aria-label="Journey timeline">
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
            <h2 id="archive-title">Certificates and steady practice.</h2>
          </div>
        </Reveal>
        <div className="archive-list">
          <CertificateGallery />
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
        <Reveal className="contact-heading">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title">Open to software development roles.</h2>
          <p>Based in Pune, India and available for internships, graduate opportunities and entry level roles.</p>
        </Reveal>
        <div className="contact-grid">
          <button className="email-copy" onClick={copyEmail} type="button">
            {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
            <span>{copied ? "Copied" : "Copy email"}</span>
            <strong>swarnakarshrushti@gmail.com</strong>
          </button>
          {contactCards.filter((card) => !["Email", "Current Location"].includes(card.label)).map((card) => {
            const Icon = card.icon;
            const external = card.href.startsWith("http") || card.href === socialLinks.resume;
            const className = card.label === "Resume" ? "contact-link contact-link-resume" : "contact-link";
            return (
              <a className={className} href={card.href} key={card.label} rel={external ? "noopener noreferrer" : undefined} target={external ? "_blank" : undefined}>
                <Icon aria-hidden="true" />
                <span>{card.label}</span>
                <strong>{card.value}</strong>
              </a>
            );
          })}
          <div className="contact-link contact-link-location static"><MapPin aria-hidden="true" /><span>Location</span><strong>Pune, India</strong></div>
        </div>
      </section>

      <footer className="footer">
        <span>SS</span>
        <p>Shrushti Swarnakar / Full stack developer / swarnakarshrushti@gmail.com</p>
        <a href="#top">Back to top</a>
        <small>{currentYear}</small>
      </footer>
    </main>
  );
}
