import { z } from 'zod';
import { privateProcedure, publicProcedure, trpc } from '../../lib/trpc.ts';
import { zTaskSchema, zTaskUpdateSchema } from '../../schema/project.schema.ts';
import { checkPermission } from '../../middlewares/checkPermission.ts';
import {
  ApplicationModules,
  ModuleOperations,
} from '@invoice/enums/routeModule.enum';

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
  addTask: privateProcedure
    .use(
      checkPermission(`${ApplicationModules.task}:${ModuleOperations.create}`)
    )
    .input(zTaskSchema)
    .mutation(async (opts) => {
      const { addTaskHandler } = await import(
        '../../handlers/project/task.handler.ts'
      );
      return addTaskHandler(opts);
    }),
  updateTask: privateProcedure
    .use(
      checkPermission(`${ApplicationModules.task}:${ModuleOperations.update}`)
    )
    .input(zTaskUpdateSchema)
    .mutation(async (opts) => {
      const { updateTaskHandler } = await import(
        '../../handlers/project/task.handler.ts'
      );
      return updateTaskHandler(opts);
    }),
});
1;
