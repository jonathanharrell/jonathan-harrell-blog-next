import Link from "next/link";

export const DesktopNav = () => {
  return (
    <nav className="hidden lg:block">
      <ul className="flex justify-center gap-8 [&_a:hover]:underline [&_a:hover]:decoration-1 [&_a:hover]:underline-offset-4">
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        <li>
          <Link href="/photos">Photos</Link>
        </li>
        <li>
          <Link href="/archive">Archive</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};
