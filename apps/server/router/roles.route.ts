import { z } from 'zod';
import { privateProcedure, publicProcedure, trpc } from '../lib/trpc.ts';
import {
  ZAssignPermissionOnTenantRoleSchema,
  ZRoleInsertSchema,
  ZRolePermissionSchema,
  ZRoleSchema,
} from '../schema/roleSchema.ts';
import { zQueryOptionSchema } from '../schema/queryOptionSchema.ts';
import { checkPermission } from '../middlewares/checkPermission.ts';
import {
  ApplicationModules,
  ModuleOperations,
} from '@invoice/enums/routeModule.enum';

export const roleRouter = trpc.router({
  tenantRoles: privateProcedure
    .input(zQueryOptionSchema)
    .use(checkPermission(`${ApplicationModules.role}:${ModuleOperations.list}`))
    .query(async (opts) => {
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
  // assign permission to given role
  assignPermissionOnTenantRole: privateProcedure
    .input(ZAssignPermissionOnTenantRoleSchema)
    .mutation(async (opts) => {
      const { assignPermissionOnTenantRoleHandler } = await import(
        '../handlers/roles/role.handler.ts'
      );
      return assignPermissionOnTenantRoleHandler(opts);
    }),
  rolePermissions: publicProcedure
    .input(ZRolePermissionSchema)
    .query(async (opts) => {
      const { getRolePermissionHandler } = await import(
        '../handlers/roles/role.handler.ts'
      );
      return getRolePermissionHandler(opts);
    }),
  userBasedPermissions: privateProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async (opts) => {
      const { userBasedPermissionsHandler } = await import(
        '../handlers/roles/role.handler.ts'
      );
      return userBasedPermissionsHandler(opts);
    }),
});
