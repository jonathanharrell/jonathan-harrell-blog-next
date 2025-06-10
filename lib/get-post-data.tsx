import path from "path";
import fs from "fs";
import { Children, ReactElement } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import Image from "next/image";
import { getImagesManifest } from "@/lib/get-images-manifest";

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

        const imagesManifest = getImagesManifest();
        const matchingIndex = imagesManifest.findIndex(
          (image) => image.slug === src,
        );
        const matchingImage = imagesManifest[matchingIndex];

        return (
          <figure>
            <Image
              src={src}
              alt={alt ?? ""}
              width={matchingImage?.width ?? 635}
              height={matchingImage?.height ?? 476}
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
