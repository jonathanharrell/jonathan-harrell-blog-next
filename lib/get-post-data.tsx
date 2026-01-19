import path from "path";
import fs from "fs";
import { Children, ReactElement } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Image from "next/image";
import { extractImageUrlsFromMdx } from "@/lib/extract-image-rules-from-mdx";
import { getImagesManifest } from "@/lib/get-images-manifest";

export const getPostData = async (slug: string) => {
  const fullPath = path.resolve(".", "content/posts/", `${slug}.mdx`);
  let fileContents;

  try {
    fileContents = fs.readFileSync(fullPath, "utf8");
  } catch (e) {
    notFound();
  }

  const imageUrls = await extractImageUrlsFromMdx(fileContents);

  const result = await compileMDX<{
    title: string;
    date: string;
    tags: string[];
  }>({
    source: fileContents,
    options: { parseFrontmatter: true },
    components: {
      p: ({ children, ...props }) => {
        try {
          if (Children.only(children)) {
            if ((children as ReactElement<any>)?.props.src) {
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

  return {
    ...result,
    imageUrls,
  };
};
