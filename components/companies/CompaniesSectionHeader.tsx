"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

const months: Record<string, string> = {
  "2026-04": "აპრილი",
  "2026-05": "მაისი",
  "2026-06": "ივნისი",
};

export default function CompaniesSectionHeader() {
  const searchParams = useSearchParams();
  const selectedMonth = searchParams.get("month") ?? "2026-06";

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <p className="text-gray-800 font-semibold text-base">
        მოსალოდნელი vs ფაქტობრივი
      </p>
      <p className="text-blue-600 text-sm font-medium">
        (არჩეული თვე: {months[selectedMonth] ?? selectedMonth})
      </p>
    </div>
  );
}
