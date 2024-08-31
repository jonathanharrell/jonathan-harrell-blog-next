import {getPostMonths, getPostSlugs, getPostTags} from "@/lib/utils";
import {Post} from "@/components/post";
import Link from "next/link";
import classNames from "classnames";
import {FilterMonths} from "@/components/filter-months";

interface BlogPageProps {
  searchParams: {
    tag?: string;
    month?: string;
    page?: string;
  };
}

const BlogPage = async ({searchParams}: BlogPageProps) => {
  const tag = searchParams.tag;
  const tagToDisplay = tag ? tag.split(",").join(", ") : '';
  const month = searchParams.month;
  const page = searchParams.page ? Number(searchParams.page) : 0;

  const { slugs, pagination } = await getPostSlugs({ tag, month, page });
  const { tags } = await getPostTags();
  const { months } = await getPostMonths();
  const { currentPage, totalPages } = pagination;

  let pageLinkPrefix = tag ? `tag=${tag}` : '';

  if (month) {
    pageLinkPrefix = pageLinkPrefix ? `${pageLinkPrefix}&month=${month}` : `month=${month}`;
  }

  return (
    <div className="grid grid-cols-12 md:gap-16">
      <div className="col-span-12 lg:col-span-9 xl:col-span-8 flex flex-col">
        {(tagToDisplay || month) && (
          <h1 className="mt-16 text-2xl uppercase">• {tagToDisplay || month} •</h1>
        )}
        <div className="flex flex-col">
          {slugs.map((slug) => (
            <div key={slug} className="py-10 md:py-16 border-b border-neutral-200">
              <Post slug={slug} />
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="flex py-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <Link
                key={index}
                href={pageLinkPrefix ? `?${pageLinkPrefix}&page=${index}` : `?page=${index}`}
                className={classNames("p-2 hover:underline underline-offset-4", currentPage === index ? "underline" : "")}
              >
                {index}
              </Link>
            ))}
          </div>
        )}
      </div>
      <section className="hidden lg:block col-start-10 col-end-13">
        <h2 className="sr-only">Filters</h2>
        <div className="flex flex-col gap-8 py-16 text-lg">
          {Boolean(tags.length) && (
            <div className="flex flex-col gap-1">
              <h3 className="all-small-caps">Tags</h3>
              <ul>
                {tags.filter(tag => tag !== "jdch").map(tag => (
                  <li key={tag}>
                    <Link href={`?tag=${tag}`} className="hover:underline decoration-1 underline-offset-4">/{tag}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <FilterMonths months={months} />
        </div>
      </section>
    </div>
  );
};

export default BlogPage;