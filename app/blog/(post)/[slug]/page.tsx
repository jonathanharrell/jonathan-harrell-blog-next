import { Post } from "@/components/post";
import { getPostSlugs } from "@/lib/get-post-slugs";

interface BlogPostProps {
  params: {
    slug: string;
  };
}

const BlogPost = async ({ params }: BlogPostProps) => {
  return (
    <div className="wrapper py-8 sm:py-10 md:py-14">
      <Post slug={params.slug} single className="mx-auto" />
    </div>
  );
};

export default BlogPost;

export const generateStaticParams = async () => {
  const { slugs } = await getPostSlugs({ perPage: Infinity });

  return slugs.map((slug) => ({
    slug,
  }));
};
