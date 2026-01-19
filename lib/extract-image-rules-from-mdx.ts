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

  // Extract from MDX JSX elements (e.g., <img src="...">)
  const extractFromJsxElement = (node: {
    name?: string;
    attributes?: Array<{
      type: string;
      name: string;
      value?: string | { type?: string; value?: string };
    }>;
  }) => {
    if (node.name === "img" && node.attributes) {
      for (const attr of node.attributes) {
        if (attr.type === "mdxJsxAttribute" && attr.name === "src") {
          if (attr.value && typeof attr.value === "string") {
            imageUrls.push(attr.value);
          } else if (
            attr.value &&
            typeof attr.value === "object" &&
            "value" in attr.value &&
            typeof attr.value.value === "string"
          ) {
            imageUrls.push(attr.value.value);
          }
        }
      }
    }
  };

  visit(ast, "mdxJsxFlowElement", extractFromJsxElement);
  visit(ast, "mdxJsxTextElement", extractFromJsxElement);

  return imageUrls;
};
