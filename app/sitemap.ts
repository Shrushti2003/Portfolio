import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://shrushti-swarnakar-portfolio.shrushtiswarnakar99.chatgpt.site";

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-07-18"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
