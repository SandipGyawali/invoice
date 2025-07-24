import { z } from 'zod';
import { publicProcedure, trpc } from '../../lib/trpc.ts';
import { zTaskSchema, zTaskUpdateSchema } from '../../schema/project.schema.ts';

export const taskRouter = trpc.router({
  getByProjectId: publicProcedure
    .input(
      z.object({
        projectId: z.number(),
      })
    )
    .query(async (opts) => {
      const { getTaskByProjectIdHandler } = await import(
        '../../handlers/project/task.handler.ts'
      );
      return getTaskByProjectIdHandler(opts);
    }),
  addTask: publicProcedure.input(zTaskSchema).mutation(async (opts) => {
    const { addTaskHandler } = await import(
      '../../handlers/project/task.handler.ts'
    );
    return addTaskHandler(opts);
  }),
  updateTask: publicProcedure
    .input(zTaskUpdateSchema)
    .mutation(async (opts) => {
      const { updateTaskHandler } = await import(
        '../../handlers/project/task.handler.ts'
      );
      return updateTaskHandler(opts);
    }),
});
1;
