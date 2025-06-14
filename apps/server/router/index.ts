import { trpc } from '~/lib/trpc.ts';
import { authRouter } from '~/router/auth.route.ts';
import { tenantRouter } from './tenant/index.ts';

/**
 * base index application router
 */
export const appRouter = trpc.router({
  auth: authRouter,
  tenant: tenantRouter,
});

export type AppRouter = typeof appRouter;
