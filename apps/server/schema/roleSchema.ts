import { z } from 'zod';

export const ZRoleSchema = z.object({
  tenantId: z.string(),
});

export const ZRoleInsertSchema = z.object({
  tenantId: z.string().trim().nonempty(),
  name: z
    .string()
    .nonempty()
    .min(3, { message: 'Should be minimum 3 characters' })
    .max(12, { message: 'Cannot be more than 12 characters' }),
});

export type TZRoleSchema = z.infer<typeof ZRoleSchema>;
export type TZRoleInsertSchema = z.infer<typeof ZRoleInsertSchema>;
