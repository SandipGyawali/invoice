import { publicProcedure, trpc } from '../../lib/trpc.ts';
import {
  ZProductCategorySchema,
  ZUpdateProductCategorySchema,
} from '../../schema/productSchema.ts';

export const productCategoryRouter = trpc.router({
  addCategory: publicProcedure
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
  listCategory: publicProcedure.query(async () => {
    const { listProductCategoryHandler } = await import(
      '../../handlers/product/productCategory.handler.ts'
    );

    return listProductCategoryHandler();
  }),
  updateCategory: publicProcedure
    .input(ZUpdateProductCategorySchema)
    .mutation(async ({ input, ctx }) => {
      const { updateProductCategoryHandler } = await import(
        '../../handlers/product/productCategory.handler.ts'
      );

      return updateProductCategoryHandler({
        input,
        ctx,
      });
    }),
});
