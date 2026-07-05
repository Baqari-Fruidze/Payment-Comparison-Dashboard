import { supabase } from '@/lib/supabase';
import { getMonthValue } from '@/lib/helperFunctions/GetMonthValue';
import { IBankTransactionType } from '@/Types';

export const fetchTransactionsByMonth = async (selectedMonth: string): Promise<IBankTransactionType[]> => {
  const { startDate, endDate } = getMonthValue(selectedMonth);

  const { data, error } = await supabase
    .from('bank_transactions')
    .select('*')
    .gte('entry_date', startDate)
    .lte('entry_date', endDate);

  if (error) throw new Error(error.message);
  return data as IBankTransactionType[];
};