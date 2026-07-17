import type { Metadata } from "next";
import { Portfolio } from "@/components/portfolio";

export const metadata: Metadata = {
  title: "Full Stack MERN Developer and AI Application Developer",
  description:
    "Explore Shrushti Swarnakar's AI platforms, MERN projects, case studies, education, certifications, skills, services, and technical toolkit.",
};

export default function Home() {
  return <Portfolio />;
}
