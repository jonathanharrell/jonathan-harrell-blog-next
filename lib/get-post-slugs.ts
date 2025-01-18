import path from "path";
import fs from "fs";
import { readSync } from "to-vfile";
import { matter } from "vfile-matter";
import { DEFAULT_POSTS_PER_PAGE } from "@/constants";
import { Frontmatter } from "@/types";

export const getPostSlugs = async ({
  tag,
  month,
  page = 0,
  perPage = DEFAULT_POSTS_PER_PAGE,
}: { tag?: string; month?: string; page?: number; perPage?: number } = {}) => {
  const directoryPath = path.resolve(".", "content/posts");
  const filePaths = fs.readdirSync(directoryPath);

  const slugsWithFrontmatter = filePaths.map((file) => {
    const fullPath = path.resolve(".", "content/posts/", file);
    const fileContents = readSync(fullPath);
    const stat = fs.statSync(fullPath);
    matter(fileContents);

    return {
      slug: file.replace(".mdx", ""),
      lastModified: stat.mtime,
      frontmatter: fileContents.data.matter as Frontmatter,
    };
  });

  const filteredPostSlugsWithFrontmatter = slugsWithFrontmatter.filter(
    (slugWithFrontmatter) => {
      if (tag) {
        const tags = tag.split(",");
        const positiveTags = tags.filter((t) => !t.startsWith("!"));
        const negativeTags = tags
          .filter((t) => t.startsWith("!"))
          .map((t) => t.replace("!", ""));

        return (
          positiveTags.every((t) =>
            slugWithFrontmatter.frontmatter.tags?.includes(t),
          ) &&
          negativeTags.every(
            (t) => !slugWithFrontmatter.frontmatter.tags?.includes(t),
          )
        );
      }

      if (month) {
        const monthDate = new Date(month);
        const monthFromDate = monthDate.getMonth();
        const yearFromDate = monthDate.getFullYear();

        const postDate = new Date(
          slugWithFrontmatter.frontmatter.date as string,
        );
        const postMonth = postDate.getMonth();
        const postYear = postDate.getFullYear();

        return monthFromDate === postMonth && yearFromDate === postYear;
      }

      return true;
    },
  );

  const sortedSlugsWithFrontmatter = filteredPostSlugsWithFrontmatter.sort(
    (a, b) => {
      const dateA = new Date(a.frontmatter.date as string);
      const dateB = new Date(b.frontmatter.date as string);

      return dateB.getTime() - dateA.getTime();
    },
  );

  const skip = page ? page * perPage : 0;
  const slugs = sortedSlugsWithFrontmatter.slice(skip, skip + perPage);
  const pagination = {
    currentPage: page || 0,
    totalPages: Math.ceil(sortedSlugsWithFrontmatter.length / perPage),
  };

  const tags = slugsWithFrontmatter
    .map((slugWithFrontmatter) => slugWithFrontmatter.frontmatter.tags)
    .filter(Boolean);
  const dates = slugsWithFrontmatter.map(
    (slugWithFrontmatter) => slugWithFrontmatter.frontmatter.date as string,
  );
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
