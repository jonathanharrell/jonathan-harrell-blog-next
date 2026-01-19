const path = require("path");
const fs = require("fs");
const probe = require("probe-image-size");

const getAllImageSlugs = async () => {
  const photosDirectoryPath = path.resolve(".", "public/assets/photos");
  const artDirectoryPath = path.resolve(".", "public/assets/art");
  const photoFiles = fs.readdirSync(photosDirectoryPath);
  const artFiles = fs.readdirSync(artDirectoryPath);

  const photoPromises = photoFiles
    .filter((file) => file.endsWith(".jpg"))
    .reverse()
    .map(async (file) => {
      const filePath = path.resolve(".", "public/assets/photos", file);

      const image = fs.createReadStream(filePath);
      const { width, height } = await probe(image);

      return {
        slug: `/assets/photos/${file}`,
        width,
        height,
      };
    });

  const photos = await Promise.all(photoPromises);

  const artPromises = artFiles
    .filter((file) => file.endsWith(".jpg"))
    .reverse()
    .map(async (file) => {
      const filePath = path.resolve(".", "public/assets/art", file);

      const image = fs.createReadStream(filePath);
      const { width, height } = await probe(image);

      return {
        slug: `/assets/art/${file}`,
        width,
        height,
      };
    });

  const art = await Promise.all(artPromises);

  return [...photos, ...art];
};

const generateManifest = async () => {
  const data = await getAllImageSlugs();
  const json = JSON.stringify(data, null, 2);
  
  // Ensure data directory exists
  const dataDir = path.resolve(".", "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(dataDir, "images-manifest.json"), json, "utf-8");
};

generateManifest();
