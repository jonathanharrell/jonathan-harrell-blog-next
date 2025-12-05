import { Photo } from "@/components/photo";
import { getPhotosManifest } from "@/lib/get-photos-manifest";

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

  return (
    <div className="wrapper flex items-center justify-center py-12">
      <Photo
        slug={params.slug}
        width={1600}
        height={1600}
        metadata={matchingPhoto?.metadata}
        className="w-full h-full max-w-[1200px] max-h-[1200px]"
      />
    </div>
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

export const generateStaticParams = async () => {
  const photosManifest = getPhotosManifest();
  const slugs = photosManifest.map((image) => image.slug);

  return slugs.map((slug) => ({
    slug,
  }));
};
