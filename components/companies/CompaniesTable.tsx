"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useValidatedParams } from "@/lib/hooks/useValidatedParams";
import {
  useAllCompanies,
  useContracts,
  useBankTransactions,
} from "@/lib/hooks/useSupabaseData";
import {
  CompanyRow,
  RowStatus,
  ICompanyType,
  IContractType,
  IBankTransactionType,
} from "@/Types";
import FormatGel from "@/lib/helperFunctions/formatingGel";
import { STATUS_COLORS } from "@/lib/constants";
import { ColorSelector } from "@/lib/helperFunctions/ColorSelector";
import differencePrefix from "@/lib/helperFunctions/DifferencePrefix";
import CountPageNumbers from "@/lib/helperFunctions/CountPageNumbers";

// ── Skeleton ─────────────────────────────── ??  <<< must check

function SkeletonRow() {
  return (
    <tr className="border-b border-gray-100">
      {[...Array(6)].map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        </td>
      ))}
    </tr>
  );
}

export default function CompaniesTable() {
  const searchParams = useSearchParams();
  const { month: selectedMonth, compPage: currentPage, compPerPage: perPage } = useValidatedParams();
  const router = useRouter();
  const pathname = usePathname();

  const { data: companies, isLoading: loadingCompanies } = useAllCompanies();

  const { data: contracts, isLoading: loadingContracts } =
    useContracts(selectedMonth);
  const { data: transactions, isLoading: loadingTx } =
    useBankTransactions(selectedMonth);

  const isLoading = loadingCompanies || loadingContracts || loadingTx;

  const rows: CompanyRow[] = (companies ?? []).map((c: ICompanyType) => {
    const companyContracts = (contracts ?? []).filter(
      (contract: IContractType) => {
        return contract.company_id === c.id;
      },
    );
    const activeContracts = companyContracts.length;

    if (activeContracts === 0) {
      return {
        id: c.id,
        name: c.name,
        activeContracts: 0,
        expected: 0,
        actual: 0,
        difference: 0,
        status: "არაქტიური" as RowStatus,
      };
    }

    // Step 2: Expected = sum of monthly_amount from overlapping contracts
    const expectedMoney = companyContracts.reduce(
      (sum: number, contract: IContractType) => {
        return sum + Number(contract.monthly_amount ?? 0);
      },
      0,
    );

    const companyTransactions = (transactions ?? []).filter(
      (t: IBankTransactionType) => {
        return t.matched_company_id === c.id && t.status === "matched";
      },
    );
    ///    count transactions of company
    const transactionCount = companyTransactions.length;
    console.log(transactionCount);
    const actual = companyTransactions.reduce(
      (sum: number, t: IBankTransactionType) => sum + Number(t.amount ?? 0),
      0,
    );

    const difference = actual - expectedMoney;

    // status calculator
    const status: RowStatus = difference >= 0 ? "სრულიად გადახდილი" : "ნაკლები";

    return {
      id: c.id,
      name: c.name,
      activeContracts,
      expected: expectedMoney,
      actual,
      difference,
      status,
    };
  });

  // Pagination
  const totalItems = rows.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const safePage = Math.min(currentPage, Math.max(1, totalPages));
  const startIdx = (safePage - 1) * perPage;
  const pageItems = rows.slice(startIdx, startIdx + perPage);

  // Page handler
  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("compPage");
    } else {
      params.set("compPage", String(page));
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("compPerPage", e.target.value);
    params.delete("compPage");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-gray-200 text-gray-500 text-xs font-medium">
            <th className="px-4 pb-2">კომპანია</th>
            <th className="px-4 pb-2">აქტიური კონტრაქტები</th>
            <th className="px-4 pb-2">მოსალოდნელი თანხა</th>
            <th className="px-4 pb-2">ფაქტობრივი გადახდები</th>
            <th className="px-4 pb-2">სხვაობა</th>
            <th className="px-4 pb-2">სტატუსი</th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? [...Array(perPage)].map((_, i) => <SkeletonRow key={i} />)
            : pageItems.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {row.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {row.activeContracts}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {FormatGel(row.expected)}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {FormatGel(row.actual)}
                  </td>
                  <td
                    className={`px-4 py-3 font-semibold ${ColorSelector(row.difference)}`}
                  >
                    {differencePrefix(row.difference)}
                    {FormatGel(row.difference)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[row.status]}`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>

      {!isLoading && pageItems.length === 0 && (
        <p className="text-center text-gray-400 text-sm py-8">
          მონაცემები არ მოიძებნა
        </p>
      )}

      {/* Pagination footer */}
      {!isLoading && totalPages > 0 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <button
              disabled={safePage === 1}
              onClick={() => goToPage(safePage - 1)}
              className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              &lt;
            </button>
            {CountPageNumbers(safePage, totalPages).map((p, idx) =>
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
