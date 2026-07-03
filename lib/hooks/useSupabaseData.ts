import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { fetchTransactionsByMonth } from "../apiCalls/FetchTransactionsByMonth";
import { fetchContractsByMonth } from "../apiCalls/FetchContractsByMonth";
import { fetchCompaniesByMonth } from "../apiCalls/FetchCompaniesByMonth";

// ─── Query Key Factory ────────────────────────────────────────────────────────
export const QUERY_KEYS = {
  // 1. Define the "root folders"
  transactions: ["bank_transactions"] as const,
  contracts: ["contracts"] as const,
  companies: ["companies"] as const,
  
  // 2. (Optional but recommended) Define helpers for specific sub-folders
  transactionsByMonth: (month: string) => [...QUERY_KEYS.transactions, month] as const,
  contractsByMonth: (month: string) => [...QUERY_KEYS.contracts, month] as const,
  companiesByMonth: (month: string) => [...QUERY_KEYS.companies, month] as const,
};

// -------------------------------------- HOOKS --------------------------------
export const useBankTransactions = (selectedMonth: string) =>
  useQuery({
    // Using the factory function directly guarantees type safety and consistency
    queryKey: QUERY_KEYS.transactionsByMonth(selectedMonth),
    queryFn: () => fetchTransactionsByMonth(selectedMonth)
  });

export const useContracts = (selectedMonth: string) =>
  useQuery({
    queryKey: QUERY_KEYS.contractsByMonth(selectedMonth),
    queryFn: () => fetchContractsByMonth(selectedMonth)
  });

export const useCompanies = (selectedMonth: string) =>
  useQuery({
    queryKey: QUERY_KEYS.companiesByMonth(selectedMonth),
    queryFn: () => fetchCompaniesByMonth(selectedMonth)
  });

// ─── Auto-Matching Mutation ───────────────────────────────────────────────────
// Runs the RPC, then immediately re-fetches transactions, contracts & companies
export const useAutoMatching = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.rpc("execute_auto_matching");
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      // Invalidate all three — React Query will re-fetch them automatically
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.transactions });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.contracts });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.companies });
    },
  });
};
