"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  ["Work", "#work"],
  ["Stack", "#stack"],
  ["Journey", "#timeline"],
  ["Contact", "#contact"],
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#work");

  useEffect(() => {
    const sections = navItems.map(([, href]) => document.querySelector(href));
    const onScroll = () => {
      setScrolled(window.scrollY > 28);
      let current: Element | null | undefined;
      for (const section of sections) {
        if (section && section.getBoundingClientRect().top < 180) {
          current = section;
        }
      }
      if (current?.id) setActiveSection(`#${current.id}`);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      animate={{ opacity: 1, y: 0 }}
      className="fixed left-0 right-0 top-0 z-50 px-4 py-4"
      initial={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.nav
        animate={{
          maxWidth: scrolled ? 980 : 1152,
          paddingTop: scrolled ? 6 : 8,
          paddingBottom: scrolled ? 6 : 8,
        }}
        className="mx-auto flex items-center justify-between rounded-full border border-white/10 bg-[#070B14]/70 px-3 shadow-2xl shadow-black/20 backdrop-blur-2xl"
      >
        <a
          aria-label="Go to top"
          className="flex items-center gap-3 rounded-full px-2"
          href="#top"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-400 via-fuchsia-400 to-cyan-300 text-sm font-bold text-black">
            SS
          </span>
          <span className="hidden text-sm font-medium text-white/90 sm:block">
            Shrushti Swarnakar
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map(([label, href]) => (
            <a
              className={`rounded-full px-4 py-2 text-sm transition ${
                activeSection === href
                  ? "bg-cyan-300/12 text-cyan-100 shadow-[inset_0_0_0_1px_rgba(103,232,249,0.18)]"
                  : "text-white/62 hover:bg-white/8 hover:text-white"
              }`}
              href={href}
              key={href}
            >
              {label}
            </a>
          ))}
        </div>

        <Button asChild size="default" variant="ghost">
          <a href="#contact">
            Let&apos;s talk
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </Button>
      </motion.nav>
    </motion.header>
  );
}
