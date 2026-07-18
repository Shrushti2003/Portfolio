import type { Metadata } from "next";
import { Portfolio } from "@/components/portfolio";

export const metadata: Metadata = {
  title: "Full Stack Developer, MERN Stack Developer, and Frontend Engineer",
  description:
    "Explore Shrushti Swarnakar's Strategy Hub, Zylora, CloudNest Drive, BookNest, Netflix Clone, 400+ LeetCode practice, CGPA, skills, journey, certificates, and contact details.",
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shrushti Swarnakar",
    jobTitle: ["Full Stack Developer", "MERN Stack Developer", "Frontend Engineer"],
    alumniOf: "Bachelor of Computer Applications, 2025",
    sameAs: [
      "https://github.com/Shrushti2003",
      "https://www.linkedin.com/in/shrushti-swarnakar/",
      "https://leetcode.com/u/Shrushti2003/",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "AI Integrations",
      "Frontend Development",
    ],
    url: "https://shrushti-swarnakar.dev",
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
      <Portfolio />
    </>
  );
}
