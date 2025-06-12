import { unified } from "unified";
import { visit } from "unist-util-visit";
import { Image } from "mdast";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";

export const extractImageUrlsFromMdx = async (
  source: string,
): Promise<string[]> => {
  const imageUrls: string[] = [];

  const processor = unified().use(remarkParse).use(remarkMdx);

  const tree = processor.parse(source);
  const ast = await processor.run(tree); // Ensures plugins have a chance to modify the AST

  visit(ast, "image", (node: Image) => {
    if (node.url) {
      imageUrls.push(node.url);
    }
  });

  return imageUrls;
};
