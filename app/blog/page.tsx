import type { Metadata } from "next";
import { Posts } from "@/components/posts";
import { Pagination } from "@/components/pagination";
import { Filters } from "@/components/filters";
import { getPostSlugs } from "@/lib/get-post-slugs";

export const metadata: Metadata = {
  title: "Blog | Human in the Loop",
  description: "Entries of Jonathan Harrell’s commonplace book",
  openGraph: {
    images: ["/assets/api/og.png"],
  },
};

const BlogPage = async () => {
  const { slugs, pagination, tags, months } = await getPostSlugs();

  const { currentPage, totalPages } = pagination;

  return (
    <div className="wrapper pt-8 sm:pt-10 md:pt-14">
      <header className="jh-prose mx-auto">
        <h1 className="mt-0">Commonplaces</h1>
      </header>
      <section>
        <Posts slugs={slugs} />
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </section>
      <Filters tags={tags} months={months} />
    </div>
  );
};

export default BlogPage;
