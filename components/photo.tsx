import { CSSProperties, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { PhotoMetadata } from "@/lib/get-photo-metadata";

interface PhotoProps {
  slug: string;
  width?: number;
  height?: number;
  metadata?: PhotoMetadata;
  sizes?: string;
  quality?: number;
  className?: string;
  style?: CSSProperties;
  isLoaded?: boolean;
  onLoad?: () => void;
}

export const Photo = ({
  slug,
  width,
  height,
  metadata,
  sizes,
  quality,
  className,
  style,
  isLoaded,
  onLoad,
}: PhotoProps) => {
  const locationData = [
    metadata?.city,
    metadata?.state,
    metadata?.country,
  ].filter(Boolean);

  const cameraData = [
    metadata?.cameraModel,
    metadata?.focalLength,
    metadata?.exposure,
    metadata?.aperture,
    metadata?.iso ? `ISO ${metadata.iso}` : undefined,
  ].filter(Boolean);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Image
        src={`/assets/photos/${slug}`}
        alt=""
        width={width}
        height={height}
        sizes={sizes}
        quality={quality ?? 100}
        className={classNames(
          "object-contain opacity-0 transition-opacity duration-200 ease-in-out",
          {
            "opacity-100": isLoaded || isLoaded === undefined,
          },
          className,
        )}
        style={style}
        onLoad={onLoad}
      />
      {isLoaded && metadata && (
        <div className="wrapper">
          <p className="text-sm text-neutral-400 text-center">
            {locationData.length > 0 && <span>{locationData.join(", ")}</span>}
            {locationData.length > 0 && cameraData.length > 0 && (
              <span className="mx-2">•</span>
            )}
            {cameraData.length > 0 && <span>{cameraData.join(", ")}</span>}
            {/*date*/}
          </p>
        </div>
      )}
    </div>
  );
};
