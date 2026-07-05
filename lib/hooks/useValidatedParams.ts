import { useSearchParams } from "next/navigation";
import { searchParamsSchema, SearchParamsState } from "../validations/searchParams";

export function useValidatedParams(): SearchParamsState {
  const searchParams = useSearchParams();
  
  const paramsObj: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    paramsObj[key] = value;
  });

  return searchParamsSchema.parse(paramsObj);
}
