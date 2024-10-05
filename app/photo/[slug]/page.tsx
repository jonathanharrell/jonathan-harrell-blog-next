import { getPhotoSize } from "@/lib/utils";
import { Photo } from "@/components/photo";

interface PhotoPageProps {
  params: {
    slug: string;
  };
}

const PhotoPage = async ({ params }: PhotoPageProps) => {
  const { width, height } = await getPhotoSize(params.slug);

  return (
    <div className="flex items-center justify-center p-12">
      <Photo slug={params.slug} width={width} height={height} />
    </div>
  );
};

export default PhotoPage;
