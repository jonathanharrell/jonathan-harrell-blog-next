import { Suspense } from "react";
import Link from "next/link";
import { DesktopNav } from "@/components/desktop-nav";
import { MobileNav } from "@/components/mobile-nav";
import { Glyph } from "@/components/glyph";

export const Header = () => {
  return (
    <header className="group">
      <div className="wrapper">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 md:gap-4 pt-6 pb-4 border-b border-neutral-200">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 md:gap-2 sm:mr-auto">
            <Link href="/" rel="home" className="block w-8 h-8">
              <Glyph />
              <span className="sr-only">Go to homepage</span>
            </Link>
            <div className="flex flex-col md:flex-row items-center sm:items-start md:items-center md:gap-2 text-lg">
              <Link href="/" className="small-caps text-xl md:text-lg">
                Human in the Loop
              </Link>
              <span className="hidden md:inline" aria-hidden="true">
                /
              </span>
              <span>Jonathan Harrell’s Commonplace Book</span>
            </div>
          </div>
          <Suspense fallback={<></>}>
            <DesktopNav />
          </Suspense>
          <MobileNav />
        </div>
      </div>
    </header>
  );
};
