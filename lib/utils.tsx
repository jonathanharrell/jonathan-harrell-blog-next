import path from "path";
import fs from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import { DEFAULT_POSTS_PER_PAGE } from "@/constants";
import { Children, ReactNode } from "react";
import markdownToTxt from "markdown-to-txt";
import { truncate } from "lodash";
import sharp from "sharp";

export interface Frontmatter {
  date: string;
  tags: string[];
}

export const getPostData = async (slug: string) => {
  const fullPath = path.resolve(".", "content/posts/", `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  return await compileMDX<{ title: string; date: string; tags: string[] }>({
    source: fileContents,
    options: { parseFrontmatter: true },
    components: {
      p: ({ children, ...props }) => {
        try {
          if (Children.only(children)) {
            // @ts-ignore
            if (children?.props.src) {
              return <div {...props}>{children}</div>;
            }
          }
        } catch (e) {
          return <p {...props}>{children}</p>;
        }

        return <p {...props}>{children}</p>;
      },
      a: ({ children, ...props }) => {
        return (
          <a {...props} target="_blank" rel="noreferrer">
            {children}
          </a>
        );
      },
      img: ({ src, alt, title }) => {
        return (
          <figure>
            <img src={src} alt={alt} />
            {title && (
              <figcaption dangerouslySetInnerHTML={{ __html: title }} />
            )}
          </figure>
        );
      },
    },
  });
};

export const getPostTeasers = async ({
  tag,
  perPage = Infinity,
}: { tag?: string; perPage?: number } = {}) => {
  const directoryPath = path.resolve(".", "content/posts");
  const files = fs.readdirSync(directoryPath);

  const postTeaserPromises = files.map(async (file) => {
    const fullPath = path.resolve(".", "content/posts/", file);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const parsedContents = await compileMDX<Frontmatter>({
      source: fileContents,
      options: { parseFrontmatter: true },
    });

    const fileContentsWithoutFrontmatter = fileContents.replace(
      /---[\s\S]*?---/,
      "",
    );

    let images: string[] = [];

    const regex = /!\[\]\(([^)\s]+)(?:\s+["'].*["'])?\)/g;
    const matches = fileContentsWithoutFrontmatter.match(regex);

    if (matches) {
      images = matches
        .map((match) => match.match(/!\[\]\(([^)\s]+)/)?.[1])
        .filter(Boolean) as string[];
    }

    return {
      slug: file.replace(/\.mdx$/, ""),
      frontmatter: parsedContents.frontmatter,
      text: truncate(
        markdownToTxt(fileContentsWithoutFrontmatter).replaceAll("\n", " "),
        {
          length: 130,
        },
      ),
      images,
    };
  });

  const postTeasers = await Promise.all(postTeaserPromises);

  const sortedPostTeasers = postTeasers.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date as string);
    const dateB = new Date(b.frontmatter.date as string);

    return dateB.getTime() - dateA.getTime();
  });

  const filteredPostTeasers = sortedPostTeasers.filter((postTeaser) => {
    if (tag) {
      const tags = tag.split(",");
      const positiveTags = tags.filter((t) => !t.startsWith("!"));
      const negativeTags = tags
        .filter((t) => t.startsWith("!"))
        .map((t) => t.replace("!", ""));
      return (
        positiveTags.every((t) => postTeaser.frontmatter.tags.includes(t)) &&
        negativeTags.every((t) => !postTeaser.frontmatter.tags.includes(t))
      );
    }

    return true;
  });

  return filteredPostTeasers.slice(0, perPage);
};

export const getPostSlugs = async ({
  tag,
  month,
  page = 0,
  perPage = DEFAULT_POSTS_PER_PAGE,
}: { tag?: string; month?: string; page?: number; perPage?: number } = {}) => {
  const directoryPath = path.resolve(".", "content/posts");
  const files = fs.readdirSync(directoryPath);
  const postSlugs = files.map((file) => file.replace(/\.mdx$/, ""));

  const slugsWithFrontmatterPromises = postSlugs.map(async (slug) => {
    const fullPath = path.resolve(".", "content/posts/", `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const parsedContents = await compileMDX<Frontmatter>({
      source: fileContents,
      options: { parseFrontmatter: true },
    });

    return { slug, frontmatter: parsedContents.frontmatter };
  });

  const slugsWithFrontmatter = await Promise.all(slugsWithFrontmatterPromises);

  const sortedSlugsWithFrontmatter = slugsWithFrontmatter.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date as string);
    const dateB = new Date(b.frontmatter.date as string);

    return dateB.getTime() - dateA.getTime();
  });

  const filteredPostSlugs = sortedSlugsWithFrontmatter
    .filter((slugWithFrontmatter) => {
      if (tag) {
        const tags = tag.split(",");
        const positiveTags = tags.filter((t) => !t.startsWith("!"));
        const negativeTags = tags
          .filter((t) => t.startsWith("!"))
          .map((t) => t.replace("!", ""));
        return (
          positiveTags.every((t) =>
            slugWithFrontmatter.frontmatter.tags.includes(t),
          ) &&
          negativeTags.every(
            (t) => !slugWithFrontmatter.frontmatter.tags.includes(t),
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
    })
    .map((slugWithFrontmatter) => slugWithFrontmatter.slug);

  const skip = page ? page * perPage : 0;
  const slugs = filteredPostSlugs.slice(skip, skip + perPage);
  const pagination = {
    currentPage: page || 0,
    totalPages: Math.ceil(filteredPostSlugs.length / perPage),
  };

  return {
    slugs,
    pagination,
  };
};

export const getPostTags = async () => {
  const directoryPath = path.resolve(".", "content/posts");
  const files = fs.readdirSync(directoryPath);

  const monthPromises = files.reverse().map(async (file) => {
    const fullPath = path.resolve(".", "content/posts/", file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const parsedContents = await compileMDX({
      source: fileContents,
      options: { parseFrontmatter: true },
    });

    return parsedContents.frontmatter.tags;
  }) as Promise<string[]>[];

  const tags = await Promise.all(monthPromises);

  return { tags: Array.from(new Set(tags.flat())).sort() };
};

export const getPostMonths = async () => {
  const directoryPath = path.resolve(".", "content/posts");
  const files = fs.readdirSync(directoryPath);

  const monthPromises = files.reverse().map(async (file) => {
    const fullPath = path.resolve(".", "content/posts/", file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const parsedContents = await compileMDX({
      source: fileContents,
      options: { parseFrontmatter: true },
    });
    const date = parsedContents.frontmatter.date as string;
    return new Date(date).toLocaleDateString("default", {
      month: "long",
      year: "numeric",
    });
  });

  const months = await Promise.all(monthPromises);

  return { months: Array.from(new Set(months)) };
};

export const getAllPhotoSlugs = async () => {
  const directoryPath = path.resolve(".", "public/assets/photos");
  const files = fs.readdirSync(directoryPath);
  return files.filter((file) => file.endsWith(".jpg")).reverse();
};

export const getPhotoSize = async (
  slug: string,
): Promise<{ width?: number; height?: number }> => {
  const fullPath = path.resolve(".", "public/assets/photos", slug);

  try {
    const metadata = await sharp(fullPath).metadata();
    return {
      width: metadata.width,
      height: metadata.height,
    };
  } catch (error) {
    return {};
  }
};
