import { z } from 'zod';
import { privateProcedure, publicProcedure, trpc } from '../../lib/trpc.ts';
import { ZProductUnitSchema } from '../../schema/productSchema.ts';
import { checkPermission } from '../../middlewares/checkPermission.ts';
import {
  ApplicationModules,
  ModuleOperations,
} from '@invoice/enums/routeModule.enum';
import { zQueryOptionSchema } from '../../schema/queryOptionSchema.ts';

export const productUnitRouter = trpc.router({
  addUnit: privateProcedure
    .use(
      checkPermission(`${ApplicationModules.unit}:${ModuleOperations.create}`)
    )
    .input(ZProductUnitSchema)
    .mutation(async (opts) => {
      const { addProductUnitHandler } = await import(
        '../../handlers/product/productUnit.handler.ts'
      );
      return addProductUnitHandler(opts);
    }),
  listUnit: privateProcedure
    .use(checkPermission(`${ApplicationModules.unit}:${ModuleOperations.list}`))
    .input(zQueryOptionSchema)
    .query(async (opts) => {
      const { listProductUnitHandler } = await import(
        '../../handlers/product/productUnit.handler.ts'
      );
      return listProductUnitHandler(opts);
    }),
  updateUnit: privateProcedure
    .use(
      checkPermission(`${ApplicationModules.unit}:${ModuleOperations.update}`)
    )
    .input(
      ZProductUnitSchema.extend({
        id: z.number(),
        status: z.string(),
        statusFTR: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { updateProductUnitHandler } = await import(
        '../../handlers/product/productUnit.handler.ts'
      );
      return updateProductUnitHandler(opts);
    }),
});
