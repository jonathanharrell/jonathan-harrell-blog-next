import { Link } from "next-view-transitions";
import classNames from "classnames";
import { getPostData } from "@/lib/get-post-data";
import { SITE_URL } from "@/constants";
import { getPreviousAndNextPosts } from "@/lib/get-previous-and-next-posts";

interface PostProps {
  slug: string;
  single?: boolean;
  className?: string;
}

export const Post = async ({ slug, single, className }: PostProps) => {
  const [{ content, frontmatter }, { previous, next }] = await Promise.all([
    getPostData(slug),
    getPreviousAndNextPosts(slug),
  ]);

  const formattedDate = new Date(frontmatter.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const filteredTags = frontmatter.tags?.filter((tag) => tag !== "jdch") ?? [];

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "BlogPosting",
    headline: frontmatter.title ?? formattedDate,
    author: {
      "@type": "Person",
      name: "Jonathan Harrell",
      url: "https://www.jonathanharrell.com",
    },
    datePublished: frontmatter.date,
    dateCreated: frontmatter.date,
    url: `${SITE_URL}blog/${slug}`,
    "inLanguage ": "en-US",
    image: `${SITE_URL}assets/seo/og.png`,
    keywords: filteredTags.join(","),
  };

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
            <h4
              id={`${slug}-post-tags-label`}
              className="sr-only"
              aria-hidden="true"
            >
              Post tags
            </h4>
            <ul
              className="flex flex-wrap gap-3 !pl-0 text-lg"
              aria-labelledby={`${slug}-post-tags-label`}
            >
              {filteredTags.map((tag) => (
                <li key={tag}>
                  <Link
                    href={`/blog/filtered?tag=${tag}`}
                    rel="tag"
                    className="no-underline"
                  >
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
      {single && (
        <footer className="pt-6 mt-12 border-t border-neutral-200 border-dashed">
          <h2 id="other-articles-label" className="sr-only">
            Other articles
          </h2>
          <nav
            aria-labelledby="other-aticles-label"
            className="flex flex-col sm:flex-row items-center md:justify-between gap-8 text-lg text-center"
          >
            <div className="flex-1 sm:text-left">
              {next && (
                <Link href={`/blog/${next.slug}`} rel="next">
                  Next post
                </Link>
              )}
            </div>
            <div className="flex-1 sm:ml-auto sm:text-right">
              {previous && (
                <Link href={`/blog/${previous.slug}`} rel="prev">
                  Previous post
                </Link>
              )}
            </div>
          </nav>
        </footer>
      )}
      {single && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </article>
  );
};
