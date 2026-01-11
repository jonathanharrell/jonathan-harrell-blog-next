import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants";
import { getPostSlugs } from "@/lib/get-post-slugs";
import { getPhotosManifest } from "@/lib/get-photos-manifest";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { slugs: postSlugs = [] } = await getPostSlugs({ perPage: Infinity });
  const photosManifest = getPhotosManifest();

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...postSlugs.map(({ slug, lastModified }) => ({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified,
      changeFrequency:
        "never" as MetadataRoute.Sitemap[number]["changeFrequency"],
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/photos`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...photosManifest.map(({ slug, lastModified }) => ({
      url: `${SITE_URL}/photo/${slug}`,
      lastModified,
      changeFrequency:
        "never" as MetadataRoute.Sitemap[number]["changeFrequency"],
      priority: 0.5,
    })),
    {
      url: `${SITE_URL}/archive`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
