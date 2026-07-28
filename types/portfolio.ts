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
  gallery: ProjectScreenshot[];
  metrics: string[];
  liveUrl?: string;
  repoUrl?: string;
  caseStudySlug: string;
  accent: string;
  duration: string;
  status: "Completed" | "Production Ready";
  role: "Solo Developer";
  platform: string;
  difficulty: string;
  filters: string[];
};

export type ProjectScreenshot = {
  src: string;
  alt: string;
  caption: string;
};

export type ProjectCaseStudy = {
  developmentContext: string;
  designedFor: string;
  context: string;
  goal: string;
  keyFeatures: string[];
  userFlow: string[];
  architecture: Array<{ label: string; value: string }>;
  dataModel: string[];
  apiDesign: string[];
  challenges: Array<{ title: string; resolution: string }>;
  learning: string;
  futureImprovements: string[];
  verifiedFrom: string[];
  disclaimer?: string;
  omitted?: string[];
};

export type CertificateItem = {
  title: string;
  issuer: string;
  date?: string;
  source: string;
  preview: string;
  alt: string;
  note?: string;
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

export type FoundationalProject = {
  title: string;
  href: string;
  technology: string;
  description: string;
};

export type TechStackItem = {
  name: string;
  category: string;
  icon: LucideIcon;
  x: number;
  y: number;
  size: "sm" | "md" | "lg";
  ring: "inner" | "middle" | "outer";
  evidence: string;
};
