import {getAllPhotoSlugs} from "@/lib/utils";

const PhotosPage = async () => {
  const slugs = await getAllPhotoSlugs();

  return (
    <div>
      <p>photos page</p>
      <div className="grid grid-cols-3 gap-4">
        {slugs.map((slug) => (
          <img key={slug} src={`/assets/photos/${slug}`} alt="" className="aspect-square object-cover" />
        ))}
      </div>
    </div>
  );
}

export default PhotosPage;