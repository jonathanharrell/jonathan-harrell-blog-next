import {getPostMonths, getPostSlugs, getPostTags} from "@/lib/utils";
import {Post} from "@/components/post";
import Link from "next/link";
import classNames from "classnames";
import {FilterMonths} from "@/components/filter-months";
import capitalize from "lodash.capitalize";
import {twMerge} from "tailwind-merge";

interface BlogPageProps {
  searchParams: {
    tag?: string;
    month?: string;
    page?: string;
  };
}

const BlogPage = async ({searchParams}: BlogPageProps) => {
  const tag = searchParams.tag;
  const month = searchParams.month;
  const page = searchParams.page ? Number(searchParams.page) : 0;

  const {slugs, pagination} = await getPostSlugs({tag, month, page});
  const {tags} = await getPostTags();
  const {months} = await getPostMonths();
  const {currentPage, totalPages} = pagination;

  let pageLinkPrefix = tag ? `tag=${tag}` : "";

  if (month) {
    pageLinkPrefix = pageLinkPrefix ? `${pageLinkPrefix}&month=${month}` : `month=${month}`;
  }

  return (
    <div>
      <h1 className="sr-only">Blog</h1>
      <section id="filters" className="hidden lg:block py-10 px-16 bg-neutral-50">
        <h2 className="sr-only">Filters</h2>
        <div className="wrapper grid grid-cols-12 text-lg">
          {Boolean(tags.length) && (
            <div className="col-span-7 flex flex-col gap-1">
              <h3 className="sr-only">Tags</h3>
              <ul className="flex flex-wrap gap-3">
                <li>
                  <Link
                    href={`?tag=`}
                    className={twMerge("py-1.5 px-3 rounded-full bg-neutral-200 hover:bg-neutral-300 transition-colors duration-150 ease-in-out",
                      !tag ? "bg-neutral-300" : undefined
                    )}
                  >All</Link>
                </li>
                {tags.filter(t => t !== "jdch").map(t => (
                  <li key={t}>
                    <Link
                      href={`?tag=${t}`}
                      className={twMerge("py-1.5 px-3 rounded-full bg-neutral-200 hover:bg-neutral-300 transition-colors duration-150 ease-in-out",
                        tag?.includes(t) ? "bg-neutral-300" : undefined
                      )}
                    >
                      {capitalize(t)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="col-start-10 pl-16 border-l border-neutral-200">
            <FilterMonths months={months} selectedMonth={month}/>
          </div>
        </div>
      </section>
      <div className="wrapper">
        <div className="flex flex-col">
          {slugs.map((slug) => (
            <div key={slug}>
              <Post slug={slug} className="mx-auto py-10 md:py-12 border-b border-neutral-200"/>
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center py-8">
            {Array.from({length: totalPages}).map((_, index) => (
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
    </div>
  );
};

export default BlogPage;