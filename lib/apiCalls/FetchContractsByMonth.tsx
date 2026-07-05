import { supabase } from '@/lib/supabase';
import { getMonthValue } from '@/lib/helperFunctions/GetMonthValue';
import { IContractType } from '@/Types';

// Fetches contracts that were active at any point during the selected month.
// A contract overlaps with month [startDate, endDate] if:
//   start_date <= endDate  AND  (end_date IS NULL OR end_date >= startDate)
export const fetchContractsByMonth = async (selectedMonth: string): Promise<IContractType[]> => {
  const { startDate, endDate } = getMonthValue(selectedMonth);

  // Step 1: all contracts that started before the month ended
  const { data, error } = await supabase
    .from('contracts')
    .select('*')
    .lte('start_date', endDate);

  if (error) throw new Error(error.message);

  // Step 2: keep only those where end_date is null OR end_date >= startDate
  // (doing this client-side avoids complex Supabase .or() IS NULL syntax issues)
  return ((data ?? []) as IContractType[]).filter((c) => {
    return c.end_date === null || c.end_date >= startDate;
  });
};