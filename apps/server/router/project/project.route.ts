import { publicProcedure, trpc } from '../../lib/trpc.ts';

export const projectRouter = trpc.router({
  listProjects: publicProcedure.query(async ({ input, ctx }) => {
    const { listProjectHandler } = await import(
      '../../handlers/project/project.handler.ts'
    );

    return listProjectHandler({
      ctx,
    });
  }),
});
