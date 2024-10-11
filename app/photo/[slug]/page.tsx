import { getAllPhotoSlugs, getPhotoSize, getPostSlugs } from "@/lib/utils";
import { Photo } from "@/components/photo";

interface PhotoPageProps {
  params: {
    slug: string;
  };
}

const PhotoPage = async ({ params }: PhotoPageProps) => {
  return (
    <div className="flex items-center justify-center p-12">
      <Photo slug={params.slug} width={900} height={900} />
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
