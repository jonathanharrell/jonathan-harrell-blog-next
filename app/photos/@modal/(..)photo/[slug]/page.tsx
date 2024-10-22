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

export const generateMetadata = async ({ params }: PhotoPageProps) => {
  return {
    title: "Photo | Human in the Loop",
    description: "Photo from Jonathan Harrell’s commonplace book",
    openGraph: {
      images: [`/assets/photos/${params.slug}`],
    },
  };
};
