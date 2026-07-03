"use client"
import MainDashboard from "@/components/dashboard/MainDashboard";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const fetchCompanies = async () => {
    const { data, error } = await supabase.from("companies").select("*");
    if (error) console.error(error);
    console.log(data);
    return data;
  };
  const fetchContracts = async () => {
    const { data, error } = await supabase.from("contracts").select("*");
    if (error) console.error(error);
    console.log(data);
    return data;
  };
  const fetchBankTransactions = async () => {
    const { data, error } = await supabase
      .from("bank_transactions")
      .select("*").throwOnError()
      
   console.table(data?.map(t => ({ id: t.id, status: t.status, matched_company_id: t.matched_company_id })));
  return data;
  };

  return (
<>
<MainDashboard/>
<>
<button onClick={fetchContracts}>contracts</button>
<button onClick={fetchBankTransactions}>bank_transactions</button></>
</>
  );
}
