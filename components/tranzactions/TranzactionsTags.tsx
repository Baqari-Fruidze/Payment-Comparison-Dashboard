"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { transactionStatus, TAG_COLORS } from "@/lib/constants";
import { useBankTransactions } from "@/lib/hooks/useSupabaseData";
import { IBankTransactionType } from "@/Types";
import SingleTagContainer from "./SingleTagContainer";
import { Search, SlidersHorizontal } from "lucide-react";

export default function TranzactionsTags() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const selectedMonth = searchParams.get("month") ?? "2026-06";
  const activeFilter = searchParams.get("txFilter") ?? "ყველა";
  const searchQuery = searchParams.get("txSearch") ?? "";

  const { data: transactions } = useBankTransactions(selectedMonth);

  // Count transactions per status
  const counts: Record<string, number> = {
    ყველა: transactions?.length ?? 0,
    დამთხვეული: (transactions ?? []).filter(
      (t: IBankTransactionType) => t.status === "matched",
    ).length,
    შეუსაბამო: (transactions ?? []).filter(
      (t: IBankTransactionType) => t.status === "unmatched",
    ).length,
    იგნორირებული: (transactions ?? []).filter(
      (t: IBankTransactionType) => t.status === "ignored",
    ).length,
  };

  const handleFilterClick = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (key === "ყველა") {
      params.delete("txFilter");
    } else {
      params.set("txFilter", key);
    }
    params.delete("txPage"); // Reset pagination on filter change
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    const value = e.target.value;
    if (value) {
      params.set("txSearch", value);
    } else {
      params.delete("txSearch");
    }
    params.delete("txPage"); // Reset pagination on search
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      {/* Left side: filter tags */}
      <div className="flex items-center gap-2">
        {Object.keys(transactionStatus).map((key) => (
          <button
            key={key}
            onClick={() => handleFilterClick(key)}
            className="cursor-pointer"
          >
            <SingleTagContainer
              text={key}
              isSelected={
                activeFilter === key ||
                (key === "ყველა" && !searchParams.has("txFilter"))
              }
              color={TAG_COLORS[key]}
              trazactionCount={counts[key] ?? 0}
            />
          </button>
        ))}
      </div>

      {/* input container */}
      <div className="flex items-center gap-2 mr-16 w-[345px]">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="ძებნა (სახელი, ს/კ, დანიშნულება...)"
            className="pl-9 pr-3 w-full py-1.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300  transition-all"
          />
        </div>
      </div>
    </div>
  );
}
