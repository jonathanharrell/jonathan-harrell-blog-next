import {getPostSlugs, getPostData} from "@/lib/utils";
import Link from "next/link";

interface BlogPostProps {
  params: {
    slug: string;
  }
}

const BlogPost = async ({params}: BlogPostProps) => {
  const {slug} = params;
  const { content, frontmatter } = await getPostData(slug);

  const formattedDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="prose prose-lg md:prose-xl w-full mx-auto py-16">
      <div className="mb-4">
        {frontmatter.title}
        <Link href={`/blog/${slug}`} className="text-lg no-underline">
          <time dateTime={frontmatter.date} className="block text-xl small-caps">
            {formattedDate}
          </time>
        </Link>
        <div>{frontmatter.tags.map(tag => `/${tag}`)}</div>
      </div>
      {content}
    </div>
  );
};

export default BlogPost;

export const generateStaticParams = async () => {
  const { slugs } = await getPostSlugs();

  return slugs.map((slug) => ({
    slug
  }));
}