import type { Metadata } from "next";
import { Posts } from "@/components/posts";
import { Pagination } from "@/components/pagination";
import { Filters } from "@/components/filters";
import { getPostSlugs } from "@/lib/get-post-slugs";

export const metadata: Metadata = {
  title: "Blog | Human in the Loop",
  description: "Entries of Jonathan Harrell’s commonplace book",
  openGraph: {
    images: ["/assets/seo/og.png"],
  },
};

interface FilteredBlogPageProps {
  searchParams: {
    tag?: string;
    month?: string;
    page?: string;
  };
}

const FilteredBlogPage = async ({ searchParams }: FilteredBlogPageProps) => {
  const {
    tag: selectedTag,
    month: selectedMonth,
    page: selectedPage,
  } = searchParams;

  const { slugs, pagination, tags, months } = await getPostSlugs({
    tag: selectedTag,
    month: selectedMonth,
    page: selectedPage ? Number(selectedPage) : 0,
  });

  const { currentPage, totalPages } = pagination;

  let pageLinkPrefix = selectedTag ? `tag=${selectedTag}` : "";

  if (selectedMonth) {
    pageLinkPrefix = pageLinkPrefix
      ? `${pageLinkPrefix}&month=${selectedMonth}`
      : `month=${selectedMonth}`;
  }

  return (
    <div className="wrapper pt-8 sm:pt-10 md:pt-14">
      <header className="jh-prose mx-auto">
        <h1 className="mt-0">
          Commonplaces
          {selectedTag || selectedMonth ? (
            <span className="no-caps"> / {selectedTag || selectedMonth}</span>
          ) : null}
        </h1>
      </header>
      <section>
        <Posts slugs={slugs} />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          pageLinkPrefix={pageLinkPrefix}
        />
      </section>
      <Filters tags={tags} months={months} />
    </div>
  );
};

export default FilteredBlogPage;
