import {
  ApplicationModules,
  ModuleOperations,
} from '@invoice/enums/routeModule.enum';
import { privateProcedure, publicProcedure, trpc } from '../../lib/trpc.ts';
import { checkPermission } from '../../middlewares/checkPermission.ts';
import {
  ZProductCategorySchema,
  ZUpdateProductCategorySchema,
} from '../../schema/productSchema.ts';
import { zQueryOptionSchema } from '../../schema/queryOptionSchema.ts';

export const productCategoryRouter = trpc.router({
  addCategory: privateProcedure
    .input(ZProductCategorySchema)
    .mutation(async ({ input, ctx }) => {
      const { addProductCategoryHandler } = await import(
        '../../handlers/product/productCategory.handler.ts'
      );

      return addProductCategoryHandler({
        ctx,
        input,
      });
    }),
  listCategory: privateProcedure
    .use(checkPermission(`${ApplicationModules.tax}:${ModuleOperations.list}`))
    .input(zQueryOptionSchema)
    .query(async (opts) => {
      const { listProductCategoryHandler } = await import(
        '../../handlers/product/productCategory.handler.ts'
      );

      return listProductCategoryHandler(opts);
    }),
  updateCategory: privateProcedure
    .input(ZUpdateProductCategorySchema)
    .mutation(async (opts) => {
      const { updateProductCategoryHandler } = await import(
        '../../handlers/product/productCategory.handler.ts'
      );
      return updateProductCategoryHandler(opts);
    }),
});
