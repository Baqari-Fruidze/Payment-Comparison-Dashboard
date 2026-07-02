"use client"
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
      .select("*")
      
    if (error) console.error(error);
    console.log(data);
    return data;
  };

  return (
    <div className="text-3xl font-bold text-red-500 flex gap-4 flex-col justify-center items-center h-screen">
      <button onClick={fetchCompanies}>fetchCompanies</button>
      <button onClick={fetchContracts}>fetchContracts</button>
      <button onClick={fetchBankTransactions}>fetchBankTransactions</button>
    </div>
  );
}
