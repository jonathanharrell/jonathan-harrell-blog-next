import {getPostData} from "@/lib/utils";
import Link from "next/link";

interface PostProps {
  slug: string;
}

export const Post = async ({ slug }: PostProps) => {
  const { content, frontmatter } = await getPostData(slug);

  const formattedDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="prose md:prose-lg lg:prose-xl w-full py-16 border-b border-neutral-200">
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
}