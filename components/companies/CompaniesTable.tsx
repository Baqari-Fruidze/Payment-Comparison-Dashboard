"use client";
import { useSearchParams } from "next/navigation";
import {
  useAllCompanies,
  useContracts,
  useBankTransactions,
} from "@/lib/hooks/useSupabaseData";
import { CompanyRow, RowStatus } from "@/Types";
import FormatGel from "@/lib/helperFunctions/formatingGel";
import { STATUS_COLORS } from "@/lib/constants";
import { ColorSelector } from "@/lib/helperFunctions/ColorSelector";
import differencePrefix from "@/lib/helperFunctions/DifferencePrefix";

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
  const selectedMonth = searchParams.get("month") ?? "2026-06";

  const { data: companies, isLoading: loadingCompanies } = useAllCompanies();
  const { data: contracts, isLoading: loadingContracts } =
    useContracts(selectedMonth);
  const { data: transactions, isLoading: loadingTx } =
    useBankTransactions(selectedMonth);

  const isLoading = loadingCompanies || loadingContracts || loadingTx;

  const rows: CompanyRow[] = (companies ?? []).map((company) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const c = company as any;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const companyContracts = (contracts ?? []).filter((ct: any) => {
      return ct.company_id === c.id;
    });
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const expectedMoney = companyContracts.reduce((sum: number, ct: any) => {
      return sum + Number(ct.monthly_amount ?? 0);
    }, 0);

    // Step 3: Check in transactions if money was transferred
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const companyTransactions = (transactions ?? []).filter((t: any) => {
      return t.matched_company_id === c.id && t.status === "matched";
    });

    const actual = companyTransactions.reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (sum: number, t: any) => sum + Number(t.amount ?? 0),
      0,
    );

    const difference = actual - expectedMoney;

    // Step 4: Is actual equal to, more, or less than expected?
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
            ? [...Array(6)].map((_, i) => <SkeletonRow key={i} />)
            : rows.map((row) => (
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

      {!isLoading && rows.length === 0 && (
        <p className="text-center text-gray-400 text-sm py-8">
          მონაცემები არ მოიძებნა
        </p>
      )}
    </div>
  );
}
