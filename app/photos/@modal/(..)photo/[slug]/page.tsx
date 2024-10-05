import { PhotoModal } from "@/components/photo-modal";
import { getPhotoSize } from "@/lib/utils";

interface PhotoPageProps {
  params: {
    slug: string;
  };
}

const PhotoPage = async ({ params }: PhotoPageProps) => {
  const { width, height } = await getPhotoSize(params.slug);

  return <PhotoModal slug={params.slug} width={width} height={height} />;
};

export default PhotoPage;
