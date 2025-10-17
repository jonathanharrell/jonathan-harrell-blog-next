import { Post } from "@/components/post";
import { Frontmatter } from "@/types";
import { Suspense } from "react";

interface PostsProps {
  slugs: {
    slug: string;
    frontmatter: Frontmatter;
    lastModified: Date;
  }[];
}

export const Posts = ({ slugs }: PostsProps) => {
  return (
    <>
      <h2 id="posts-label" className="sr-only">
        Posts
      </h2>
      <ul className="group/list flex flex-col" aria-labelledby="posts-label">
        {slugs.map(({ slug }) => (
          <li key={slug} className="group/post">
            <Suspense fallback={<div className="min-h-[75vh]"></div>}>
              <Post
                slug={slug}
                className="mx-auto py-8 sm:py-10 group-has-[+li]/post:border-b group-has-[+#pagination]/list:border-b border-neutral-200 border-dashed"
              />
            </Suspense>
          </li>
        ))}
      </ul>
    </>
  );
};
