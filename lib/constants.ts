import { RowStatus } from "@/Types";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Building2,
  FileText,
  BarChart2,
  Settings,
} from "lucide-react";
export const QUERY_KEYS = {
  transactions: ["bank_transactions"] as const,
  contracts: ["contracts"] as const,
  companies: ["companies"] as const,

  //  settin dinamyc values
  transactionsByMonth: (month: string) =>
    [...QUERY_KEYS.transactions, month] as const,
  contractsByMonth: (month: string) =>
    [...QUERY_KEYS.contracts, month] as const,
  companiesByMonth: (month: string) =>
    [...QUERY_KEYS.companies, month] as const,
};

export const navigationData = [{ label: "დეშბორდი", icon: LayoutDashboard }];

export const STATUS_COLORS: Record<RowStatus, string> = {
  "სრულიად გადახდილი": "bg-green-50 text-green-700 border border-green-200",
  ნაკლები: "bg-red-50 text-red-600 border border-red-200",
  არაქტიური: "bg-gray-100 text-gray-500 border border-gray-200",
};

export const transactionStatus = {
  ყველა: "bg-gray-100 text-gray-500 border border-gray-200",
  დამთხვეული: "bg-green-50 text-green-700 border border-green-200",
  შეუსაბამო: "bg-red-50 text-red-600 border border-red-200",
  იგნორირებული: "bg-gray-100 text-gray-500 border border-gray-200",
};

export const TAG_COLORS: Record<string, string> = {
  ყველა: "#6b7280",
  დამთხვეული: "#16a34a",
  შეუსაბამო: "#dc2626",
  იგნორირებული: "#6b7280",
};
