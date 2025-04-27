import path from "path";
import fs from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import { SITE_URL } from "@/constants";

const siteUrlWithoutTrailingSlash = SITE_URL.substring(0, SITE_URL.length - 1);

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
          ? `${siteUrlWithoutTrailingSlash}${href}`
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
            <img src={`${siteUrlWithoutTrailingSlash}${src}`} alt={alt} />
            {title && <figcaption>{title}</figcaption>}
          </figure>
        );
      },
    },
  });
};
