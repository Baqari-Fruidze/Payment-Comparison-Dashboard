import { supabase } from '@/lib/supabase';
import { ICompanyType } from '@/Types';

export const fetchAllCompanies = async (): Promise<ICompanyType[]> => {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .order('name');

  if (error) throw new Error(error.message);
  return data as ICompanyType[];
};
