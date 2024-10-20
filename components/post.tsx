import { Link } from "next-view-transitions";
import classNames from "classnames";
import { getPostData } from "@/lib/get-post-data";

interface PostProps {
  slug: string;
  single?: boolean;
  className?: string;
}

export const Post = async ({ slug, single, className }: PostProps) => {
  const { content, frontmatter } = await getPostData(slug);

  const formattedDate = new Date(frontmatter.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const filteredTags = frontmatter.tags.filter((tag) => tag !== "jdch");

  return (
    <article className={classNames("jh-prose", className)}>
      <header className="mb-4">
        {single ? (
          <h1 className="!my-0">
            <Link href={`/blog/${slug}`} className="no-underline">
              <time dateTime={frontmatter.date} className="inline-block">
                {formattedDate}
              </time>
            </Link>
          </h1>
        ) : (
          <h3 className="!my-0 leading-none">
            <Link href={`/blog/${slug}`} className="no-underline">
              <time
                dateTime={frontmatter.date}
                className="inline-block text-xl small-caps"
              >
                {formattedDate}
              </time>
            </Link>
          </h3>
        )}
        {Boolean(filteredTags.length) && (
          <div className="not-prose">
            <h4 id="post-tags-label" className="sr-only" aria-hidden="true">
              Post tags
            </h4>
            <ul
              className="flex flex-wrap gap-3 !pl-0 text-lg"
              aria-labelledby="post-tags-label"
            >
              {filteredTags.map((tag) => (
                <li key={tag}>
                  <Link href={`?tag=${tag}`} className="no-underline">
                    <span className="aria-hidden">/</span>
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
      {content}
    </article>
  );
};
