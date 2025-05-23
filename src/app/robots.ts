import { MetadataRoute } from "next";

/**
 * Tạo robots.txt tự động cho website
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"],
    },
    sitemap: "https://agronexuscapital.com/sitemap.xml",
    host: "https://agronexuscapital.com",
  };
} 