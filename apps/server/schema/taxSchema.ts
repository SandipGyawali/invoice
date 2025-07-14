import { z } from 'zod';

export const ZTaxSchema = z.object({
  name: z.string().trim(),
  rate: z.number(),
  type: z.string(),
  applicableTo: z.array(z.string()),
  tenantId: z.string(),
});

export type TZTaxSchema = z.infer<typeof ZTaxSchema>;
