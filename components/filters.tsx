import { Link } from "next-view-transitions";
import { capitalize } from "lodash";
import classNames from "classnames";
import { FilterMonths } from "@/components/filter-months";

interface FiltersProps {
  tags: string[];
  months: string[];
  selectedTag?: string;
  selectedMonth?: string;
}

export const Filters = ({
  tags,
  months,
  selectedTag,
  selectedMonth,
}: FiltersProps) => {
  return (
    <section id="filters" className="hidden sm:block mt-8">
      <h2 className="sr-only">Filters</h2>
      <div className="grid grid-cols-12 gap-8 lg:gap-0 py-8 md:text-lg border-y border-neutral-200 dark:border-neutral-700">
        {Boolean(tags.length) && (
          <div className="col-span-12 lg:col-span-8 xl:col-span-7 flex flex-col gap-1">
            <h3 id="tags-label" className="sr-only" aria-hidden="true">
              Tags
            </h3>
            <ul className="flex flex-wrap gap-2" aria-labelledby="tags-label">
              <li>
                <Link
                  href={`?tag=`}
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
                      href={`?tag=${tag}`}
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
        )}
        <div className="col-span-12 lg:col-start-10 lg:pl-16 lg:border-l lg:border-neutral-200 dark:lg:border-neutral-700">
          <FilterMonths months={months} selectedMonth={selectedMonth} />
        </div>
      </div>
    </section>
  );
};
