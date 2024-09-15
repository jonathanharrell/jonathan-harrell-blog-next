import Link from "next/link";

export const Nav = () => {
  return (
    <div className="md:w-[95vw] lg:w-[90vw] 2xl:w-[80vw] max-w-[1300px] mx-auto px-8 sm:px-12 text-lg">
      <div className="sm:flex items-baseline justify-between gap-4 pt-6 pb-4 border-b border-neutral-200">
        <p className="flex items-center gap-2">
          <p className="text-2xl font-requiem-ornaments text-stone-500">;</p>
          <Link href="/" className="small-caps">Human in the Loop</Link>∙
          <span>Jonathan Harrell’s Creative Scrapbook</span>
        </p>
        <nav>
          <ul className="flex justify-center gap-3 [&_a:hover]:underline [&_a:hover]:decoration-1 [&_a:hover]:underline-offset-4">
            <li><Link href="/blog">Blog</Link></li>{` | `}
            <li><Link href="/photos">Photos</Link></li>{` | `}
            <li><Link href="/archive">Archive</Link></li>{` | `}
            <li><Link href="/about">About</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  )
}