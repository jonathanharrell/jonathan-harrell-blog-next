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
    <div className="wrapper">
      <header className="jh-prose mx-auto pt-4 md:pt-8 pb-6 border-b border-neutral-200 border-dashed">
        <h1>Human in the Loop</h1>
      </header>
      <section>
        <h2 id="posts-label" className="sr-only">
          Posts
        </h2>
        <ul className="flex flex-col" aria-labelledby="posts-label">
          {slugs.map((slug) => (
            <li key={slug}>
              <Post
                slug={slug}
                className="mx-auto py-8 sm:py-10 border-b border-neutral-200 border-dashed"
              />
            </li>
          ))}
        </ul>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          pageLinkPrefix={pageLinkPrefix}
        />
      </section>
      <Filters
        tags={tags}
        months={months}
        selectedTag={selectedTag}
        selectedMonth={selectedMonth}
      />
    </div>
  );
};

export default BlogPage;
