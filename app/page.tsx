import type { Metadata } from "next";
import { Portfolio } from "@/components/portfolio";

export const metadata: Metadata = {
  title: "Fresher Full Stack Developer and MERN Stack Developer",
  description:
    "Explore Shrushti Swarnakar's Strategy Hub, Zylora, CloudNest Drive, BookNest, and Netflix Clone projects, plus skills, journey, certificates, and contact details.",
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shrushti Swarnakar",
    jobTitle: ["Fresher Full Stack Developer", "MERN Stack Developer", "Frontend Developer"],
    alumniOf: "Bachelor of Computer Applications, 2025",
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
