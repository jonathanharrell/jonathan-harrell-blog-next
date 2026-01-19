import path from "path";
import fs from "fs";
import { PhotoMetadata } from "@/types";

interface Photo {
  slug: string;
  lastModified: string;
  metadata: PhotoMetadata;
}

export const getPhotosManifest = () => {
  const filePath = path.join(process.cwd(), "public", "photos-manifest.json");
  const file = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(file) as Photo[];
};
