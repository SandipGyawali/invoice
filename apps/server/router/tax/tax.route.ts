import { privateProcedure, publicProcedure, trpc } from '../../lib/trpc.ts';
import { ZTaxSchema } from '../../schema/taxSchema.ts';
import { zQueryOptionSchema } from '../../schema/queryOptionSchema.ts';
import { checkPermission } from '../../middlewares/checkPermission.ts';
import {
  ApplicationModules,
  ModuleOperations,
} from '@invoice/enums/routeModule.enum';

export const taxRouter = trpc.router({
  addTax: publicProcedure.input(ZTaxSchema).mutation(async (opts) => {
    const { createTaxHandler } = await import(
      '../../handlers/tax/tax.handler.ts'
    );
    return createTaxHandler(opts);
  }),
  listTax: privateProcedure
    .use(checkPermission(`${ApplicationModules.tax}:${ModuleOperations.list}`))
    .input(zQueryOptionSchema)
    .query(async (opts) => {
      const { listTaxHandler } = await import(
        '../../handlers/tax/tax.handler.ts'
      );
      return listTaxHandler(opts);
    }),
});
