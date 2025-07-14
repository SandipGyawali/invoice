import { publicProcedure, trpc } from '../../lib/trpc.ts';
import { zClientSchema } from '../../schema/cientSchema.ts';

export const clientRouter = trpc.router({
  listClient: publicProcedure.query(async ({ input, ctx }) => {
    const { listClients } = await import(
      '../../handlers/client/client.handler.ts'
    );

    return listClients({
      ctx,
    });
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
