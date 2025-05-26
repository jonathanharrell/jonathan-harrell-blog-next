import { getPostSlugs } from "@/lib/get-post-slugs";

export const getPreviousAndNextPosts = async (slug: string) => {
  const { slugs } = await getPostSlugs({ perPage: Infinity });

  const matchingIndex = slugs.findIndex((post) => post.slug === slug);
  const previous = slugs[matchingIndex + 1];
  const next = slugs[matchingIndex - 1];

  return {
    previous,
    next,
  };
};
