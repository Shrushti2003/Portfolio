import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shrushti-swarnakar-portfolio.shrushtiswarnakar99.chatgpt.site"),
  title: {
    default: "Shrushti Swarnakar | Full Stack Developer",
    template: "%s | Shrushti Swarnakar",
  },
  description:
    "Digital Architecture in Motion portfolio for Shrushti Swarnakar, a BCA 2025 full-stack developer with MERN projects, AI workflows, 400+ LeetCode problems, and contact at swarnakarshrushti@gmail.com.",
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
    title: "Shrushti Swarnakar | Full Stack Developer",
    description:
      "A premium Digital Architecture in Motion portfolio for a BCA 2025 full-stack developer with MERN, AI, cloud, and frontend projects.",
    type: "website",
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
    title: "Shrushti Swarnakar | Full Stack Developer",
    description:
      "Recruiter-focused portfolio for a Full Stack Developer, MERN Stack Developer, and Frontend Engineer.",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
