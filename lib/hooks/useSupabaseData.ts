import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase";

// ─── Query Keys ───────────────────────────────────────────────────────────────
export const QUERY_KEYS = {
  transactions: ["bank_transactions"] as const,
  contracts: ["contracts"] as const,
  companies: ["companies"] as const,
};

// ─── Fetch Hooks ──────────────────────────────────────────────────────────────
export const useBankTransactions = () =>
  useQuery({
    queryKey: QUERY_KEYS.transactions,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bank_transactions")
        .select("*");
      if (error) throw new Error(error.message);
      return data;
    },
  });

export const useContracts = () =>
  useQuery({
    queryKey: QUERY_KEYS.contracts,
    queryFn: async () => {
      const { data, error } = await supabase.from("contracts").select("*");
      if (error) throw new Error(error.message);
      return data;
    },
  });

export const useCompanies = () =>
  useQuery({
    queryKey: QUERY_KEYS.companies,
    queryFn: async () => {
      const { data, error } = await supabase.from("companies").select("*");
      if (error) throw new Error(error.message);
      return data;
    },
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
