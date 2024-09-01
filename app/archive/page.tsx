import {getPostTeasers} from "@/lib/utils";
import {ArchiveTeaser} from "@/components/archive-teaser";

const ArchivePage = async () => {
  const postTeasers = await getPostTeasers();

  return (
    <div className="flex flex-col gap-4 py-16">
      <ul className="prose prose-lg md:prose-xl mx-auto">
        {postTeasers.map((teaser) => (
          <li key={teaser.slug}>
            <ArchiveTeaser teaser={teaser} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArchivePage;