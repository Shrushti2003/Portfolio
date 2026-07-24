"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { socialLinks } from "@/lib/portfolio-data";

const navItems = [
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = ["#top", ...navItems.map(([, href]) => href)].map((href) => document.querySelector(href));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(`#${visible.target.id}`);
      },
      { rootMargin: "-22% 0px -62% 0px", threshold: [0.08, 0.18, 0.32] },
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    const handleScroll = () => setScrolled(window.scrollY > 32);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      animate={{ y: 0, opacity: 1 }}
      className={`nav-wrap ${scrolled ? "is-scrolled" : ""}`}
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
            <a className={activeSection === href ? "active" : ""} href={href} key={href} onClick={onNavigate}>
              {label}
            </a>
          ))}
        </div>
        <Button asChild className="nav-resume" size="default" variant="ghost">
          <a href={socialLinks.resume}>
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
