"use client";

import Link from "next/link";
import {useState} from "react";

interface FilterMonthsProps {
  months: string[];
}

export const FilterMonths = ({ months }: FilterMonthsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const firstEighteenMonths = months.slice(0, 18);
  const monthsToDisplay = isExpanded ? months : firstEighteenMonths;

  if (!months.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1">
      <h3 className="all-small-caps">Months</h3>
      <ul>
        {monthsToDisplay.map(month => (
          <li key={month}>
            <Link href={`?month=${month}`} className="hover:underline decoration-1 underline-offset-4">
              {month}
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-block underline"
        >
          View {isExpanded ? "less" : "more"}
        </button>
      </div>
    </div>
  );
}