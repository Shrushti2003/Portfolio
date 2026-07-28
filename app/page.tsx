import type { Metadata } from "next";
import { Portfolio } from "@/components/sections/Portfolio";
import { siteUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Full Stack Developer Portfolio",
  description:
    "Selected MERN, AI, cloud, commerce and frontend projects by Shrushti Swarnakar, a 2025 BCA graduate open to software engineering roles.",
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shrushti Swarnakar",
    email: "swarnakarshrushti@gmail.com",
    jobTitle: ["Full stack developer", "MERN Stack Developer", "Frontend developer"],
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
    url: siteUrl,
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
