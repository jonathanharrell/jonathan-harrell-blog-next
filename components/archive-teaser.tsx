import { Link } from "next-view-transitions";
import { Frontmatter } from "@/lib/utils";

interface ArchiveTeaserProps {
  teaser: {
    slug: string;
    frontmatter: Frontmatter;
    text: string;
  };
}

export const ArchiveTeaser = ({ teaser }: ArchiveTeaserProps) => {
  const formattedDate = new Date(
    teaser.frontmatter.date as string,
  ).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <p>
      <Link
        href={`/blog/${teaser.slug}`}
        className="underline hover:no-underline"
      >
        {formattedDate}
      </Link>
      : {teaser.text || "(image)"}
    </p>
  );
};
