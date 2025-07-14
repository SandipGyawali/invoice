import { publicProcedure, trpc } from '../../lib/trpc.ts';
import { ZProductSchema } from '../../schema/productSchema.ts';

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
  listProduct: publicProcedure.query(async ({ input, ctx }) => {
    const { listProductHandler } = await import(
      '../../handlers/product/product.handler.ts'
    );

    return listProductHandler({
      ctx,
    });
  }),
});
