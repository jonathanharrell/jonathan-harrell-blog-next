import { ReactNode } from "react";
import { PhotoLink } from "@/components/photo-link";
import { getImagesManifest } from "@/lib/get-images-manifest";

const PhotosLayout = async ({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) => {
  const imagesManifest = getImagesManifest();
  const slugs = imagesManifest.map((image) => image.slug);

  return (
    <>
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
      {modal}
    </>
  );
};

export default PhotosLayout;
