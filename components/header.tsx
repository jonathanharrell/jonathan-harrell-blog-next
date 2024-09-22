import Link from "next/link";
import { DesktopNav } from "@/components/desktop-nav";
import { MobileNav } from "@/components/mobile-nav";

export const Header = () => {
  return (
    <header className="group">
      <div className="wrapper">
        <div className="flex flex-col sm:flex-row items-center md:items-baseline justify-between gap-4 pt-8 pb-6 border-b border-neutral-200 group-has-[+_main_#filters]:!border-0 text-lg">
          <p className="flex flex-col md:flex-row items-center sm:items-start md:items-center md:gap-2">
            <Link href="/" className="small-caps">
              Human in the Loop
            </Link>
            <span className="hidden md:inline" aria-hidden="true">
              ∙
            </span>
            <span>Jonathan Harrell’s Creative Scrapbook</span>
          </p>
          <DesktopNav />
          <MobileNav />
        </div>
      </div>
    </header>
  );
};
