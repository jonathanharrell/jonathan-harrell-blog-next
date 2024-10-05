import Image from "next/image";
import { getPhotoSize } from "@/lib/utils";

interface PhotoPageProps {
  params: {
    slug: string;
  };
}

const PhotoPage = async ({ params }: PhotoPageProps) => {
  const { width, height } = await getPhotoSize(params.slug);

  return (
    <div className="flex items-center justify-center">
      <Image
        src={`/assets/photos/${params.slug}`}
        alt=""
        width={width}
        height={height}
        loading="lazy"
      />
    </div>
  );
};

export default PhotoPage;
