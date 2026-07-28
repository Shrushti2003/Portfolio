"use client";

import { type KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { techStack } from "@/lib/portfolio-data";

type StageSize = {
  width: number;
  height: number;
};

const ringScale = {
  inner: 1,
  middle: 1,
  outer: 1,
};

export function TechStackConstellation() {
  const [isOpen, setIsOpen] = useState(false);
  const [stageSize, setStageSize] = useState<StageSize>({ width: 0, height: 0 });
  const stageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const compact = stageSize.width > 0 && stageSize.width < 780;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const observer = new ResizeObserver(([entry]) => {
      const rect = entry.contentRect;
      setStageSize({ width: rect.width, height: rect.height });
    });

    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const center = useMemo(
    () => ({
      x: stageSize.width / 2,
      y: stageSize.height / 2,
    }),
    [stageSize.height, stageSize.width],
  );

  const desktopScale = useMemo(() => {
    if (!stageSize.width || !stageSize.height) return 0.82;
    const widthScale = Math.max(0.58, Math.min(1, (stageSize.width - 180) / 1040));
    return widthScale;
  }, [stageSize.height, stageSize.width]);

  const toggleOpen = useCallback(() => {
    setIsOpen((open) => !open);
  }, []);

  const handleCoreKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleOpen();
      }
    },
    [toggleOpen],
  );

  return (
    <div className="tech-constellation" data-state={isOpen ? "open" : "closed"}>
      <div className="tech-constellation-stage" id="tech-stack-visual" ref={stageRef}>
        <svg aria-hidden="true" className="tech-constellation-lines">
          <defs>
            <radialGradient cx="50%" cy="50%" id="techGlow" r="50%">
              <stop offset="0%" stopColor="#ff2d7a" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#ff2d7a" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50%" cy="50%" fill="url(#techGlow)" r="30%" />
          {!compact
            ? techStack.map((tech) => {
                const scale = desktopScale * ringScale[tech.ring];
                const x2 = center.x + tech.x * scale;
                const y2 = center.y + tech.y * scale;

                return (
                  <motion.line
                    animate={{
                      opacity: isOpen ? 0.28 : 0,
                      pathLength: isOpen ? 1 : 0,
                    }}
                    className={`tech-line tech-line-${tech.ring}`}
                    initial={false}
                    key={`line-${tech.name}`}
                    transition={reducedMotion ? { duration: 0 } : { duration: 0.55, ease: "easeOut" }}
                    x1={center.x}
                    x2={x2}
                    y1={center.y}
                    y2={y2}
                  />
                );
              })
            : null}
        </svg>

        <div className="tech-rings" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        {!compact ? (
          <div className="tech-node-field" aria-hidden={!isOpen} role="list">
            {techStack.map((tech, index) => {
              const Icon = tech.icon;
              const scale = desktopScale * ringScale[tech.ring];
              const delay = reducedMotion ? 0 : index * 0.025;

              return (
                <motion.div
                  animate={{
                    opacity: isOpen ? 1 : 0,
                    scale: isOpen ? 1 : 0.45,
                    x: isOpen ? tech.x * scale : 0,
                    y: isOpen ? tech.y * scale : 0,
                    rotate: isOpen && !reducedMotion ? (index % 2 === 0 ? -1.5 : 1.5) : 0,
                  }}
                  aria-label={`${tech.name}, ${tech.category}`}
                  className={`constellation-node constellation-node-${tech.size}`}
                  initial={false}
                  key={tech.name}
                  role="listitem"
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : { delay, duration: 0.68, ease: [0.22, 1, 0.36, 1] }
                  }
                >
                  <Icon aria-hidden="true" />
                  <span>{tech.name}</span>
                  <small>{tech.category}</small>
                </motion.div>
              );
            })}
          </div>
        ) : null}

        <motion.button
          aria-controls="tech-stack-visual"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Collapse verified technology stack" : "Explore verified technology stack"}
          className="tech-core-button"
          onKeyDown={handleCoreKeyDown}
          onClick={toggleOpen}
          style={{
            left: center.x,
            top: center.y,
          }}
          type="button"
        >
          <motion.span className="tech-core-inner" whileTap={reducedMotion ? undefined : { scale: 0.94 }}>
            <span className="tech-core-glow" aria-hidden="true" />
            <span className="tech-core-text">
              {isOpen ? "Close" : "Explore"}
              <strong>My Stack</strong>
            </span>
          </motion.span>
        </motion.button>

        <div aria-hidden={!isOpen} className={isOpen ? "tech-mobile-grid is-open" : "tech-mobile-grid"} role="list">
          {techStack.map((tech) => {
            const Icon = tech.icon;
            return (
              <div aria-label={`${tech.name}, ${tech.category}`} className="tech-mobile-node" key={tech.name} role="listitem">
                <Icon aria-hidden="true" />
                <span>{tech.name}</span>
                <small>{tech.category}</small>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
