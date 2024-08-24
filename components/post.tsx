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
    <article className="w-full py-16 border-b border-neutral-200">
      <div className="prose prose-lg md:prose-xl">
        <header className="mb-4">
          <div>
            <Link href={`/blog/${slug}`} className="no-underline">
              <time dateTime={frontmatter.date} className="inline-block text-xl small-caps">
                {formattedDate}
              </time>
            </Link>
          </div>
          <div className="flex flex-wrap gap-3">{frontmatter.tags.filter(tag => tag !== "jdch").map(tag => <Link href={`?tag=${tag}`} className="no-underline">/{tag}</Link>)}</div>
        </header>
        {content}
      </div>
    </article>
  );
}