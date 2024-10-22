import { PhotoLink } from "@/components/photo-link";
import { getAllPhotoSlugs } from "@/lib/get-all-post-slugs";

const PhotosPage = async () => {
  const slugs = await getAllPhotoSlugs();

  return (
    <div className="wrapper py-8 lg:py-12">
      <h1 className="sr-only">Photos</h1>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {slugs.map((slug) => (
          <li key={slug}>
            <PhotoLink slug={slug} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhotosPage;

export const generateMetadata = async () => {
  const slugs = await getAllPhotoSlugs();

  return {
    title: "Photos | Human in the Loop",
    description: "Photos from Jonathan Harrell’s commonplace book",
    openGraph: {
      images: [`/assets/photos/${slugs[0]}`],
    },
  };
};
