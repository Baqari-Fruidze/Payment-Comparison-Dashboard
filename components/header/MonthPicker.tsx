"use client"; 

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"; 

const months = ["2026-04", "2026-05", "2026-06"];
const displayMonths = ["აპრილი 2026", "მაისი 2026", "ივნისი 2026"];

export default function MonthPicker() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

    
  const currentMonth = searchParams.get("month") || months[0];
  const displayedMonth = displayMonths[months.indexOf(currentMonth)];
  const currentMonthIndex = months.indexOf(currentMonth);


  const hasPrevious = currentMonthIndex > 0;
  const hasNext = currentMonthIndex < months.length - 1;

  
  const changeMonth = (newIndex: number) => {
    const newMonth = months[newIndex];
    const params = new URLSearchParams(searchParams.toString());
    console.log(params.toString())
    params.set("month", newMonth); 
    router.push(`${pathname}?${params.toString()}`);  ///     /available months? 
  };

  return (
    <div className="flex items-center justify-between border rounded-md px-4 py-2 w-64 bg-white hover:border-accent">
      <button
        className={hasPrevious ? "visible" : "invisible"}
        onClick={() => changeMonth(currentMonthIndex - 1)}
      >
        <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
      </button>

      <span className="font-semibold text-gray-800">
        {displayedMonth} 
      </span>

      <button
        className={hasNext ? "visible" : "invisible"}
        onClick={() => changeMonth(currentMonthIndex + 1)}
      >
        <ChevronRightIcon className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}