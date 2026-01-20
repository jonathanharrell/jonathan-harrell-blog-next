import path from "path";
import fs from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import markdownToTxt from "markdown-to-txt";
import { truncate } from "lodash";
import { Frontmatter } from "@/types";

const preprocessImagesForPlainText = (md: string) => {
  const imageRegex = /!\[(.*?)\]\([^\s]+?\s+"<i>(.*?)<\/i>, by (.*?)"\)/g;

  return md.replace(imageRegex, (_, alt, title, author) => {
    return `${alt.trim()}\n*${title.trim()}*, by ${author.trim()}\n`;
  });
};

const preprocessHtmlForPlainText = (md: string) => {
  // Match <figure> blocks that contain <img> and <figcaption>
  const figureRegex =
    /<figure>[\s\S]*?<img[\s\S]*?alt=["']([^"']*)["'][\s\S]*?(?:\/>|>)[\s\S]*?<figcaption>([\s\S]*?)<\/figcaption>[\s\S]*?<\/figure>/g;

  return md.replace(figureRegex, (match, alt, figcaptionContent) => {
    // Extract title from <i> tags and author after "by"
    const figcaptionMatch = figcaptionContent.match(
      /<i>(.*?)<\/i>[\s\S]*?by\s+(.*)/,
    );
    if (figcaptionMatch) {
      const title = figcaptionMatch[1].trim();
      const author = figcaptionMatch[2].replace(/<[^>]*>/g, "").trim();
      return `${alt.trim()}\n*${title.trim()}*, by ${author.trim()}\n`;
    }
    // Fallback: if format doesn't match, just strip HTML tags from figcaption
    const plainText = figcaptionContent.replace(/<[^>]*>/g, "").trim();
    return `${alt.trim()}\n${plainText}\n`;
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

    const fileContentsWithoutFrontmatter = preprocessHtmlForPlainText(
      preprocessImagesForPlainText(fileContents.replace(/---[\s\S]*?---/, "")),
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
        positiveTags.every((t) => postTeaser.frontmatter.tags?.includes(t)) &&
        negativeTags.every((t) => !postTeaser.frontmatter.tags?.includes(t))
      );
    }

    return true;
  });

  return filteredPostTeasers.slice(0, perPage);
};
