import { trpc } from '../lib/trpc.ts';
import { authRouter } from '../router/auth.route.ts';
import { clientRouter } from './client/client.route.ts';
import { permissionRouter } from './permission.route.ts';
import { productRouter } from './product/product.route.ts';
import { productCategoryRouter } from './product/productCategory.route.ts';
import { productUnitRouter } from './product/productUnit.route.ts';
import { projectRouter } from './project/project.route.ts';
import { taskRouter } from './project/task.route.ts';
import { roleRouter } from './roles.route.ts';
import { taxRouter } from './tax/tax.route.ts';
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
  tax: taxRouter,
  product: productRouter,
  client: clientRouter,
  project: projectRouter,
  tasks: taskRouter,
});

export type AppRouter = typeof appRouter;
