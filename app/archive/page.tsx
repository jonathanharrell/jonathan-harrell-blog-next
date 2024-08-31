import {getAllPostsTeasers} from "@/lib/utils";
import {PostTeaser} from "@/components/post-teaser";

const ArchivePage = async () => {
  const postTeasers = await getAllPostsTeasers();

  return (
    <div className="flex flex-col gap-4 py-16">
      <ul className="prose prose-lg md:prose-xl mx-auto">
        {postTeasers.map((teaser) => (
          <li key={teaser.slug}>
            <PostTeaser teaser={teaser} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArchivePage;