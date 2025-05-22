import { PhotoModal } from "@/components/photo-modal";
import { getPhotoMetadata } from "@/lib/get-photo-metadata";

interface PhotoPageProps {
  params: {
    slug: string;
  };
}

const PhotoPage = async ({ params }: PhotoPageProps) => {
  const metadata = await getPhotoMetadata(params.slug);

  return (
    <PhotoModal
      slug={params.slug}
      width={1600}
      height={1600}
      metadata={metadata}
    />
  );
};

export default PhotoPage;

export const generateMetadata = async ({ params }: PhotoPageProps) => {
  return {
    title: "Photo | Human in the Loop",
    description: "Photo from Jonathan Harrell’s commonplace book",
    openGraph: {
      images: [`/assets/photos/${params.slug}`],
    },
  };
};
