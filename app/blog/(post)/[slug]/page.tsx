import {getPostSlugs, getPostData} from "@/lib/utils";

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
    <div className="w-full mx-auto prose">
      <div className="mb-4">
        {frontmatter.title}
        <time dateTime={frontmatter.date} className="block font-bold">
          {formattedDate}
        </time>
        #{frontmatter.tags}
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