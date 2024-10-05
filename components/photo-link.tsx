import { Link } from "next-view-transitions";
import { Photo } from "@/components/photo";

interface PhotoProps {
  slug: string;
}

export const PhotoLink = ({ slug }: PhotoProps) => {
  return (
    <Link href={`/photo/${slug}`}>
      <Photo
        slug={slug}
        width={390}
        height={390}
        className="aspect-square object-cover"
      />
    </Link>
  );
};
