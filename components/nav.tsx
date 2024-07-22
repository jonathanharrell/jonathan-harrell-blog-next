import Link from "next/link";

export const Nav = () => {
  return (
    <div className="md:w-[95vw] lg:w-[90vw] 2xl:w-[80vw] max-w-[1300px] mx-auto pt-4 px-8 sm:px-12 text-lg">
      <p className="text-center small-caps">Human {`{ `}in the{` }`} Loop</p>
      <nav className="py-1 pb-4 border-b border-neutral-200">
        <ul className="flex justify-center gap-3">
          <li><Link href="/">Home</Link></li>/
          <li><Link href="/blog">Blog</Link></li>/
          <li><Link href="/photos">Photos</Link></li>/
          <li><Link href="/archive">Archive</Link></li>/
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>
    </div>
  )
}