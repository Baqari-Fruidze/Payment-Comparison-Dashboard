import { z } from "zod";

export const searchParamsSchema = z.object({
  // Global valid
  month: z
    .string()
    .regex(/^\d{4}-\d{2}$/)
    .catch("2026-06"),

  // Transaction params
  txPage: z.coerce.number().int().positive().catch(1),
  txPerPage: z.coerce.number().int().positive().catch(10),
  txSort: z.enum(["entry_date", "amount"]).catch("entry_date"),
  txDir: z.enum(["asc", "desc"]).catch("asc"),
  txFilter: z
    .enum(["ყველა", "დამთხვეული", "შეუსაბამო", "იგნორირებული"])
    .catch("ყველა"),
  txSearch: z.string().catch(""),

  // Company params
  compPage: z.coerce.number().int().positive().catch(1),
  compPerPage: z.coerce.number().int().positive().catch(10),
});

export type SearchParamsState = z.infer<typeof searchParamsSchema>;
