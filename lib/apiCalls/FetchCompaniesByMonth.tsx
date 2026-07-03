import { supabase } from '@/lib/supabase';
import { getMonthValue } from '@/lib/helperFunctions/GetMonthValue';

export const fetchCompaniesByMonth = async (selectedMonth: string) => {
  const { startDate, endDate } = getMonthValue(selectedMonth);

  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .gte('created_at', startDate)
    .lte('created_at', endDate);

  if (error) throw new Error(error.message);
  return data;
};