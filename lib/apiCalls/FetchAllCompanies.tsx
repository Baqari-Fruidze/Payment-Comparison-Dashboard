import { supabase } from '@/lib/supabase';

export const fetchAllCompanies = async () => {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .order('name');

  if (error) throw new Error(error.message);
  return data;
};
