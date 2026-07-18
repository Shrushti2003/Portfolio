import type { Metadata } from "next";
import { Portfolio } from "@/components/portfolio";

export const metadata: Metadata = {
  title: "Full Stack Developer, MERN Stack Developer, and Frontend Engineer",
  description:
    "Explore Shrushti Swarnakar's ARES AI, Strategy Hub, CloudNest Drive, Zylora, and BookNest case studies, plus education, certifications, skills, services, and technical toolkit.",
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shrushti Swarnakar",
    jobTitle: ["Full Stack Developer", "MERN Stack Developer", "Frontend Engineer"],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "AI Applications",
      "Frontend Engineering",
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
