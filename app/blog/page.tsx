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
    <div className="flex flex-col gap-16">
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
  );
};

export default BlogPage;