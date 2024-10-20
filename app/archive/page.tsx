import { ArchiveTeaser } from "@/components/archive-teaser";
import { getPostTeasers } from "@/lib/get-post-teasers";

const ArchivePage = async () => {
  const postTeasers = await getPostTeasers();

  return (
    <div className="wrapper flex flex-col gap-4 py-8 sm:py-10 md:py-14">
      <div className="jh-prose mx-auto">
        <h1 className="mt-0">Archive</h1>
        <h2 id="posts-label" className="sr-only" aria-hidden="true">
          Posts
        </h2>
        <ul className="list-none !pl-0" aria-labelledby="posts-label">
          {postTeasers.map((teaser) => (
            <li key={teaser.slug}>
              <ArchiveTeaser teaser={teaser} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArchivePage;
