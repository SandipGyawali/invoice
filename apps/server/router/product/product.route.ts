import {
  ApplicationModules,
  ModuleOperations,
} from '@invoice/enums/routeModule.enum';
import { privateProcedure, publicProcedure, trpc } from '../../lib/trpc.ts';
import { checkPermission } from '../../middlewares/checkPermission.ts';
import { ZProductSchema } from '../../schema/productSchema.ts';
import { zQueryOptionSchema } from '../../schema/queryOptionSchema.ts';

export const productRouter = trpc.router({
  addProduct: publicProcedure
    .input(ZProductSchema)
    .mutation(async ({ input, ctx }) => {
      const { addProductHandler } = await import(
        '../../handlers/product/product.handler.ts'
      );

      return addProductHandler({
        input,
        ctx,
      });
    }),
  listProduct: privateProcedure
    .use(
      checkPermission(`${ApplicationModules.product}:${ModuleOperations.list}`)
    )
    .input(zQueryOptionSchema)
    .query(async (opts) => {
      const { listProductHandler } = await import(
        '../../handlers/product/product.handler.ts'
      );
      return listProductHandler(opts);
    }),
});
