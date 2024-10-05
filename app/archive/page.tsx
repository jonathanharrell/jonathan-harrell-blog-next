import { getPostTeasers } from "@/lib/utils";
import { ArchiveTeaser } from "@/components/archive-teaser";

const ArchivePage = async () => {
  const postTeasers = await getPostTeasers();

  return (
    <div className="wrapper flex flex-col gap-4 py-4 md:py-8 lg:py-12">
      <ul className="prose prose-neutral prose-lg md:prose-xl mx-auto">
        {postTeasers.map((teaser) => (
          <li key={teaser.slug}>
            <ArchiveTeaser teaser={teaser} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArchivePage;
