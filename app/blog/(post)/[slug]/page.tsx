import { Post } from "@/components/post";
import { getPostSlugs } from "@/lib/get-post-slugs";
import { getPostData } from "@/lib/get-post-data";
import { SITE_URL } from "@/constants";

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

export const generateMetadata = async ({ params }: BlogPostProps) => {
  const { frontmatter } = await getPostData(params.slug);

  const formattedDate = new Date(frontmatter.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return {
    title: `${formattedDate} | Human in the Loop`,
    description: `Commonplace from ${formattedDate}`,
    author: [
      { name: "Jonathan Harrell", url: "https://www.jonathanharrell.com" },
    ],
    creator: "Jonathan Harrell",
    publisher: "Jonathan Harrell",
    alternates: {
      canonical: `${SITE_URL}blog/${params.slug}`,
    },
    openGraph: {
      images: ["/assets/api/og.png"],
    },
  };
};

export const generateStaticParams = async () => {
  const { slugs } = await getPostSlugs({ perPage: Infinity });

  return slugs.map(({ slug }) => ({
    slug,
  }));
};
