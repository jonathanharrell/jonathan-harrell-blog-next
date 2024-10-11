import { PhotoModal } from "@/components/photo-modal";

interface PhotoPageProps {
  params: {
    slug: string;
  };
}

const PhotoPage = async ({ params }: PhotoPageProps) => {
  return <PhotoModal slug={params.slug} width={900} height={900} />;
};

export default PhotoPage;
