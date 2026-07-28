import type { Metadata } from "next";
import { siteDescription, siteTitle, siteUrl } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Shrushti Swarnakar",
  },
  description: siteDescription,
  alternates: {
    canonical: siteUrl,
  },
  keywords: [
    "Shrushti Swarnakar",
    "Full Stack Developer",
    "Fresher Full Stack Developer",
    "MERN Stack Developer",
    "Frontend Developer",
    "Frontend Engineer",
    "LeetCode 400 problems",
    "Next.js Developer",
    "BCA Graduate 2025",
  ],
  authors: [{ name: "Shrushti Swarnakar" }],
  creator: "Shrushti Swarnakar",
  other: {
    email: "swarnakarshrushti@gmail.com",
  },
  openGraph: {
    title: siteTitle,
    description:
      "Portfolio for a BCA 2025 graduate with MERN, frontend, cloud and full stack projects.",
    type: "website",
    url: siteUrl,
    siteName: "Shrushti Swarnakar Portfolio",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Shrushti Swarnakar portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description:
      "Portfolio for Shrushti Swarnakar, a full stack developer focused on MERN and frontend work.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="/favicon.svg" rel="icon" />
        <link href="/favicon.svg" rel="shortcut icon" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
