import { PhotoModal } from "@/components/photo-modal";
import { getPhotoMetadata } from "@/lib/get-photo-metadata";
import { getAllPhotoSlugs } from "@/lib/get-all-post-slugs";

interface PhotoPageProps {
  params: {
    slug: string;
  };
}

const PhotoPage = async ({ params }: PhotoPageProps) => {
  const metadata = await getPhotoMetadata(params.slug);
  const slugs = await getAllPhotoSlugs();

  const matchingIndex = slugs.findIndex((item) => item.slug === params.slug);

  const previousSlug = slugs[matchingIndex - 1];
  const nextSlug = slugs[matchingIndex + 1];

  return (
    <PhotoModal
      slug={params.slug}
      width={1600}
      height={1600}
      metadata={metadata}
      previousSlug={previousSlug?.slug}
      nextSlug={nextSlug?.slug}
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
