import { z } from 'zod';
import { publicProcedure, trpc } from '../../lib/trpc.ts';

export const taskRouter = trpc.router({
  getByProjectId: publicProcedure
    .input(
      z.object({
        projectId: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { getTaskByProjectIdHandler } = await import(
        '../../handlers/project/task.handler.ts'
      );

      return getTaskByProjectIdHandler({
        ctx,
        input,
      });
    }),
});
