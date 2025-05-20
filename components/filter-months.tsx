"use client";

import { ChangeEventHandler } from "react";
import { useRouter } from "next/navigation";

interface FilterMonthsProps {
  months: string[];
  selectedMonth?: string;
}

export const FilterMonths = ({
  months,
  selectedMonth = "",
}: FilterMonthsProps) => {
  const router = useRouter();

  const filterByMonth: ChangeEventHandler<HTMLSelectElement> = (event) => {
    router.push(`/blog/filtered?month=${event.target.value}`);
  };

  if (!months.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1">
      <h3 className="sr-only">Months</h3>
      <p id="months-label" className="sr-only" aria-hidden="true">
        Filter posts by month
      </p>
      <div>
        <select
          value={selectedMonth}
          onChange={filterByMonth}
          className="select appearance-none w-full sm:w-auto py-2.5 sm:py-1.5 pl-3 pr-8 rounded-full border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 bg-transparent leading-none transition-colors duration-200 ease-in-out cursor-pointer"
          aria-labelledby="months-label"
        >
          <option value="">All Time</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
