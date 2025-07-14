import { publicProcedure, trpc } from '../../lib/trpc.ts';
import { ZTaxSchema } from '../../schema/taxSchema.ts';

export const taxRouter = trpc.router({
  addTax: publicProcedure.input(ZTaxSchema).mutation(async ({ input, ctx }) => {
    const { createTaxHandler } = await import(
      '../../handlers/tax/tax.handler.ts'
    );

    return createTaxHandler({
      input,
      ctx,
    });
  }),
  listTax: publicProcedure.query(async ({ ctx }) => {
    const { listTaxHandler } = await import(
      '../../handlers/tax/tax.handler.ts'
    );

    return listTaxHandler({
      ctx,
    });
  }),
});
