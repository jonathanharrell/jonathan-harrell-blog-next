import path from "path";
import fs from "fs";

export const getAllPhotoSlugs = async () => {
  const directoryPath = path.resolve(".", "public/assets/photos");
  const files = fs.readdirSync(directoryPath);

  return files
    .filter((file) => file.endsWith(".jpg"))
    .reverse()
    .map((file) => {
      const filePath = path.resolve(".", "public/assets/photos", file);
      const stat = fs.statSync(filePath);

      return {
        slug: file,
        lastModified: stat.mtime,
      };
    });
};
