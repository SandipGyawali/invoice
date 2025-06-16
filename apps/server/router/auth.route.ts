import { trpc } from '~/lib/trpc.ts';

export const authRouter = trpc.router({
  requestUserRegistration: trpc.procedure.mutation(() => {}),
  requestOrgsRegistration: trpc.procedure.mutation(() => {}),
  getUserInfo: trpc.procedure.mutation(() => {}),
  getUserPermissions: trpc.procedure.query(() => {}),
  getUserRoles: trpc.procedure.query(() => {}),
});
