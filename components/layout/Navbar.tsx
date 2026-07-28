"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { socialLinks } from "@/lib/portfolio-data";

export const navItems = [
  ["Selected Work", "#work"],
  ["Expertise", "#expertise"],
  ["About", "#about"],
  ["Journey", "#journey"],
  ["Certificates", "#certificates"],
  ["Contact", "#contact"],
];

export function Navbar({
  menuOpen,
  onMenuToggle,
  onNavigate,
}: {
  menuOpen: boolean;
  onMenuToggle: () => void;
  onNavigate: () => void;
}) {
  const [activeSection, setActiveSection] = useState("#top");
  const visibleSections = useRef(new Map<string, IntersectionObserverEntry>());

  useEffect(() => {
    const sections = visibleSections.current;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const href = `#${entry.target.id}`;
          if (entry.isIntersecting) {
            sections.set(href, entry);
          } else {
            sections.delete(href);
          }
        }

        const navHeight = Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--nav-height"),
        ) || 72;
        const readingLine = navHeight + window.innerHeight * 0.28;
        const visible = [...sections.entries()]
          .sort(([, first], [, second]) => {
            const firstTop = first.boundingClientRect.top;
            const secondTop = second.boundingClientRect.top;
            const firstScore = firstTop <= readingLine
              ? Math.abs(readingLine - firstTop) * 0.55
              : Math.abs(firstTop - readingLine) + 120;
            const secondScore = secondTop <= readingLine
              ? Math.abs(readingLine - secondTop) * 0.55
              : Math.abs(secondTop - readingLine) + 120;
            return firstScore - secondScore;
          })[0]?.[0];

        if (visible) {
          setActiveSection((current) => (current === visible ? current : visible));
        }
      },
      {
        rootMargin: "-24% 0px -50% 0px",
        threshold: [0, 0.08, 0.22, 0.45],
      },
    );

    for (const [, href] of navItems) {
      const section = document.querySelector<HTMLElement>(href);
      if (section) observer.observe(section);
    }

    return () => {
      observer.disconnect();
      sections.clear();
    };
  }, []);

  return (
    <motion.header
      animate={{ y: 0, opacity: 1 }}
      className="nav-wrap"
      initial={{ y: -18, opacity: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav aria-label="Primary navigation" className="nav-bar">
        <a aria-label="Shrushti Swarnakar home" className="brand-link" href="#top" onClick={onNavigate}>
          <span>SS</span>
          <strong>Shrushti</strong>
        </a>
        <div className="nav-links">
          {navItems.map(([label, href]) => (
            <a
              aria-current={activeSection === href ? "true" : undefined}
              className={activeSection === href ? "active" : ""}
              href={href}
              key={href}
              onClick={onNavigate}
            >
              {label}
            </a>
          ))}
        </div>
        <Button asChild className="nav-resume" size="default" variant="ghost">
          <a href={socialLinks.resume} rel="noopener noreferrer" target="_blank">
            Resume <FileText aria-hidden="true" />
          </a>
        </Button>
        <button
          aria-expanded={menuOpen}
          aria-label="Open navigation menu"
          className="nav-menu-button"
          onClick={onMenuToggle}
          type="button"
        >
          <Menu aria-hidden="true" />
        </button>
      </nav>
    </motion.header>
  );
}
