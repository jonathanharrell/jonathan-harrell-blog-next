import Image from "next/image";
import classNames from "classnames";

interface PhotoProps {
  slug: string;
  width?: number;
  height?: number;
  quality?: number;
  className?: string;
}

export const Photo = ({
  slug,
  width,
  height,
  quality,
  className,
}: PhotoProps) => {
  return (
    <Image
      src={`/assets/photos/${slug}`}
      alt=""
      width={width}
      height={height}
      quality={quality ?? 100}
      className={classNames(
        "max-w-[900px] max-h-[900px] object-contain",
        className,
      )}
    />
  );
};
