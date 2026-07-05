import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { fetchTransactionsByMonth } from "../apiCalls/FetchTransactionsByMonth";
import { fetchContractsByMonth } from "../apiCalls/FetchContractsByMonth";
import { fetchCompaniesByMonth } from "../apiCalls/FetchCompaniesByMonth";
import { fetchAllCompanies } from "../apiCalls/FetchAllCompanies";
import { QUERY_KEYS } from "../constants";

// -------------------------------------- HOOKS --------------------------------
export const useAllCompanies = () =>
  useQuery({
    queryKey: ["all_companies"],
    queryFn: fetchAllCompanies,
  });

export const useBankTransactions = (selectedMonth: string) =>
  useQuery({
    queryKey: QUERY_KEYS.transactionsByMonth(selectedMonth),
    queryFn: () => fetchTransactionsByMonth(selectedMonth),
  });

export const useContracts = (selectedMonth: string) =>
  useQuery({
    queryKey: QUERY_KEYS.contractsByMonth(selectedMonth),
    queryFn: () => fetchContractsByMonth(selectedMonth),
  });

export const useCompanies = (selectedMonth: string) =>
  useQuery({
    queryKey: QUERY_KEYS.companiesByMonth(selectedMonth),
    queryFn: () => fetchCompaniesByMonth(selectedMonth),
  });

// supabase calls ───────────────────────────────────────────────────

export const useAutoMatching = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.rpc("execute_auto_matching");
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      // check if data is renewed first ???
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.transactions });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.contracts });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.companies });
    },
  });
};

export const useDisableMatching = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("bank_transactions")
        .update({
          status: "unmatched",
          matched_company_id: null,
          match_method: null,
          match_confidence: null,
        })
        .neq("status", "unmatched");

      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.transactions });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.contracts });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.companies });
    },
  });
};
