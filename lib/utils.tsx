import path from "path";
import fs from "fs";
import {compileMDX} from "next-mdx-remote/rsc";
import {POSTS_PER_PAGE} from "@/constants";
import {Children, ReactNode} from "react";

export const getPostData = async(slug: string) => {
  const fullPath = path.resolve(".", "content/posts/", `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  return await compileMDX<{ title: string; date: string; tags: string[] }>({
    source: fileContents,
    options: { parseFrontmatter: true },
    components: {
      p: ({ children, ...props }) => {
        try {
          if (Children.only(children)) {
            if (children.props.src) {
              return <div {...props}>{children}</div>;
            }
          }
        } catch (e) {
          return <p {...props}>{children}</p>;
        }

        return <p {...props}>{children}</p>;
      },
      img: ({ src, alt, title }) => {
        return (
          <figure>
            <img src={src} alt={alt} />
            {title && <figcaption dangerouslySetInnerHTML={{ __html: title}} />}
          </figure>
        )
      },
    }
  });
}

export const getPostSlugs = async({ tag, month, page = 0 }: { tag?: string; month?: string; page?: number } = {}) => {
  const directoryPath = path.resolve(".", "content/posts");
  const files = fs.readdirSync(directoryPath);
  const descendingPostSlugs = files.reverse().map((file) => file.replace(/\.mdx$/, ""));

  const slugsWithFrontmatterPromises = descendingPostSlugs.map(async (slug) => {
    const fullPath = path.resolve(".", "content/posts/", `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const parsedContents = await compileMDX({
      source: fileContents,
      options: { parseFrontmatter: true },
    });

    return { slug, frontmatter: parsedContents.frontmatter };
  });

  const slugsWithFrontmatter = await Promise.all(slugsWithFrontmatterPromises);

  const filteredPostSlugs = slugsWithFrontmatter.filter(slugWithFrontmatter => {
    if (tag) {
      return slugWithFrontmatter.frontmatter.tags.includes(tag);
    }

    if (month) {
      const monthDate = new Date(month);
      const monthFromDate = monthDate.getMonth();
      const yearFromDate = monthDate.getFullYear();

      const postDate = new Date(slugWithFrontmatter.frontmatter.date as string);
      const postMonth = postDate.getMonth();
      const postYear = postDate.getFullYear();

      return monthFromDate === postMonth && yearFromDate === postYear;
    }

    return true;
  }).map(slugWithFrontmatter => slugWithFrontmatter.slug);

  const skip = page ? page * POSTS_PER_PAGE : 0;
  const slugs = filteredPostSlugs.slice(skip, skip + POSTS_PER_PAGE);
  const pagination = {
    currentPage: page || 0,
    totalPages: Math.ceil(filteredPostSlugs.length / POSTS_PER_PAGE),
  }

  return {
    slugs,
    pagination,
  }
}

export const getPostTags = async() => {
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
  });

  const tags = await Promise.all(monthPromises);

  return { tags: Array.from(new Set(tags.flat())).sort() };
}

export const getPostMonths = async() => {
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
    return new Date(date).toLocaleDateString("default", { month: "long", year: "numeric" });
  });

  const months = await Promise.all(monthPromises);

  return { months: Array.from(new Set(months)) };
}

export const getAllPhotoSlugs = async() => {
  const directoryPath = path.resolve(".", "public/assets/photos");
  const files = fs.readdirSync(directoryPath);
  return files.reverse();
}
