"use client";

import { motion } from "framer-motion";

type SpotlightProject = {
  accent: string;
  category: string;
  label: string;
  metrics: string[];
  name: string;
};

export function ProjectSpotlight({
  project,
  index,
}: {
  project: SpotlightProject;
  index: number;
}) {
  return (
    <motion.div
      className={`animated-gradient overflow-hidden bg-gradient-to-br ${project.accent} p-1 text-black`}
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 180, damping: 20 }}
    >
      <motion.div
        className="min-h-[360px] rounded-[26px] border border-black/10 bg-black/12 p-5 backdrop-blur-sm"
        data-cursor="project"
        whileHover={{ y: -4 }}
      >
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-black/14 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
            {project.label}
          </span>
          <span className="text-xs font-semibold">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div className="mt-12 rounded-3xl bg-black/70 p-4 text-white shadow-2xl shadow-black/30">
          <div className="mb-4 flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
          </div>
          <h3 className="text-2xl font-semibold">{project.name}</h3>
          <p className="mt-2 text-sm leading-6 text-white/62">{project.category}</p>
          <div className="mt-7 grid gap-3">
            {project.metrics.map((metric) => (
              <div
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/70"
                key={metric}
              >
                {metric}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
