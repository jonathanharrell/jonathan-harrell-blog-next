"use client";

import { Link } from "next-view-transitions";

export const SkipToContent = () => {
  const skipToContent = () => {
    document.getElementById("main")?.focus();
  };

  return (
    <Link
      href="#main"
      className="inline-block fixed -top-full focus:top-0 left-0 mt-4 ml-4 py-1.5 px-3 rounded-full border border-neutral-200 hover:border-neutral-400 bg-white shadow leading-none transition-colors duration-200 ease-in-out"
      onClick={skipToContent}
    >
      Skip to content
    </Link>
  );
};
