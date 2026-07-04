import React from "react";
import { useSearchParams } from "next/navigation";

export default function CompaniesSectionHeader() {
  const searchParams = useSearchParams();
  const selectedMonth = searchParams.get("month") ?? "2026-04";
  return (
    <div className="flex items-center gap-2">
      <p className="text-gray-700">მოსალოდნელი vs ფაქტობრივი</p>
      <p className="text-blue-600 font-semibold">({selectedMonth})</p>
    </div>
  );
}
