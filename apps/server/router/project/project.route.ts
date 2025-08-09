import { z } from 'zod';
import { privateProcedure, publicProcedure, trpc } from '../../lib/trpc.ts';
import { zProjectSchema } from '../../schema/project.schema.ts';
import { zQueryOptionSchema } from '../../schema/queryOptionSchema.ts';
import { checkPermission } from '../../middlewares/checkPermission.ts';
import {
  ApplicationModules,
  ModuleOperations,
} from '@invoice/enums/routeModule.enum';

export const options = z.object({
  id: z.number().optional(),
});

export const projectRouter = trpc.router({
  listProjects: privateProcedure
    .use(
      checkPermission(`${ApplicationModules.project}:${ModuleOperations.list}`)
    )
    .input(zQueryOptionSchema)
    .query(async (opts) => {
      const { listProjectHandler } = await import(
        '../../handlers/project/project.handler.ts'
      );
      return listProjectHandler(opts);
    }),
  addProject: privateProcedure
    .use(
      checkPermission(
        `${ApplicationModules.project}:${ModuleOperations.create}`
      )
    )
    .input(zProjectSchema)
    .mutation(async (opts) => {
      const { addProjectHandler } = await import(
        '../../handlers/project/project.handler.ts'
      );
      return addProjectHandler(opts);
    }),
});
