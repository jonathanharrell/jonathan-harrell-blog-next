import { PhotoModal } from "@/components/photo-modal";
import { getPhotosManifest } from "@/lib/get-photos-manifest";
import { Spinner } from "@/components/spinner";

interface PhotoPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const PhotoPage = async (props: PhotoPageProps) => {
  const params = await props.params;
  const photosManifest = getPhotosManifest();

  const matchingIndex = photosManifest.findIndex(
    (image) => image.slug === params.slug,
  );
  const matchingPhoto = photosManifest[matchingIndex];
  const metadata = matchingPhoto?.metadata;

  const previousSlug = photosManifest[matchingIndex - 1]?.slug;
  const nextSlug = photosManifest[matchingIndex + 1]?.slug;

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

export const generateMetadata = async (props: PhotoPageProps) => {
  const params = await props.params;
  return {
    title: "Photo | Human in the Loop",
    description: "Photo from Jonathan Harrell’s commonplace book",
    openGraph: {
      images: [`/assets/photos/${params.slug}`],
    },
  };
};
