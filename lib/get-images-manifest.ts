import path from "path";
import fs from "fs";
import { PhotoMetadata } from "@/types";

interface Image {
  slug: string;
  lastModified: string;
  metadata: PhotoMetadata;
}

export const getImagesManifest = () => {
  const filePath = path.join(process.cwd(), "public", "images-manifest.json");
  const file = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(file) as Image[];
};
