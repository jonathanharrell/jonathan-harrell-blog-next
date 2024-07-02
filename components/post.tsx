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
    <div className="prose w-full mx-auto pt-16 pb-12 border-b border-neutral-200">
      <div className="mb-4">
        {frontmatter.title}
        <Link href={`/blog/${slug}`} className="font-sentinel text-lg no-underline">
          <time dateTime={frontmatter.date} className="block font-bold">
            {formattedDate}
          </time>
        </Link>
        #{frontmatter.tags}
      </div>
      {content}
    </div>
  );
}