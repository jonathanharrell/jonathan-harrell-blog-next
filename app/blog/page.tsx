import {getPostSlugs} from "@/lib/utils";
import {Post} from "@/components/post";
import Link from "next/link";

interface BlogPageProps {
  searchParams: {
    page?: string;
  };
}

const BlogPage = async ({searchParams}: BlogPageProps) => {
  const {page} = searchParams;
  const { slugs, pagination } = await getPostSlugs(page ? Number(page) : 0);
  const { currentPage, totalPages } = pagination;

  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-8 flex flex-col gap-16">
        <div className="flex flex-col">
          {slugs.map((slug) => (
            <Post slug={slug}/>
          ))}
        </div>
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <Link key={index} href={`?page=${index}`} className={currentPage === index ? "font-bold" : ""}>{index}</Link>
            ))}
        </div>
      </div>
      <div className="col-start-10 col-end-13">
        <div className="sticky top-0 py-16 text-lg">
          <ul>
            <li>July 2024</li>
            <li>June 2024</li>
            <li>May 2024</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;