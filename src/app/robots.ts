import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  // Keep the site out of search engines until it is launched on the real domain.
  const live = process.env.NEXT_PUBLIC_SITE_LIVE === "true";
  return {
    rules: live ? { userAgent: "*", allow: "/", disallow: ["/login"] } : { userAgent: "*", disallow: "/" },
    sitemap: live ? new URL("/sitemap.xml", site.url).toString() : undefined,
  };
}
