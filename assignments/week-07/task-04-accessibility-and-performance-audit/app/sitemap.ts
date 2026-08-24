import type { MetadataRoute } from "next"
import { siteConfig } from "@/data/site"
import { navigation } from "@/data/navigation"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = navigation.map((item) => ({
    url: `${siteConfig.url}${item.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: item.href === "/" ? 1 : 0.8,
  }))

  return staticPages
}
