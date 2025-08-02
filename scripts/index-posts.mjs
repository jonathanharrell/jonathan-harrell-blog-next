import "dotenv/config";
import path from "path";
import fs from "fs";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import { visit } from "unist-util-visit";
import { compileMDX } from "next-mdx-remote/rsc";
import { algoliasearch } from "algoliasearch";
import { markdownToTxt } from "markdown-to-txt";

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY,
);

const extractImageUrlsFromMdx = async (source) => {
  const imageUrls = [];

  const processor = unified().use(remarkParse).use(remarkMdx);

  const tree = processor.parse(source);
  const ast = await processor.run(tree); // Ensures plugins have a chance to modify the AST

  visit(ast, "image", (node) => {
    if (node.url) {
      imageUrls.push(node.url);
    }
  });

  return imageUrls;
};

const preprocessImagesForPlainText = (md) => {
  const imageRegex = /!\[(.*?)\]\([^\s]+?\s+"<i>(.*?)<\/i>, by (.*?)"\)/g;

  return md.replace(imageRegex, (_, alt, title, author) => {
    return `${alt.trim()}\n*${title.trim()}*, by ${author.trim()}\n`;
  });
};

const getPosts = async () => {
  const directoryPath = path.resolve(".", "content/posts");
  const filePaths = fs.readdirSync(directoryPath);

  const promises = filePaths.map(async (file) => {
    const fullPath = path.resolve(".", "content/posts/", file);

    let fileContents;

    try {
      fileContents = fs.readFileSync(fullPath, "utf8");
    } catch (e) {
      return undefined;
    }

    const imageUrls = await extractImageUrlsFromMdx(fileContents);

    const result = await compileMDX({
      source: fileContents,
      options: { parseFrontmatter: true },
    });

    const fileContentsWithoutFrontmatter = preprocessImagesForPlainText(
      fileContents.replace(/---[\s\S]*?---/, ""),
    );

    return {
      slug: file.replace(/\.mdx$/, ""),
      ...result,
      content: markdownToTxt(fileContentsWithoutFrontmatter),
      imageUrls,
    };
  });

  const results = (await Promise.all(promises)).filter(Boolean);

  return results.map((result) => {
    return {
      objectID: result.slug,
      ...result.frontmatter,
      title: result.frontmatter.date,
      date: new Date(result.frontmatter.date).getTime(),
      content: result.content,
      imageUrls: result.imageUrls.map(
        (url) => `https://blog.jonathanharrell.com${url}`,
      ),
    };
  });
};

const indexPosts = async () => {
  const posts = await getPosts();
  await client.saveObjects({ indexName: "posts_index", objects: posts });
};

indexPosts();
