import type { Metadata } from "next";
import { Portfolio } from "@/components/sections/Portfolio";

export const metadata: Metadata = {
  title: "Full Stack Developer Portfolio",
  description:
    "Selected full-stack, MERN, AI, cloud, commerce, and frontend projects by Shrushti Swarnakar, a 2025 BCA graduate open to software engineering roles.",
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
