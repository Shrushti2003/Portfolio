import type { LucideIcon } from "lucide-react";

export type Project = {
  id: string;
  name: string;
  label: string;
  category: string;
  overview: string;
  problem: string;
  solution: string;
  architecture: string;
  challenges: string;
  learning: string;
  features: string[];
  technology: string[];
  gallery: string[];
  metrics: string[];
  liveUrl?: string;
  accent: string;
  duration: string;
  status: "Completed" | "Production Ready";
  role: "Solo Developer";
  platform: string;
  difficulty: string;
  filters: string[];
};

export type IconListItem = {
  title: string;
  icon: LucideIcon;
  items: string[];
};

export type TimelineItem = {
  period: string;
  title: string;
  icon: LucideIcon;
  meta: string;
  text: string;
  points: string[];
};

export type ContactCard = {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
};
