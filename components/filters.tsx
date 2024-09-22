import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { FilterMonths } from "@/components/filter-months";
import { capitalize } from "lodash";

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
    <section id="filters" className="hidden lg:block py-10 px-16 bg-neutral-50">
      <h2 className="sr-only">Filters</h2>
      <div className="wrapper grid grid-cols-12 text-lg">
        {Boolean(tags.length) && (
          <div className="col-span-7 flex flex-col gap-1">
            <h3 className="sr-only">Tags</h3>
            <ul className="flex flex-wrap gap-3">
              <li>
                <Link
                  href={`?tag=`}
                  className={twMerge(
                    "py-1.5 px-3 rounded-full bg-neutral-200 hover:bg-neutral-300 transition-colors duration-150 ease-in-out",
                    !selectedTag ? "bg-neutral-300" : undefined,
                  )}
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
                      className={twMerge(
                        "py-1.5 px-3 rounded-full bg-neutral-200 hover:bg-neutral-300 transition-colors duration-150 ease-in-out",
                        selectedTag?.includes(tag)
                          ? "bg-neutral-300"
                          : undefined,
                      )}
                    >
                      {capitalize(tag)}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        )}
        <div className="col-start-10 pl-16 border-l border-neutral-200">
          <FilterMonths months={months} selectedMonth={selectedMonth} />
        </div>
      </div>
    </section>
  );
};
