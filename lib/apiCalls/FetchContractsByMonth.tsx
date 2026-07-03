import { supabase } from '@/lib/supabase';
import { getMonthValue } from '@/lib/helperFunctions/GetMonthValue';

export const fetchContractsByMonth = async (selectedMonth: string) => {
  const { startDate, endDate } = getMonthValue(selectedMonth);

  const { data, error } = await supabase
    .from('contracts')
    .select('*')
    .gte('start_date', startDate)
    .lte('start_date', endDate);

  if (error) throw new Error(error.message);
  return data;
};