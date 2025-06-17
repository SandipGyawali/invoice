import { z } from 'zod';

export const ZRoleSchema = z.object({
  tenantId: z.string(),
});

export type TZRoleSchema = z.infer<typeof ZRoleSchema>;
