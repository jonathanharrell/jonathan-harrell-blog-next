import { CSSProperties } from "react";
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
  onLoad,
}: PhotoProps) => {
  return (
    <div>
      <Image
        src={`/assets/photos/${slug}`}
        alt=""
        width={width}
        height={height}
        sizes={sizes}
        quality={quality ?? 100}
        className={classNames("object-contain", className)}
        style={style}
        onLoad={onLoad}
      />
      {metadata && (
        <p className="text-neutral-100 text-center">
          <span>
            {metadata.city}, {metadata.state}, {metadata.country}
          </span>
          <span>{metadata.focalLength}</span>
          <span>{metadata.exposure}</span>
          <span>{metadata.aperture}</span>
          <span>{metadata.iso}</span>
          <span>{metadata.cameraModel}</span>
        </p>
      )}
    </div>
  );
};
