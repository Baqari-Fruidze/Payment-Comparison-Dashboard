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