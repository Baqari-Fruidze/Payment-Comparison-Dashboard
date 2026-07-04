import React from "react";

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
