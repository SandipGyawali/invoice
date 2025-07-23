import { z } from 'zod';
import { publicProcedure, trpc } from '../../lib/trpc.ts';
import { ZTaxSchema } from '../../schema/taxSchema.ts';
import { zQueryOptionSchema } from '../../schema/queryOptionSchema.ts';

export const taxRouter = trpc.router({
  addTax: publicProcedure.input(ZTaxSchema).mutation(async (opts) => {
    const { createTaxHandler } = await import(
      '../../handlers/tax/tax.handler.ts'
    );
    return createTaxHandler(opts);
  }),
  listTax: publicProcedure.input(zQueryOptionSchema).query(async (opts) => {
    const { listTaxHandler } = await import(
      '../../handlers/tax/tax.handler.ts'
    );
    return listTaxHandler(opts);
  }),
});
