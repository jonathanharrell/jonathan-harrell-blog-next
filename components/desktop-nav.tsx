"use client";

import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import classNames from "classnames";

export const DesktopNav = () => {
  const pathname = usePathname();

  const getClasses = (path: string) => {
    return classNames({
      "underline decoration-1": pathname === path,
    });
  };

  return (
    <nav className="hidden lg:block" aria-labelledby="navigation-label">
      <h2 id="navigation-label" className="sr-only" aria-hidden="true">
        Site navigation
      </h2>
      <ul className="flex justify-center gap-8 [&_a:hover]:underline [&_a:hover]:decoration-1 underline-offset-4 text-lg">
        <li>
          <Link href="/blog" className={getClasses("/blog")}>
            Blog
          </Link>
        </li>
        <li>
          <Link href="/photos" className={getClasses("/photos")}>
            Photos
          </Link>
        </li>
        <li>
          <Link href="/archive" className={getClasses("/archive")}>
            Archive
          </Link>
        </li>
        <li>
          <Link href="/about" className={getClasses("/about")}>
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};
