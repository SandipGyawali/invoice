import { trpc } from '../lib/trpc.ts';
import { authRouter } from '../router/auth.route.ts';
import { permissionRouter } from './permission.route.ts';
import { roleRouter } from './roles.route.ts';
import { tenantRouter } from './tenant/index.ts';

/**
 * base index application router
 */
export const appRouter = trpc.router({
  auth: authRouter,
  tenant: tenantRouter,
  roles: roleRouter,
  permissions: permissionRouter,
});

export type AppRouter = typeof appRouter;
