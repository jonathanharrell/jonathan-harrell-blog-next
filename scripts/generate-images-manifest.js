const path = require("path");
const fs = require("fs");
const ExifReader = require("exifreader");

const getPhotoMetadata = async (slug) => {
  const imagePath = path.resolve(".", "public/assets/photos", slug);

  let metadata;

  try {
    metadata = await ExifReader.load(imagePath);
  } catch (error) {
    console.error(error);
  }

  return metadata
    ? {
        city: metadata.City?.description,
        state: metadata.State?.description,
        country: metadata.Country?.description,
        focalLength: metadata.FocalLengthIn35mmFilm?.description,
        exposure: metadata.ExposureTime?.description,
        aperture:
          metadata.FNumber?.description || metadata.ApertureValue?.description,
        iso: metadata.ISOSpeedRatings?.description,
        cameraModel: metadata.Model?.description,
        date: metadata.CreateDate?.value,
      }
    : undefined;
};

const getAllPhotoSlugs = async () => {
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

const generateManifest = async () => {
  const photos = await getAllPhotoSlugs();
  const promises = photos.map(async (photo) => {
    const metadata = await getPhotoMetadata(photo.slug);

    return {
      ...photo,
      metadata,
    };
  });

  const data = await Promise.all(promises);
  const json = JSON.stringify(data, null, 2);
  fs.writeFileSync("public/images-manifest.json", json, "utf-8");
};

generateManifest();
