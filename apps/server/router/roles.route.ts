import { publicProcedure, trpc } from '../lib/trpc.ts';
import { ZRoleInsertSchema, ZRoleSchema } from '../schema/roleSchema.ts';

export const roleRouter = trpc.router({
  tenantRoles: publicProcedure
    .input(ZRoleSchema)
    .query(async ({ input, ctx }) => {
      const { roleHandler } = await import('../handlers/roles/role.handler.ts');

      return roleHandler({
        ctx,
        input,
      });
    }),
  createTenantRole: publicProcedure
    .input(ZRoleInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const { createTenantRoleHandler } = await import(
        '../handlers/roles/role.handler.ts'
      );

      return createTenantRoleHandler({
        ctx,
        input,
      });
    }),
});
