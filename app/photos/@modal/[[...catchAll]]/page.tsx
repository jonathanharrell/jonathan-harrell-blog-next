import { getAllPhotoSlugs } from "@/lib/get-all-post-slugs";

const PhotosPage = async () => {
  return null;
};

export default PhotosPage;

export const generateMetadata = async () => {
  const slugs = await getAllPhotoSlugs();

  return {
    title: "Photos | Human in the Loop",
    description: "Photos from Jonathan Harrell’s commonplace book",
    openGraph: {
      images: [`/assets/photos/${slugs[0].slug}`],
    },
  };
};
