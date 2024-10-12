import Image from "next/image";
import classNames from "classnames";

interface PhotoProps {
  slug: string;
  width?: number;
  height?: number;
  sizes?: string;
  quality?: number;
  className?: string;
  onLoad?: () => void;
}

export const Photo = ({
  slug,
  width,
  height,
  sizes,
  quality,
  className,
  onLoad,
}: PhotoProps) => {
  return (
    <>
      <Image
        src={`/assets/photos/${slug}`}
        alt=""
        width={width}
        height={height}
        sizes={sizes}
        quality={quality ?? 100}
        className={classNames("object-contain", className)}
        onLoad={onLoad}
      />
    </>
  );
};
