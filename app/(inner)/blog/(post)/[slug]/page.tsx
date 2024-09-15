import {getPostSlugs, getPostData} from "@/lib/utils";
import Link from "next/link";
import classNames from "classnames";
import {Post} from "@/components/post";

interface BlogPostProps {
  params: {
    slug: string;
  }
}

const BlogPost = async ({params}: BlogPostProps) => {
  return (
    <Post slug={params.slug} className="mx-auto py-16" />
  );
};

export default BlogPost;

export const generateStaticParams = async () => {
  const { slugs } = await getPostSlugs();

  return slugs.map((slug) => ({
    slug
  }));
}