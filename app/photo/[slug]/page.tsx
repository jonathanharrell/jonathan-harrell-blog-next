import { Photo } from "@/components/photo";
import { getAllPhotoSlugs } from "@/lib/get-all-post-slugs";
// import { getPhotoMetadata } from "@/lib/get-photo-metadata";

interface PhotoPageProps {
  params: {
    slug: string;
  };
}

const PhotoPage = async ({ params }: PhotoPageProps) => {
  // const metadata = await getPhotoMetadata(params.slug);

  return (
    <div className="wrapper flex items-center justify-center py-12">
      <Photo
        slug={params.slug}
        width={1600}
        height={1600}
        // metadata={metadata}
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
  const slugs = await getAllPhotoSlugs();

  return slugs.map(({ slug }) => ({
    slug,
  }));
};
