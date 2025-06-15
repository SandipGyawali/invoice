import { trpc } from '~/lib/trpc.ts';
import { userRegistrationController } from '~/controllers/auth/registration.controller';

export const authRouter = trpc.router({
  requestUserRegistration: trpc.procedure.mutation(
    ({ input }) => userRegistrationController
  ),
  requestOrgsRegistration: trpc.procedure.mutation(() => {}),
  getUserInfo: trpc.procedure.mutation(() => {}),
  getUserPermissions: trpc.procedure.query(() => {}),
  getUserRoles: trpc.procedure.query(() => {}),
});
