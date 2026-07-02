import { supabase } from "../supabase";

export const SupabaseRpc = async () => {
  const { error } = await supabase.rpc("execute_auto_matching");
  if (error) throw new Error(error.message);

};