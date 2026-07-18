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
  metadataBase: new URL("https://shrushti-swarnakar.dev"),
  title: {
    default: "Shrushti Swarnakar | Full Stack Developer",
    template: "%s | Shrushti Swarnakar",
  },
  description:
    "Recruiter-focused portfolio for Shrushti Swarnakar, a BCA 2025 graduate and fresher Full Stack Developer building MERN, AI, cloud storage, commerce, and frontend projects.",
  keywords: [
    "Shrushti Swarnakar",
    "Full Stack Developer",
    "Fresher Full Stack Developer",
    "MERN Stack Developer",
    "Frontend Developer",
    "Next.js Developer",
    "BCA Graduate 2025",
  ],
  authors: [{ name: "Shrushti Swarnakar" }],
  creator: "Shrushti Swarnakar",
  openGraph: {
    title: "Shrushti Swarnakar | Full Stack Developer",
    description:
      "BCA 2025 graduate and fresher Full Stack Developer open to full-time software engineering and internship opportunities.",
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
      "Recruiter-focused portfolio for a fresher Full Stack Developer and MERN Stack Developer.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
