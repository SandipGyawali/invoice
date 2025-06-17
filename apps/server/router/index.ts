import { trpc } from '../lib/trpc.ts';
import { authRouter } from '../router/auth.route.ts';
import { roleRouter } from './roles.route.ts';
import { tenantRouter } from './tenant/index.ts';

/**
 * base index application router
 */
export const appRouter = trpc.router({
  auth: authRouter,
  tenant: tenantRouter,
  roles: roleRouter,
});

export type AppRouter = typeof appRouter;
