import { PhotoModal } from "@/components/photo-modal";
import { getImagesManifest } from "@/lib/get-images-manifest";

interface PhotoPageProps {
  params: {
    slug: string;
  };
}

const PhotoPage = async ({ params }: PhotoPageProps) => {
  const imagesManifest = getImagesManifest();

  const matchingIndex = imagesManifest.findIndex(
    (image) => image.slug === params.slug,
  );
  const matchingImage = imagesManifest[matchingIndex];
  const metadata = matchingImage?.metadata;

  const previousSlug = imagesManifest[matchingIndex - 1]?.slug;
  const nextSlug = imagesManifest[matchingIndex + 1]?.slug;

  return (
    <PhotoModal
      slug={params.slug}
      width={1600}
      height={1600}
      metadata={metadata}
      previousSlug={previousSlug}
      nextSlug={nextSlug}
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
