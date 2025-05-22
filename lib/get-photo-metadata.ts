import path from "path";
import ExifReader from "exifreader";
import * as Sentry from "@sentry/nextjs";

export interface PhotoMetadata {
  city?: string;
  state?: string;
  country?: string;
  focalLength?: string;
  exposure?: string;
  aperture?: string;
  iso?: string;
  cameraModel?: string;
}

export const getPhotoMetadata = async (
  slug: string,
): Promise<PhotoMetadata | undefined> => {
  const imagePath = path.resolve(".", "public/assets/photos", slug);

  let metadata;

  try {
    metadata = await ExifReader.load(imagePath);
  } catch (error) {
    Sentry.captureException(error);
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
      }
    : undefined;
};
