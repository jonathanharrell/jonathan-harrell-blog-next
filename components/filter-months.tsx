"use client";

import {useRouter} from "next/navigation";
import {ChangeEventHandler} from "react";

interface FilterMonthsProps {
  months: string[];
  selectedMonth?: string;
}

export const FilterMonths = ({ months, selectedMonth = "" }: FilterMonthsProps) => {
  const router = useRouter();

  const filterByMonth: ChangeEventHandler<HTMLSelectElement> = (event) => {
    router.replace(`?month=${event.target.value}`);
  }

  if (!months.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1">
      <h3 className="sr-only">Months</h3>
      <div>
        <select
          value={selectedMonth}
          onChange={filterByMonth}
          className="appearance-none py-1.5 px-3 rounded-full bg-neutral-200 hover:bg-neutral-300 leading-none transition-colors duration-150 ease-in-out cursor-pointer"
        >
          <option value="">All Time</option>
          {months.map(month => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}