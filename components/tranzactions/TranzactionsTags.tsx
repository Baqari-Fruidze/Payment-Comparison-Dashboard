"use client";
import { useSearchParams } from "next/navigation";
import { transactionStatus } from "@/lib/constants";

export default function TranzactionsTags() {
  const searchParams = useSearchParams();
  const selectedMonth = searchParams.get("month") ?? "2026-06";

  return <div className="flex justify-between"></div>;
}
