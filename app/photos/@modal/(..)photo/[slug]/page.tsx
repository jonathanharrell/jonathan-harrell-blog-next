import { PhotoModal } from "@/components/photo-modal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo | Human in the Loop",
  description: "Photo from Jonathan Harrell’s commonplace book",
};

interface PhotoPageProps {
  params: {
    slug: string;
  };
}

const PhotoPage = async ({ params }: PhotoPageProps) => {
  return <PhotoModal slug={params.slug} width={900} height={900} />;
};

export default PhotoPage;
