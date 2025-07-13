import { trpc } from '../lib/trpc.ts';
import { authRouter } from '../router/auth.route.ts';
import { permissionRouter } from './permission.route.ts';
import { productCategoryRouter } from './product/productCategory.route.ts';
import { productUnitRouter } from './product/productUnit.route.ts';
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
  productUnit: productUnitRouter,
  productCategory: productCategoryRouter,
});

export type AppRouter = typeof appRouter;
