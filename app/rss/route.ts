import { Feed } from "feed";
import { SITE_URL } from "@/constants";
import path from "path";
import fs from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import { getPostSlugs } from "@/lib/get-post-slugs";
import { convertPostDataForRss } from "@/lib/convert-post-data-for-rss";

const currentYear = new Date().getFullYear();

const feed = new Feed({
  title: "Human in the Loop RSS Feed",
  description: "Jonathan Harrell’s commonplace book",
  id: SITE_URL,
  link: `${SITE_URL}index.xml`,
  language: "en",
  copyright: `${currentYear}, by Jonathan Harrell`,
});

export async function GET() {
  const ReactDOMServer = (await import("react-dom/server")).default;

  const { slugs } = await getPostSlugs({ perPage: Infinity });

  const postPromises = slugs.map(async (item) => {
    const postData = await convertPostDataForRss(item.slug);

    return {
      ...postData,
      slug: item.slug,
    };
  });

  const posts = await Promise.all(postPromises);

  posts.forEach((post) => {
    feed.addItem({
      title: `${post.frontmatter.title ?? ""}`,
      link: `${SITE_URL}blog/${post.slug}`,
      description: `${post.frontmatter.description ?? ""}`,
      date: new Date(post.frontmatter.date as string),
      content: ReactDOMServer.renderToStaticMarkup(post.content),
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
