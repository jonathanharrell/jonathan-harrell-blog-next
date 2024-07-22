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
    <div className="w-full py-16 border-b border-neutral-200">
    <div className="prose prose-lg md:prose-xl">
      <div className="mb-4">
        {frontmatter.title}
        <Link href={`/blog/${slug}`} className="no-underline">
          <time dateTime={frontmatter.date} className="block text-xl small-caps">
            {formattedDate}
          </time>
        </Link>
        <div className="flex flex-wrap gap-3">{frontmatter.tags.map(tag => <Link href={`?tag=${tag}`} className="no-underline">/{tag}</Link>)}</div>
      </div>
      {content}
    </div>
    </div>
  );
}