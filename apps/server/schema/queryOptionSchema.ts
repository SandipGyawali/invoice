import * as z from 'zod';

export const zQueryOptionSchema = z.object({
  id: z.number().optional().nullable(),
  page: z.number(),
  pageSize: z.number(),
  search: z.string().trim(),
  status: z.enum(['0', '1']).optional().nullable(),
});

export type TZQueryOptionSchema = z.infer<typeof zQueryOptionSchema>;
