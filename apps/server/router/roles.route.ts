import { publicProcedure, trpc } from '../lib/trpc.ts';
import {
  ZRoleInsertSchema,
  ZRolePermissionSchema,
  ZRoleSchema,
} from '../schema/roleSchema.ts';

export const roleRouter = trpc.router({
  tenantRoles: publicProcedure.input(ZRoleSchema).query(async (opts) => {
    const { roleHandler } = await import('../handlers/roles/role.handler.ts');
    return roleHandler(opts);
  }),
  createTenantRole: publicProcedure
    .input(ZRoleInsertSchema)
    .mutation(async (opts) => {
      const { createTenantRoleHandler } = await import(
        '../handlers/roles/role.handler.ts'
      );
      return createTenantRoleHandler(opts);
    }),
  updateTenantRole: publicProcedure
    .input(ZRoleInsertSchema)
    .mutation(async (opts) => {
      const { updateTenantRoleHandler } = await import(
        '../handlers/roles/role.handler.ts'
      );
      return updateTenantRoleHandler(opts);
    }),
  rolePermissions: publicProcedure
    .input(ZRolePermissionSchema)
    .query(async (opts) => {
      const { getRolePermissionHandler } = await import(
        '../handlers/roles/role.handler.ts'
      );
      return getRolePermissionHandler(opts);
    }),
});
