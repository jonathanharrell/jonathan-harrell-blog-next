import { ReactNode } from "react";
import { getAllPhotoSlugs } from "@/lib/get-all-post-slugs";
import { PhotoLink } from "@/components/photo-link";

const PhotosLayout = async ({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) => {
  const slugs = await getAllPhotoSlugs();

  return (
    <>
      <div className="wrapper py-8 lg:py-12">
        <h1 className="sr-only">Photos</h1>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {slugs.map(({ slug }) => (
            <li key={slug}>
              <PhotoLink slug={slug} />
            </li>
          ))}
        </ul>
      </div>
      {modal}
    </>
  );
};

export default PhotosLayout;
