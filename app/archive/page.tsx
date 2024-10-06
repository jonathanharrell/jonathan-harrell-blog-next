import { getPostTeasers } from "@/lib/utils";
import { ArchiveTeaser } from "@/components/archive-teaser";

const ArchivePage = async () => {
  const postTeasers = await getPostTeasers();

  return (
    <div className="wrapper flex flex-col gap-4 py-4 md:py-8">
      <div className="jh-prose mx-auto">
        <h1>Archive</h1>
        <ul className="list-none !pl-0">
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
