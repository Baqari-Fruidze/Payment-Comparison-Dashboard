"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  useBankTransactions,
  useAllCompanies,
} from "@/lib/hooks/useSupabaseData";
import { IBankTransactionType, ICompanyType } from "@/Types";
import FormatGel from "@/lib/helperFunctions/formatingGel";

import StatusBadge from "@/lib/helperFunctions/StatusBadge";
import SortableHeader from "./SortableHeader";
import { SortField, SortDir } from "@/Types";

// skel
function SkeletonRow() {
  return (
    <tr className="border-b border-gray-100">
      {[...Array(7)].map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        </td>
      ))}
    </tr>
  );
}

export default function TranzactionsTable() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const selectedMonth = searchParams.get("month") ?? "2026-06";
  const activeFilter = searchParams.get("txFilter") ?? "ყველა";
  const searchQuery = searchParams.get("txSearch") ?? "";
  const currentPage = Number(searchParams.get("txPage") ?? "1");
  const sortField = (searchParams.get("txSort") as SortField) ?? "entry_date";
  const sortDir = (searchParams.get("txDir") as SortDir) ?? "asc";
  const perPage = Number(searchParams.get("txPerPage") ?? "10");

  const { data: transactions, isLoading: loadingTx } =
    useBankTransactions(selectedMonth);
  const { data: companies, isLoading: loadingCompanies } = useAllCompanies();

  const isLoading = loadingTx || loadingCompanies;

  // company skell
  const companyMap = new Map<string, string>();
  (companies ?? []).forEach((c: ICompanyType) => {
    companyMap.set(c.id, c.name);
  });

  // Filter by status
  const STATUS_DB_MAP: Record<string, string | null> = {
    ყველა: null,
    დამთხვეული: "matched",
    შეუსაბამო: "unmatched",
    იგნორირებული: "ignored",
  };

  let filtered = (transactions ?? []).filter((t: IBankTransactionType) => {
    const dbStatus = STATUS_DB_MAP[activeFilter];
    if (dbStatus && t.status !== dbStatus) return false;
    return true;
  });

  // Search filter data
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter((t: IBankTransactionType) => {
      const senderName = (t.sender_name ?? "").toLowerCase();
      const senderInn = (t.sender_inn ?? "").toLowerCase();
      const purpose = (t.purpose ?? "").toLowerCase();
      const matchedCompanyName = t.matched_company_id
        ? (companyMap.get(t.matched_company_id) ?? "").toLowerCase()
        : "";
      return (
        senderName.includes(query) ||
        senderInn.includes(query) ||
        purpose.includes(query) ||
        matchedCompanyName.includes(query)
      );
    });
  }

  // Sort
  filtered.sort((a: IBankTransactionType, b: IBankTransactionType) => {
    let cmp = 0;
    if (sortField === "entry_date") {
      cmp = new Date(a.entry_date).getTime() - new Date(b.entry_date).getTime();
    } else if (sortField === "amount") {
      cmp = Number(a.amount) - Number(b.amount);
    }
    return sortDir === "desc" ? -cmp : cmp;
  });

  // Pagination
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * perPage;
  const pageItems = filtered.slice(startIdx, startIdx + perPage);

  // Sort handler
  const handleSort = (field: SortField) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sortField === field) {
      params.set("txDir", sortDir === "asc" ? "desc" : "asc");
    } else {
      params.set("txSort", field);
      params.set("txDir", "asc");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Page handler
  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("txPage");
    } else {
      params.set("txPage", String(page));
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("txPerPage", e.target.value);
    params.delete("txPage");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500 text-xs font-medium">
              <SortableHeader
                label="თარიღი"
                field="entry_date"
                currentSort={sortField}
                currentDir={sortDir}
                onSort={handleSort}
              />
              <th className="px-4 pb-2">გამგზავნი</th>
              <th className="px-4 pb-2">ს/კ</th>
              <SortableHeader
                label="თანხა"
                field="amount"
                currentSort={sortField}
                currentDir={sortDir}
                onSort={handleSort}
              />
              <th className="px-4 pb-2">სტატუსი</th>
              <th className="px-4 pb-2">შესაბამისი კომპანია</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? [...Array(perPage)].map((_, i) => <SkeletonRow key={i} />)
              : pageItems.map((t: IBankTransactionType) => (
                  <tr
                    key={t.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {formatDate(t.entry_date)}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800 max-w-[200px] truncate">
                      {t.sender_name}
                    </td>
                    <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                      {t.sender_inn}
                    </td>
                    <td className="px-4 py-3 text-gray-700 font-medium whitespace-nowrap">
                      {FormatGel(Number(t.amount))}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={t.status} />
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {t.matched_company_id
                        ? (companyMap.get(t.matched_company_id) ?? "—")
                        : "—"}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {!isLoading && pageItems.length === 0 && (
        <p className="text-center text-gray-400 text-sm py-8">
          ტრანზაქციები ვერ მოიძებნა
        </p>
      )}

      {/* Pagination footer */}
      {!isLoading && totalPages > 0 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          {/* Page navigation */}
          <div className="flex items-center gap-1">
            <button
              disabled={safePage === 1}
              onClick={() => goToPage(safePage - 1)}
              className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              &lt;
            </button>
            {generatePageNumbers(safePage, totalPages).map((p, idx) =>
              p === "..." ? (
                <span
                  key={`dot-${idx}`}
                  className="px-1.5 text-gray-400 text-sm"
                >
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => goToPage(p as number)}
                  className={`w-8 h-8 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    safePage === p
                      ? "bg-blue-50 text-blue-600 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {p}
                </button>
              ),
            )}
            <button
              disabled={safePage === totalPages}
              onClick={() => goToPage(safePage + 1)}
              className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              &gt;
            </button>
          </div>

          {/* Per page selector */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <select
              value={perPage}
              onChange={handlePerPageChange}
              className="border border-gray-200 rounded-md px-2 py-1 text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="5">5 / გვერდზე</option>
              <option value="10">10 / გვერდზე</option>
              <option value="20">20 / გვერდზე</option>
              <option value="50">50 / გვერდზე</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ka-GE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function generatePageNumbers(
  current: number,
  total: number,
): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [1];

  if (current > 3) {
    pages.push("...");
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push("...");
  }

  if (total > 1) {
    pages.push(total);
  }

  return pages;
}
