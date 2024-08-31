import Link from "next/link";

interface PostTeaserProps {
  teaser: {
    slug: string;
    frontmatter: Record<string, unknown>;
    content: string;
  }
}

export const PostTeaser = ({ teaser }: PostTeaserProps) => {
  const formattedDate = new Date(teaser.frontmatter.date as string).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });

  return (
    <p><Link href={`/blog/${teaser.slug}`} className="underline hover:no-underline">{formattedDate}</Link>: {teaser.content || "(image)"}</p>
  )
}