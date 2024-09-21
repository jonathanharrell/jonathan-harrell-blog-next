import Link from "next/link";

export const Nav = () => {
  return (
    <div className="group wrapper text-lg">
      <div className="sm:flex items-baseline justify-between gap-4 pt-8 pb-6 border-b border-neutral-200 group-has-[+_main_#filters]:!border-0">
        <p className="flex items-center gap-2">
          <Link href="/" className="small-caps">Human in the Loop</Link>∙
          <span>Jonathan Harrell’s Creative Scrapbook</span>
        </p>
        <nav>
          <ul className="flex justify-center gap-8 [&_a:hover]:underline [&_a:hover]:decoration-1 [&_a:hover]:underline-offset-4">
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/photos">Photos</Link></li>
            <li><Link href="/archive">Archive</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  )
}