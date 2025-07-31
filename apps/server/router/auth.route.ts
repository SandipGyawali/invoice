import { publicProcedure, trpc } from '../lib/trpc.ts';
import { authSchema, ZRegistrationSchema } from '../schema/authSchema.ts';

export const authRouter = trpc.router({
  requestTenantUserRegistration: publicProcedure
    .input(ZRegistrationSchema)
    .mutation(async (opts) => {
      const { tenantUserRegistrationHandler } = await import(
        '../handlers/auth/registration.handler.ts'
      );

      return tenantUserRegistrationHandler(opts);
    }),
  loginUser: publicProcedure.input(authSchema.login).mutation(async (opts) => {
    const { loginUserHandler } = await import(
      '../handlers/auth/login.handler.ts'
    );

    return loginUserHandler(opts);
  }),
  getUserInfo: trpc.procedure.mutation(() => {}),
  getUserPermissions: trpc.procedure.query(() => {}),
  getUserRoles: trpc.procedure.query(() => {}),
});
