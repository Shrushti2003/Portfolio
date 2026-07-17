import type { Metadata } from "next";
import { Portfolio } from "@/components/portfolio";

export const metadata: Metadata = {
  title: "Full Stack Developer and AI Application Developer",
  description:
    "Explore Shrushti Swarnakar's AI platforms, full-stack projects, achievements, experience timeline, and technical toolkit.",
};

export default function Home() {
  return <Portfolio />;
}
