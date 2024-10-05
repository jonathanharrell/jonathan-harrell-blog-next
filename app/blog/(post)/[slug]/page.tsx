import { getPostSlugs } from "@/lib/utils";
import { Post } from "@/components/post";

interface BlogPostProps {
  params: {
    slug: string;
  };
}

const BlogPost = async ({ params }: BlogPostProps) => {
  return (
    <div className="wrapper">
      <Post slug={params.slug} className="mx-auto py-16" />
    </div>
  );
};

export default BlogPost;

export const generateStaticParams = async () => {
  const { slugs } = await getPostSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
};
