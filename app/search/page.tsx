import React from "react";
import type { Metadata } from "next";
import { Search } from "@/components/search";

export const metadata: Metadata = {
  title: "Search | Human in the Loop",
  description: "Search Jonathan Harrell’s commonplace book",
  openGraph: {
    images: ["/assets/seo/og.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org/",
  "@type": "WebPage",
  name: "Search Human in the Loop",
  description: "Search Jonathan Harrell’s commonplace book",
  author: {
    "@type": "Person",
    name: "Jonathan Harrell",
    url: "https://www.jonathanharrell.com",
  },
};

const SearchPage = async () => {
  return (
    <div className="wrapper py-8 sm:py-10 md:py-14">
      <Search />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
};

export default SearchPage;
