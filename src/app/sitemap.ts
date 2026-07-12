import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { businesses } from "@/data/businesses";
import { works } from "@/data/works";
import { newsPosts } from "@/data/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/about",
    "/business",
    "/works",
    "/news",
    "/company",
    "/recruit",
    "/contact",
    "/privacy",
  ];

  const businessPaths = businesses.map((b) => `/business/${b.slug}`);
  const workPaths = works.map((w) => `/works/${w.slug}`);
  const newsPaths = newsPosts.map((n) => `/news/${n.slug}`);

  const all = [...staticPaths, ...businessPaths, ...workPaths, ...newsPaths];

  return all.map((path) => ({
    url: `${siteConfig.baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.6,
  }));
}
