import { publicProcedure, trpc } from '../lib/trpc.ts';
import { ZRegistrationSchema } from '../schema/authSchema.ts';

export const authRouter = trpc.router({
  requestTenantUserRegistration: publicProcedure
    .input(ZRegistrationSchema)
    .mutation(async ({ input, ctx }) => {
      const { tenantUserRegistrationHandler } = await import(
        '../handlers/auth/registration.handler.ts'
      );

      return tenantUserRegistrationHandler({
        ctx,
        input,
      });
    }),
  getUserInfo: trpc.procedure.mutation(() => {}),
  getUserPermissions: trpc.procedure.query(() => {}),
  getUserRoles: trpc.procedure.query(() => {}),
});
