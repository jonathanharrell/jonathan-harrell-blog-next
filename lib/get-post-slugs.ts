import { getPostsManifest } from "@/lib/get-posts-manifest";
import { DEFAULT_POSTS_PER_PAGE } from "@/constants";

export const getPostSlugs = async ({
  tag,
  month,
  page = 0,
  perPage = DEFAULT_POSTS_PER_PAGE,
}: { tag?: string; month?: string; page?: number; perPage?: number } = {}) => {
  const postsManifest = getPostsManifest();

  const filteredPosts = postsManifest.filter((post) => {
    if (tag) {
      const tags = tag.split(",");
      const positiveTags = tags.filter((t) => !t.startsWith("!"));
      const negativeTags = tags
        .filter((t) => t.startsWith("!"))
        .map((t) => t.replace("!", ""));

      return (
        positiveTags.every((t) => post.frontmatter.tags?.includes(t)) &&
        negativeTags.every((t) => !post.frontmatter.tags?.includes(t))
      );
    }

    if (month) {
      const monthDate = new Date(month);
      const monthFromDate = monthDate.getMonth();
      const yearFromDate = monthDate.getFullYear();

      const postDate = new Date(post.frontmatter.date as string);
      const postMonth = postDate.getMonth();
      const postYear = postDate.getFullYear();

      return monthFromDate === postMonth && yearFromDate === postYear;
    }

    return true;
  });

  const sortedPosts = filteredPosts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date as string);
    const dateB = new Date(b.frontmatter.date as string);

    return dateB.getTime() - dateA.getTime();
  });

  const skip = page ? page * perPage : 0;
  const slugs = sortedPosts.slice(skip, skip + perPage);
  const pagination = {
    currentPage: page || 0,
    totalPages: Math.ceil(sortedPosts.length / perPage),
  };

  const tags = postsManifest
    .map((post) => post.frontmatter.tags)
    .filter(Boolean);
  const dates = postsManifest.map((post) => post.frontmatter.date as string);
  const months = dates.map((date) =>
    new Date(date).toLocaleDateString("default", {
      month: "long",
      year: "numeric",
    }),
  );

  return {
    slugs,
    pagination,
    tags: Array.from(new Set(tags.flat())).sort(),
    months: Array.from(new Set(months)).reverse(),
  };
};
