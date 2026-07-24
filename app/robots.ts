import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://shrushti-swarnakar-portfolio.shrushtiswarnakar99.chatgpt.site/sitemap.xml",
  };
}
