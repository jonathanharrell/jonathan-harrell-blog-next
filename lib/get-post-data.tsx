import path from "path";
import fs from "fs";
import { Children, ReactElement } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import Image from "next/image";

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
            if ((children as ReactElement)?.props.src) {
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
      img: async ({ src, alt, title }) => {
        if (!src) {
          return null;
        }

        return (
          <figure>
            <Image
              src={src}
              alt={alt ?? ""}
              width={635}
              height={476}
              sizes="100vw"
              className="w-full h-auto"
            />
            {title && (
              <figcaption dangerouslySetInnerHTML={{ __html: title }} />
            )}
          </figure>
        );
      },
    },
  });
};
