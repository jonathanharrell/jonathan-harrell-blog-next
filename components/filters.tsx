import { FilterTags } from "@/components/filter-tags";
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
    <section id="filters" className="sm:mt-8">
      <h2 className="sr-only">Filters</h2>
      <div className="grid grid-cols-12 gap-4 sm:gap-8 lg:gap-0 py-8 md:text-lg border-y border-neutral-200 dark:border-neutral-700">
        {Boolean(tags.length) && (
          <FilterTags tags={tags} selectedTag={selectedTag} />
        )}
        <div className="col-span-12 lg:col-start-10 lg:pl-16 lg:border-l lg:border-neutral-200 dark:lg:border-neutral-700">
          <FilterMonths months={months} selectedMonth={selectedMonth} />
        </div>
      </div>
    </section>
  );
};
