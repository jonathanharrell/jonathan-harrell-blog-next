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
    <div className="wrapper pt-4 md:pt-8">
      <header className="jh-prose mx-auto">
        <h1>
          Commonplaces
          {selectedTag || selectedMonth ? (
            <span className="no-caps"> / {selectedTag || selectedMonth}</span>
          ) : null}
        </h1>
      </header>
      <section>
        <h2 id="posts-label" className="sr-only">
          Posts
        </h2>
        <ul className="group/list flex flex-col" aria-labelledby="posts-label">
          {slugs.map((slug) => (
            <li key={slug} className="group/post">
              {slug}
              {/*<Post*/}
              {/*  slug={slug}*/}
              {/*  className="mx-auto py-8 sm:py-10 group-has-[+li]/post:border-b group-has-[+#pagination]/list:border-b border-neutral-200 dark:border-neutral-700 border-dashed"*/}
              {/*/>*/}
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
