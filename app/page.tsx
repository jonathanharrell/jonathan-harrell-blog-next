import {getPostTeasers} from "@/lib/utils";
import Link from "next/link";

const HomePage = async () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <p className="mb-2 text-5xl font-requiem-ornaments text-stone-500">;</p>
      <h1 className="text-8xl font-requiem-display italic">Human in the Loop</h1>
      <p className="text-2xl small-caps">Jonathan Harrell’s Creative Scrapbook</p>
      <nav className="mt-6 text-lg">
        <ul className="flex justify-center gap-3 [&_a:hover]:underline [&_a:hover]:decoration-1 [&_a:hover]:underline-offset-4">
          <li><Link href="/blog">Blog</Link></li>{` | `}
          <li><Link href="/photos">Photos</Link></li>{` | `}
          <li><Link href="/archive">Archive</Link></li>{` | `}
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;