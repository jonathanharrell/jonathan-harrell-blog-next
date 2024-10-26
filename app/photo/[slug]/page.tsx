import { Photo } from "@/components/photo";
import { getAllPhotoSlugs } from "@/lib/get-all-post-slugs";
import { getPostData } from "@/lib/get-post-data";

interface PhotoPageProps {
  params: {
    slug: string;
  };
}

const PhotoPage = async ({ params }: PhotoPageProps) => {
  return (
    <div className="wrapper flex items-center justify-center py-12">
      <Photo
        slug={params.slug}
        width={900}
        height={900}
        className="w-full h-full max-w-[900px] max-h-[900px]"
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
