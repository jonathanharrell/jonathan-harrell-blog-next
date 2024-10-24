import { Link } from "next-view-transitions";
import classNames from "classnames";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  pageLinkPrefix?: string;
}

export const Pagination = ({
  totalPages,
  currentPage,
  pageLinkPrefix,
}: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <section id="pagination" className="py-12">
      <nav aria-labelledby="pagination-label">
        <h2 id="pagination-label" className="sr-only" aria-hidden="true">
          Post pagination
        </h2>
        <div className="prose prose-neutral dark:prose-invert mx-auto">
          <ul className="not-prose flex flex-wrap justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <li key={index}>
                <Link
                  href={
                    pageLinkPrefix
                      ? `?${pageLinkPrefix}&page=${index}`
                      : `?page=${index}`
                  }
                  className={classNames(
                    "py-3 md:py-2 px-4 md:px-3 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 rounded font-etbook-lining-figures text-neutral-500 leading-none transition-colors duration-200 ease-in-out",
                    currentPage === index
                      ? "border-neutral-400 text-neutral-800 dark:text-neutral-100"
                      : "",
                  )}
                  aria-label={`Go to page ${index + 1} of posts`}
                >
                  {index}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </section>
  );
};
