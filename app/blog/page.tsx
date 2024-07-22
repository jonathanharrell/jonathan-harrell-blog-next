import {getPostMonths, getPostSlugs, getPostTags} from "@/lib/utils";
import {Post} from "@/components/post";
import Link from "next/link";

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

  const { slugs, pagination } = await getPostSlugs({ tag, month, page });
  const { tags } = await getPostTags();
  const { months } = await getPostMonths();
  const { currentPage, totalPages } = pagination;

  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-12 lg:col-span-8 flex flex-col">
        {(tag || month) && (
          <h1 className="mt-16 text-2xl uppercase">• {tag || month} •</h1>
        )}
        <div className="flex flex-col">
          {slugs.map((slug) => (
            <Post slug={slug}/>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <Link key={index} href={`?page=${index}`} className={currentPage === index ? "font-bold" : ""}>{index}</Link>
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
              <ul className="text-xl">
                {tags.map(tag => (
                  <li key={tag}>
                    <Link href={`?tag=${tag}`} className="hover:underline decoration-1 underline-offset-4">/{tag}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {Boolean(months.length) && (
            <div className="flex flex-col gap-1">
              <h3 className="all-small-caps">Months</h3>
              <ul className="text-xl">
                {months.map(month => (
                  <li key={month}>
                    <Link href={`?month=${month}`} className="hover:underline decoration-1 underline-offset-4">{month}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;