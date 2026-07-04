"use client";
import { useSearchParams } from "next/navigation";
import { useBankTransactions } from "@/lib/hooks/useSupabaseData";
import SingleInfoContainer from "./SingleInfoContainer";
import {
  ClipboardList,
  CheckCircle2,
  XCircle,
  MinusCircle,
} from "lucide-react";
import DonutChart from "@/lib/helperFunctions/DonutChart";

// ─── Icon Badges ────────────────────────────────────────────────────────────── ?????

function IconBadge({
  children,
  bg,
}: {
  children: React.ReactNode;
  bg: string;
}) {
  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center ${bg}`}
    >
      {children}
    </div>
  );
}

export default function MainInfoPanel() {
  const searchParams = useSearchParams();
  const selectedMonth = searchParams.get("month") ?? "2026-06";

  const { data: transactions, isLoading } = useBankTransactions(selectedMonth);
  console.log(transactions);
  const total = transactions?.length;

  const matched = transactions?.filter(
    (item) => item.status === "matched",
  ).length;
  const matchedAmount = transactions
    ?.filter((item) => item.status === "matched")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const unmatched = transactions?.filter(
    (item) => item.status === "unmatched",
  ).length;
  const unmatchedAmount = transactions
    ?.filter((item) => item.status === "unmatched")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const ignored = transactions?.filter((t) => t.status === "ignored").length;
  const ignoredAmount = transactions
    ?.filter((t) => t.status === "ignored")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalAmount = transactions?.reduce(
    (sum, t) => sum + Number(t.amount),
    0,
  );

  return (
    <div className="flex items-stretch gap-3  w-full">
      {/* totali */}
      <SingleInfoContainer
        title="ტრანზაქციების რაოდენობა"
        count={total}
        totalAmount={totalAmount}
        isLoading={isLoading}
        countColor="text-gray-900"
        amountColor="text-gray-500"
        icon={
          <IconBadge bg="bg-blue-100">
            <ClipboardList className="w-4 h-4 text-blue-600" />
          </IconBadge>
        }
      />

      {/* damtxveuli */}
      <SingleInfoContainer
        title="დამთხვეული"
        count={matched}
        totalAmount={matchedAmount}
        isLoading={isLoading}
        countColor="text-green-600"
        amountColor="text-green-600"
        icon={
          <IconBadge bg="bg-green-100">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
          </IconBadge>
        }
      />

      {/* sheusabamo */}
      <SingleInfoContainer
        title="შეუსაბამო"
        count={unmatched}
        totalAmount={unmatchedAmount}
        isLoading={isLoading}
        countColor="text-red-600"
        amountColor="text-red-600"
        icon={
          <IconBadge bg="bg-red-100">
            <XCircle className="w-4 h-4 text-red-600" />
          </IconBadge>
        }
      />

      {/* ignorirebuli */}
      <SingleInfoContainer
        title="იგნორირებული"
        count={ignored}
        totalAmount={ignoredAmount}
        isLoading={isLoading}
        countColor="text-gray-500"
        amountColor="text-gray-400"
        icon={
          <IconBadge bg="bg-gray-100">
            <MinusCircle className="w-4 h-4 text-gray-500" />
          </IconBadge>
        }
      />

      {/* charti */}
      <DonutChart matched={matched} total={total} isLoading={isLoading} />
    </div>
  );
}
