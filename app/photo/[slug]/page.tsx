import { Photo } from "@/components/photo";
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

  return (
    <div className="wrapper flex items-center justify-center py-12">
      <Photo
        slug={params.slug}
        width={1600}
        height={1600}
        metadata={matchingImage?.metadata}
        className="w-full h-full max-w-[1200px] max-h-[1200px]"
      />
    </div>
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

export const generateStaticParams = async () => {
  const imagesManifest = getImagesManifest();
  const slugs = imagesManifest.map((image) => image.slug);

  return slugs.map((slug) => ({
    slug,
  }));
};
