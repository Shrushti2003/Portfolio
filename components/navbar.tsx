"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  ["Work", "#work"],
  ["Stack", "#stack"],
  ["Timeline", "#timeline"],
  ["Contact", "#contact"],
];

export function Navbar() {
  return (
    <motion.header
      animate={{ opacity: 1, y: 0 }}
      className="fixed left-0 right-0 top-0 z-50 px-4 py-4"
      initial={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-black/45 px-3 py-2 shadow-2xl shadow-black/20 backdrop-blur-2xl">
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
              className="rounded-full px-4 py-2 text-sm text-white/62 transition hover:bg-white/8 hover:text-white"
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
      </nav>
    </motion.header>
  );
}
