import { Photo } from "@/components/photo";
import { getAllPhotoSlugs } from "@/lib/get-all-post-slugs";

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

export const generateStaticParams = async () => {
  const slugs = await getAllPhotoSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
};
