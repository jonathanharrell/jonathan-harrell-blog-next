import { Link } from "next-view-transitions";
import { Photo } from "@/components/photo";

interface PhotoProps {
  slug: string;
}

export const PhotoLink = ({ slug }: PhotoProps) => {
  return (
    <Link href={`/photo/${slug}`} aria-label="Enlarge photo">
      <Photo
        slug={slug}
        width={390}
        height={390}
        quality={40}
        className="w-full h-full aspect-square object-cover"
      />
    </Link>
  );
};
