import { publicProcedure, trpc } from '../lib/trpc.ts';
import { authSchema, ZRegistrationSchema } from '../schema/authSchema.ts';

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
  loginUser: publicProcedure
    .input(authSchema.login)
    .mutation(async ({ input, ctx }) => {
      const { loginUserHandler } = await import(
        '../handlers/auth/login.handler.ts'
      );

      return loginUserHandler({
        ctx,
        input,
      });
    }),
  getUserInfo: trpc.procedure.mutation(() => {}),
  getUserPermissions: trpc.procedure.query(() => {}),
  getUserRoles: trpc.procedure.query(() => {}),
});
