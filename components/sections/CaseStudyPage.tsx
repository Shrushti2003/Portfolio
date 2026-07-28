"use client";

import { type KeyboardEvent, type TouchEvent, useCallback, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Code2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/portfolio-data";
import type { Project, ProjectCaseStudy } from "@/types/portfolio";

const orderedProjectIds = ["strategy-hub", "zylora", "cloudnest", "lumibooks", "netflix-clone"];

type CaseStudyPageProps = {
  project: Project;
  caseStudy: ProjectCaseStudy;
};

function CaseStudyGallery({ project }: { project: Project }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedSources, setFailedSources] = useState<Set<string>>(() => new Set());
  const touchStartX = useRef<number | null>(null);
  const screenshots = useMemo(
    () => project.gallery.filter((screenshot) => !failedSources.has(screenshot.src)),
    [failedSources, project.gallery],
  );
  const safeIndex = screenshots.length ? Math.min(activeIndex, screenshots.length - 1) : 0;
  const activeScreenshot = screenshots[safeIndex];

  const showPrevious = useCallback(() => {
    if (!screenshots.length) return;
    setActiveIndex((current) => (current === 0 ? screenshots.length - 1 : current - 1));
  }, [screenshots.length]);

  const showNext = useCallback(() => {
    if (!screenshots.length) return;
    setActiveIndex((current) => (current + 1) % screenshots.length);
  }, [screenshots.length]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    },
    [showNext, showPrevious],
  );

  const handleTouchStart = useCallback((event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }, []);

  const handleTouchEnd = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      if (touchStartX.current === null) return;
      const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
      const delta = touchStartX.current - endX;
      touchStartX.current = null;
      if (Math.abs(delta) < 42) return;
      if (delta > 0) showNext();
      else showPrevious();
    },
    [showNext, showPrevious],
  );

  if (!activeScreenshot) {
    return (
      <div className="case-study-gallery is-empty">
        <p>No verified screenshot is available for this project.</p>
      </div>
    );
  }

  return (
    <div
      aria-label={`${project.name} screenshot walkthrough`}
      className="case-study-gallery"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="case-study-media" onTouchEnd={handleTouchEnd} onTouchStart={handleTouchStart}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={activeScreenshot.alt}
          decoding="async"
          key={activeScreenshot.src}
          loading={safeIndex === 0 ? "eager" : "lazy"}
          onError={() => {
            setFailedSources((current) => {
              const next = new Set(current);
              next.add(activeScreenshot.src);
              return next;
            });
          }}
          src={activeScreenshot.src}
        />
      </div>
      <div className="case-study-gallery-footer">
        <p>{activeScreenshot.caption}</p>
        {screenshots.length > 1 ? (
          <div className="case-study-controls">
            <button aria-label={`Previous ${project.name} screenshot`} onClick={showPrevious} type="button">
              <ChevronLeft aria-hidden="true" />
            </button>
            <button aria-label={`Next ${project.name} screenshot`} onClick={showNext} type="button">
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </div>
      {screenshots.length > 1 ? (
        <div className="case-study-dots" role="tablist" aria-label={`${project.name} screenshot pagination`}>
          {screenshots.map((screenshot, index) => (
            <button
              aria-label={`Open ${screenshot.caption} screenshot`}
              aria-selected={index === safeIndex}
              className={index === safeIndex ? "is-active" : undefined}
              key={screenshot.src}
              onClick={() => setActiveIndex(index)}
              role="tab"
              type="button"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function CaseStudyPage({ project, caseStudy }: CaseStudyPageProps) {
  const orderedProjects = orderedProjectIds
    .map((id) => projects.find((item) => item.id === id))
    .filter(Boolean) as Project[];
  const currentIndex = orderedProjects.findIndex((item) => item.id === project.id);
  const previousProject = orderedProjects[(currentIndex - 1 + orderedProjects.length) % orderedProjects.length];
  const nextProject = orderedProjects[(currentIndex + 1) % orderedProjects.length];
  const architectureItems = caseStudy.architecture.filter(
    (item) => item.label.trim().length > 0 && item.value.trim().length > 0,
  );

  return (
    <main className="case-study-shell">
      <section className="case-study-hero" aria-labelledby="case-study-title">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a className="case-back-link" href="/#work">
          <ArrowLeft aria-hidden="true" /> Back to Selected Work
        </a>
        <div className="case-study-hero-grid">
          <div>
            <p className="eyebrow">{project.category}</p>
            <h1 id="case-study-title">{project.name}</h1>
            <p className="case-study-lead">{project.overview}</p>
            {caseStudy.disclaimer ? <p className="project-disclaimer">{caseStudy.disclaimer}</p> : null}
            <div className="case-study-actions">
              {project.liveUrl ? (
                <Button asChild>
                  <a href={project.liveUrl} rel="noopener noreferrer" target="_blank">
                    Live Demo <ExternalLink aria-hidden="true" />
                  </a>
                </Button>
              ) : null}
              {project.repoUrl ? (
                <Button asChild variant="ghost">
                  <a href={project.repoUrl} rel="noopener noreferrer" target="_blank">
                    GitHub <Code2 aria-hidden="true" />
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
          <div className="case-study-meta">
            {[
              ["Type", project.platform],
              ["Role", project.role],
              ["Context", caseStudy.developmentContext],
            ].map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="case-study-section case-study-two-column">
        <div>
          <p className="eyebrow">Overview</p>
          <h2>What it is</h2>
        </div>
        <div className="case-study-prose">
          <p>{caseStudy.context}</p>
          <p>{caseStudy.goal}</p>
          <p>Designed for: {caseStudy.designedFor}</p>
        </div>
      </section>

      <section className="case-study-section">
        <p className="eyebrow">Key Features</p>
        <h2>Verified product behavior</h2>
        <div className="case-feature-grid">
          {caseStudy.keyFeatures.map((feature) => (
            <article key={feature}>
              <p>{feature}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="case-study-section case-study-two-column">
        <div>
          <p className="eyebrow">User Flow</p>
          <h2>Product journey</h2>
        </div>
        <ol className="case-study-list">
          {caseStudy.userFlow.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="case-study-section">
        <p className="eyebrow">Architecture</p>
        <h2>How it is built</h2>
        <div className="case-architecture-grid">
          {architectureItems.map((item) => (
            <article key={`${project.id}-${item.label}`}>
              <span>{item.label}</span>
              <p>{item.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="case-study-section case-study-two-column">
        <div>
          <p className="eyebrow">Data and APIs</p>
          <h2>Models and route responsibilities</h2>
        </div>
        <div className="case-study-stack">
          <div>
            <h3>Data model</h3>
            <ul>
              {caseStudy.dataModel.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>API design</h3>
            <ul>
              {caseStudy.apiDesign.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="case-study-section">
        <p className="eyebrow">Challenges</p>
        <h2>Problems I worked through</h2>
        <div className="case-feature-grid">
          {caseStudy.challenges.map((challenge) => (
            <article key={challenge.title}>
              <h3>{challenge.title}</h3>
              <p>{challenge.resolution}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="case-study-section">
        <p className="eyebrow">Screenshots</p>
        <h2>Product walkthrough</h2>
        <CaseStudyGallery project={project} />
      </section>

      <section className="case-study-section case-study-two-column">
        <div>
          <p className="eyebrow">Reflection</p>
          <h2>What I learned</h2>
        </div>
        <div className="case-study-prose">
          <p>{caseStudy.learning}</p>
          <h3>Future improvements</h3>
          <ul>
            {caseStudy.futureImprovements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {caseStudy.omitted?.length ? (
            <>
              <h3>Deliberately omitted</h3>
              <ul>
                {caseStudy.omitted.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </section>

      <section className="case-study-section">
        <p className="eyebrow">Verified From</p>
        <div className="case-study-tags">
          {caseStudy.verifiedFrom.map((source) => (
            <span key={source}>{source}</span>
          ))}
        </div>
      </section>

      <nav aria-label="Project case study navigation" className="case-study-next">
        <a href={`/projects/${previousProject.caseStudySlug}`}>
          <ArrowLeft aria-hidden="true" />
          <span>Previous</span>
          <strong>{previousProject.name}</strong>
        </a>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/#work">
          <span>All Projects</span>
          <strong>Selected Work</strong>
        </a>
        <a href={`/projects/${nextProject.caseStudySlug}`}>
          <span>Next</span>
          <strong>{nextProject.name}</strong>
          <ArrowRight aria-hidden="true" />
        </a>
      </nav>
    </main>
  );
}
