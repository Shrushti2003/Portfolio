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
    default: "Shrushti Swarnakar | Full Stack MERN Developer",
    template: "%s | Shrushti Swarnakar",
  },
  description:
    "Premium portfolio for Shrushti Swarnakar, a Full Stack MERN Developer and AI Application Developer building AI platforms, MERN products, dashboards, cloud storage, maps, and commerce experiences.",
  keywords: [
    "Shrushti Swarnakar",
    "Full Stack Developer",
    "MERN Stack Developer",
    "AI Application Developer",
    "Next.js Developer",
    "Gen AI Platform",
  ],
  authors: [{ name: "Shrushti Swarnakar" }],
  creator: "Shrushti Swarnakar",
  openGraph: {
    title: "Shrushti Swarnakar | Full Stack MERN Developer",
    description:
      "Full Stack MERN Developer and AI Application Developer crafting production-minded AI products, dashboards, APIs, and web platforms.",
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
    title: "Shrushti Swarnakar | Full Stack MERN Developer",
    description:
      "Premium portfolio for a Full Stack MERN Developer and AI Application Developer.",
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
