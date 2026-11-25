import type { MetadataRoute } from "next";
import { mainNav, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...mainNav.map((n) => n.href), "/book"];
  return paths.map((p) => ({
    url: new URL(p, site.url).toString(),
    changeFrequency: "weekly",
    priority: p === "/" ? 1 : 0.7,
  }));
}
