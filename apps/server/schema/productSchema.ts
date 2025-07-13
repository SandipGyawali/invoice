import { z } from 'zod';

const tenant = z.string().trim().nonempty();

export const ZProductUnitSchema = z.object({
  tenantId: tenant,
  name: z.string().trim(),
  namePlural: z.string().optional(),
});

export type TZProductUnitSchema = z.infer<typeof ZProductUnitSchema>;

export const ZProductCategorySchema = z.object({
  tenantId: tenant,
  catName: z.string().trim().nonempty(),
});

export type TZProductCategorySchema = z.infer<typeof ZProductCategorySchema>;

export const ZUpdateProductCategorySchema = z.object({
  id: z.number(),
  catName: z.string().trim().nonempty(),
  tenantId: tenant,
  status: z.string(),
  statusFTR: z.string(),
});

export type TZUpdateProductCategoryInterface = z.infer<
  typeof ZUpdateProductCategorySchema
>;
