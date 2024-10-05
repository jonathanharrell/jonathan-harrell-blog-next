import Image from "next/image";
import classNames from "classnames";

interface PhotoProps {
  slug: string;
  width?: number;
  height?: number;
  className?: string;
}

export const Photo = ({ slug, width, height, className }: PhotoProps) => {
  return (
    <Image
      src={`/assets/photos/${slug}`}
      alt=""
      width={width}
      height={height}
      quality={100}
      className={classNames(
        "max-w-[900px] max-h-[900px] object-contain",
        className,
      )}
    />
  );
};
