import {getPostData} from "@/lib/utils";
import Link from "next/link";
import classNames from "classnames";

interface PostProps {
  slug: string;
  className?: string;
}

export const Post = async ({ slug, className }: PostProps) => {
  const { content, frontmatter } = await getPostData(slug);

  const formattedDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const filteredTags = frontmatter.tags.filter(tag => tag !== "jdch");

  return (
    <article className={classNames("prose prose-lg md:prose-xl", className)}>
      <header className="mb-4">
        <Link href={`/blog/${slug}`} className="no-underline">
          <time dateTime={frontmatter.date} className="inline-block text-xl small-caps">
            {formattedDate}
          </time>
        </Link>
        <div className="flex flex-wrap gap-3">
          {filteredTags.map(tag => (
            <Link key={tag} href={`?tag=${tag}`} className="no-underline">
              /{tag}
            </Link>
          ))}
        </div>
      </header>
      {content}
    </article>
  );
}