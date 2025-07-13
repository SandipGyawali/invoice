import { z } from 'zod';
import { publicProcedure, trpc } from '../../lib/trpc.ts';
import { ZProductUnitSchema } from '../../schema/productSchema.ts';

export const productUnitRouter = trpc.router({
  addUnit: publicProcedure
    .input(ZProductUnitSchema)
    .mutation(async ({ input, ctx }) => {
      const { addProductUnitHandler } = await import(
        '../../handlers/product/productUnit.handler.ts'
      );

      return addProductUnitHandler({
        ctx,
        input,
      });
    }),
  listUnit: publicProcedure.query(async ({ input, ctx }) => {
    const { listProductUnitHandler } = await import(
      '../../handlers/product/productUnit.handler.ts'
    );

    return listProductUnitHandler();
  }),
  updateUnit: publicProcedure
    .input(
      ZProductUnitSchema.extend({
        id: z.number(),
        status: z.string(),
        statusFTR: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { updateProductUnitHandler } = await import(
        '../../handlers/product/productUnit.handler.ts'
      );

      return updateProductUnitHandler({
        input,
        ctx,
      });
    }),
});
