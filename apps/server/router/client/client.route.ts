import {
  ApplicationModules,
  ModuleOperations,
} from '@invoice/enums/routeModule.enum';
import { privateProcedure, publicProcedure, trpc } from '../../lib/trpc.ts';
import { checkPermission } from '../../middlewares/checkPermission.ts';
import { zClientSchema } from '../../schema/cientSchema.ts';
import { zQueryOptionSchema } from '../../schema/queryOptionSchema.ts';

export const clientRouter = trpc.router({
  listClient: privateProcedure
    .input(zQueryOptionSchema)
    .use(
      checkPermission(`${ApplicationModules.client}:${ModuleOperations.list}`)
    )
    .query(async (opts) => {
      const { listClients } = await import(
        '../../handlers/client/client.handler.ts'
      );
      return listClients(opts);
    }),
  addClient: publicProcedure
    .input(zClientSchema)
    .mutation(async ({ input, ctx }) => {
      const { addClientHandler } = await import(
        '../../handlers/client/client.handler.ts'
      );

      return addClientHandler({
        input,
        ctx,
      });
    }),
});
