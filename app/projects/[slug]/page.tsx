import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/sections/CaseStudyPage";
import { projectCaseStudies, projects } from "@/lib/portfolio-data";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.caseStudySlug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.caseStudySlug === slug);

  if (!project) {
    return {
      title: "Project case study | Shrushti Swarnakar",
    };
  }

  return {
    title: `${project.name} case study | Shrushti Swarnakar`,
    description: project.overview,
  };
}

export default async function ProjectCaseStudyRoute({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.caseStudySlug === slug);
  if (!project) notFound();

  const caseStudy = projectCaseStudies[project.id];
  if (!caseStudy) notFound();

  return <CaseStudyPage caseStudy={caseStudy} project={project} />;
}
