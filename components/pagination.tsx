import Link from "next/link";
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
    <section className="flex flex-wrap justify-center py-8">
      <nav aria-labelledby="pagination-label">
        <h2 id="pagination-label" className="sr-only" aria-hidden="true">
          Post pagination
        </h2>
        <ul>
          {Array.from({ length: totalPages }).map((_, index) => (
            <Link
              key={index}
              href={
                pageLinkPrefix
                  ? `?${pageLinkPrefix}&page=${index}`
                  : `?page=${index}`
              }
              className={classNames(
                "p-3 md:p-2 hover:underline underline-offset-4",
                currentPage === index ? "underline" : "",
              )}
              aria-label={`Go to page ${index + 1} of posts`}
              aria-current={currentPage === index}
            >
              {index}
            </Link>
          ))}
        </ul>
      </nav>
    </section>
  );
};
