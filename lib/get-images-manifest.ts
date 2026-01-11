import path from "path";
import fs from "fs";

interface Image {
  slug: string;
  width: number;
  height: number;
}

export const getImagesManifest = () => {
  const filePath = path.join(process.cwd(), "public", "images-manifest.json");
  const file = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(file) as Image[];
};
