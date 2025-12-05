"use client";

import Image from "next/image";
import Link from "next/link";
import { algoliasearch } from "algoliasearch";
import {
  Snippet,
  useInfiniteHits,
  UseInfiniteHitsProps,
  useRefinementList,
  UseRefinementListProps,
  useSearchBox,
  UseSearchBoxProps,
} from "react-instantsearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import { useRef } from "react";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!,
);

export const Search = () => {
  return (
    <search>
      <InstantSearchNext
        searchClient={searchClient}
        indexName="posts_index"
        future={{
          preserveSharedStateOnUnmount: false,
        }}
      >
        <div className="grid grid-cols-12 gap-y-12 md:gap-y-6 md:gap-x-8">
          <div className="col-start-1 col-end-13 md:col-start-4 lg:col-end-11 md:row-start-1 flex flex-col gap-4">
            <header>
              <h1 className="text-3xl font-normal small-caps">Search</h1>
            </header>
            <CustomSearchBox />
            <CustomInfiniteHits />
          </div>
          <div className="col-start-1 col-end-12 md:col-end-3 md:row-start-1">
            <CustomRefinementList attribute="tags" sortBy={["name"]} />
          </div>
        </div>
      </InstantSearchNext>
    </search>
  );
};

const CustomSearchBox = (props: UseSearchBoxProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { query, refine, clear } = useSearchBox(props);

  const handleClear = () => {
    clear();
    searchInputRef.current?.focus();
  };

  return (
    <div className="relative">
      <label htmlFor="search" className="sr-only">
        Search posts
      </label>
      <input
        type="text"
        name="search"
        placeholder="Search posts"
        value={query}
        autoFocus={true}
        autoComplete="off"
        onChange={(event) => refine(event.target.value)}
        ref={searchInputRef}
        className="block w-full py-1.5 px-3 border border-neutral-800 text-lg placeholder:text-neutral-500"
      />
      {query.length > 0 && (
        <button
          onClick={handleClear}
          className="flex items-center absolute top-1/2 right-3 z-10 text-2xl -translate-y-1/2"
        >
          <span aria-hidden="true">×</span>
          <span className="sr-only">Clear search</span>
        </button>
      )}
    </div>
  );
};

function CustomRefinementList(props: UseRefinementListProps) {
  const { items, refine } = useRefinementList(props);

  const filteredItems = items.filter((item) => item.value !== "jdch");

  return (
    <section className="text-lg">
      <h2 className="text-xl small-caps">Tags</h2>
      <ul className="flex flex-wrap md:flex-col gap-y-1 md:gap-y-0 gap-x-4 md:gap-x-0">
        {filteredItems.map((item) => (
          <li key={item.label}>
            <label className="group flex items-center gap-1.5 flex-1 cursor-pointer">
              <input
                type="checkbox"
                checked={item.isRefined}
                className="sr-only"
                onChange={() => refine(item.value)}
              />
              <span
                className="inline-block relative w-3.5 h-3.5 border border-neutral-800 bg-transparent group-has-[:checked]:bg-neutral-800 transition-colors duration-200 ease-in-out before:hidden group-has-[:checked]:before:block before:absolute before:top-1/2 before:left-1/2 before:text-[11px] before:text-white before:-translate-y-1/2 before:-translate-x-1/2 before:content-['✔︎']"
                aria-hidden="true"
              />
              <span className="truncate select-none">{item.label}</span>
            </label>
          </li>
        ))}
      </ul>
      {!filteredItems.length && <output className="sr-only">No tags</output>}
    </section>
  );
}

const CustomInfiniteHits = (props: UseInfiniteHitsProps) => {
  const { items, isLastPage, showMore } = useInfiniteHits(props);

  return (
    <section>
      {items.length > 0 ? (
        <div className="flex flex-col items-start gap-6">
          <ul className="flex flex-col">
            {items.map((item) => {
              const formattedDate = new Date(item.date).toLocaleDateString(
                "en-US",
                {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                },
              );

              return (
                <li key={item.objectID}>
                  <article className="flex items-center gap-4 py-6 border-b border-neutral-200 border-dashed">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-xl small-caps">
                        <Link
                          href={`/blog/${item.objectID}`}
                          className="hover:underline hover:decoration-1 underline-offset-4"
                        >
                          {formattedDate}
                        </Link>
                      </h3>
                      <div className="jh-prose">
                        <p className="mt-0">
                          <Snippet attribute="content" hit={item} />
                        </p>
                      </div>
                    </div>
                    {item.imageUrls[0] && (
                      <Link
                        href={`/blog/${item.objectID}`}
                        className="flex-shrink-0"
                        aria-hidden="true"
                      >
                        <Image
                          src={item.imageUrls[0]}
                          alt=""
                          aria-hidden="true"
                          width={100}
                          height={100}
                          className="w-[100px] aspect-square object-cover"
                        />
                      </Link>
                    )}
                  </article>
                </li>
              );
            })}
          </ul>
          {!isLastPage && (
            <button
              onClick={showMore}
              className="text-lg underline hover:no-underline decoration-1 underline-offset-2"
            >
              Load more
            </button>
          )}
        </div>
      ) : (
        <output className="py-6">
          <p className="text-lg lg:text-xl">No results</p>
        </output>
      )}
    </section>
  );
};
