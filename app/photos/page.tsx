import { getAllPhotoSlugs } from "@/lib/utils";
import { PhotoLink } from "@/components/photo-link";

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
