import { publicProcedure, trpc } from '../lib/trpc.ts';

export const permissionRouter = trpc.router({
  getPermissionSlugs: publicProcedure.query(async ({ input, ctx }) => {
    const { permissionHandler } = await import(
      '../handlers/permissions/permission.handler.ts'
    );

    return permissionHandler({
      input,
      ctx,
    });
  }),
});
