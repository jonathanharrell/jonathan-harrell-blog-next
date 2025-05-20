"use client";

import { ChangeEventHandler } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Link } from "next-view-transitions";
import { capitalize } from "lodash";
import classNames from "classnames";

interface FilterTagsProps {
  tags: string[];
}

export const FilterTags = ({ tags }: FilterTagsProps) => {
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get("tag");

  const router = useRouter();

  // used on mobile only
  const filterByTag: ChangeEventHandler<HTMLSelectElement> = (event) => {
    router.push(`/blog/filtered?tag=${event.target.value}`);
  };

  if (!tags.length) {
    return null;
  }

  return (
    <div className="col-span-12 lg:col-span-8 xl:col-span-7 flex flex-col gap-1">
      <h3 id="tags-label" className="sr-only" aria-hidden="true">
        Tags
      </h3>
      <div className="sm:hidden">
        <p id="months-label" className="sr-only" aria-hidden="true">
          Filter posts by month
        </p>
        <div>
          <select
            value={selectedTag ?? ""}
            onChange={filterByTag}
            className="select appearance-none w-full py-2.5 pl-3 pr-8 rounded-full border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 bg-transparent sm:leading-none transition-colors duration-200 ease-in-out cursor-pointer"
            aria-labelledby="months-label"
          >
            <option value="">All Tags</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ul
        className="hidden sm:flex flex-wrap gap-2"
        aria-labelledby="tags-label"
      >
        <li>
          <Link
            href={`/blog/filtered?tag=`}
            className={classNames(
              "block py-1.5 px-3 rounded-full border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 leading-none text-neutral-500 transition-colors duration-200 ease-in-out",
              !selectedTag
                ? "border-neutral-400 text-neutral-800 dark:text-neutral-100"
                : undefined,
            )}
            aria-label="Show all posts"
          >
            All
          </Link>
        </li>
        {tags
          .filter((tag) => tag !== "jdch")
          .map((tag) => (
            <li key={tag}>
              <Link
                href={`/blog/filtered?tag=${tag}`}
                className={classNames(
                  "block py-1.5 px-3 rounded-full border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 leading-none text-neutral-500 transition-colors duration-200 ease-in-out",
                  selectedTag?.includes(tag)
                    ? "border-neutral-400 text-neutral-800 dark:text-neutral-100"
                    : undefined,
                )}
                aria-label={`Filter posts by ${tag} tag`}
              >
                {capitalize(tag)}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};
