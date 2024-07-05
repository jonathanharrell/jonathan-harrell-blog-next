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
            {title && <figcaption>{title}</figcaption>}
          </figure>
        )
      },
    }
  });
}

export const getPostSlugs = async(page?: number) => {
  const directoryPath = path.resolve(".", "content/posts");
  const files = fs.readdirSync(directoryPath);
  const descendingPostSlugs = files.reverse().map((file) => file.replace(/\.mdx$/, ""));

  const skip = page ? page * POSTS_PER_PAGE : 0;
  const slugs = page !== undefined ? descendingPostSlugs.slice(skip, skip + POSTS_PER_PAGE) : descendingPostSlugs;
  const pagination = {
    currentPage: page || 0,
    totalPages: Math.ceil(files.length / POSTS_PER_PAGE),
  }

  return {
    slugs,
    pagination,
  }
}

export const getAllPhotoSlugs = async() => {
  const directoryPath = path.resolve(".", "public/assets/photos");
  const files = fs.readdirSync(directoryPath);
  return files.reverse();
}
