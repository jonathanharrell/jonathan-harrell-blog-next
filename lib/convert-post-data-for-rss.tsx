import path from "path";
import fs from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import { SITE_URL } from "@/constants";

export const convertPostDataForRss = async (slug: string) => {
  const fullPath = path.resolve(".", "content/posts/", `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  return await compileMDX({
    source: fileContents,
    options: {
      parseFrontmatter: true,
    },
    components: {
      a: ({ children, href, ...props }) => {
        const augmentedHref = href?.startsWith("/")
          ? `${SITE_URL}${href}`
          : href;

        return (
          <a {...props} href={augmentedHref} target="_blank" rel="noreferrer">
            {children}
          </a>
        );
      },
      img: ({ src, alt, title }) => {
        return (
          <figure>
            <img src={`${SITE_URL}${src}`} alt={alt} />
            {title && <figcaption>{title}</figcaption>}
          </figure>
        );
      },
    },
  });
};
