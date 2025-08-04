import { z } from 'zod';

export const ZRoleSchema = z.object({
  tenantId: z.string(),
  roleId: z.number().optional(),
});

export const ZRoleInsertSchema = z.object({
  id: z.number().nonnegative(),
  tenantId: z.string().trim().nonempty(),
  name: z
    .string()
    .nonempty()
    .min(3, { message: 'Should be minimum 3 characters' })
    .max(12, { message: 'Cannot be more than 12 characters' }),
});

export type TZRoleSchema = z.infer<typeof ZRoleSchema>;
export type TZRoleInsertSchema = z.infer<typeof ZRoleInsertSchema>;

export const ZRolePermissionSchema = z.object({
  roleId: z.number().optional(),
  tenantId: z.string(),
});

export const ZAssignPermissionOnTenantRoleSchema = z.object({
  roleId: z.number(),
  permissions: z.array(z.number()),
});
export type TZAssignPermissionOnTenantRoleSchema = z.infer<
  typeof ZAssignPermissionOnTenantRoleSchema
>;
