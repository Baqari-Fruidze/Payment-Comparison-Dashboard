import React from "react";

export interface ICompanyType {
  id: string;
  name: string;
  taxId: string;
  created_at: string;
}
export interface IBankTransactionType {
  id: string;
  amount: number;
  currency: string;
  doc_key: string;
  entry_date: string;
  created_at: string;
  updated_at: string;
  sender_name: string;
  sender_account: string;
  sender_inn: string;
  purpose: string;
  status: "matched" | "unmatched" | "ignored";
  matched_company_id: string | null;
  match_method: string | null;
  match_confidence: number | null;
}

export interface IContractType {
  id: string;
  company_id: string;
  monthly_amount: number;
  status: "active" | "paused" | "ended";
  start_date: string;
  end_date: string | null;
  created_at: string;
}

export interface ISingleInfoContainerProps {
  title: string;
  count: number | undefined;
  totalAmount: number | undefined;
  icon: React.ReactNode;
  countColor?: string;
  amountColor?: string;
  rightSlot?: React.ReactNode;
  isLoading?: boolean;
}

export type RowStatus = "სრულიად გადახდილი" | "ნაკლები" | "არაქტიური";

export interface CompanyRow {
  id: string;
  name: string;
  activeContracts: number;
  expected: number;
  actual: number;
  difference: number;
  status: RowStatus;
}

export type SortField = "entry_date" | "amount";
export type SortDir = "asc" | "desc";
