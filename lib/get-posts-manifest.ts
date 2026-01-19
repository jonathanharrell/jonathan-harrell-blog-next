import path from "path";
import fs from "fs";
import { Frontmatter } from "@/types";

interface Post {
  slug: string;
  frontmatter: Frontmatter;
  lastModified: Date;
}

export const getPostsManifest = () => {
  const filePath = path.join(process.cwd(), "public", "posts-manifest.json");
  const file = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(file) as Post[];
};
