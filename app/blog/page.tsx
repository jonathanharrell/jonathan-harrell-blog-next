import Link from "next/link";
import classNames from "classnames";
import { getPostMonths, getPostSlugs, getPostTags } from "@/lib/utils";
import { Filters } from "@/components/filters";
import { Post } from "@/components/post";
import { Pagination } from "@/components/pagination";

interface BlogPageProps {
  searchParams: {
    tag?: string;
    month?: string;
    page?: string;
  };
}

const BlogPage = async ({ searchParams }: BlogPageProps) => {
  const {
    tag: selectedTag,
    month: selectedMonth,
    page: selectedPage,
  } = searchParams;

  const { slugs, pagination } = await getPostSlugs({
    tag: selectedTag,
    month: selectedMonth,
    page: selectedPage ? Number(selectedPage) : 0,
  });
  const { tags } = await getPostTags();
  const { months } = await getPostMonths();

  const { currentPage, totalPages } = pagination;

  let pageLinkPrefix = selectedTag ? `tag=${selectedTag}` : "";

  if (selectedMonth) {
    pageLinkPrefix = pageLinkPrefix
      ? `${pageLinkPrefix}&month=${selectedMonth}`
      : `month=${selectedMonth}`;
  }

  return (
    <div>
      <h1 className="sr-only">Blog</h1>
      <Filters
        tags={tags}
        months={months}
        selectedTag={selectedTag}
        selectedMonth={selectedMonth}
      />
      <section>
        <div className="wrapper">
          <h2 id="posts-label" className="sr-only">
            Posts
          </h2>
          <ul className="flex flex-col" aria-labelledby="posts-label">
            {slugs.map((slug) => (
              <li key={slug}>
                <Post
                  slug={slug}
                  className="mx-auto py-8 sm:py-10 md:py-12 border-b border-neutral-200"
                />
              </li>
            ))}
          </ul>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            pageLinkPrefix={pageLinkPrefix}
          />
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
