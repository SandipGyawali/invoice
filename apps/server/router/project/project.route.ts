import { z } from 'zod';
import { publicProcedure, trpc } from '../../lib/trpc.ts';
import { zProjectSchema } from '../../schema/project.schema.ts';

export const options = z.object({
  id: z.number().optional(),
  tenantId: z.string().optional(),
});

export const projectRouter = trpc.router({
  listProjects: publicProcedure.input(options).query(async (opts) => {
    const { listProjectHandler } = await import(
      '../../handlers/project/project.handler.ts'
    );

    return listProjectHandler(opts);
  }),
  addProject: publicProcedure.input(zProjectSchema).mutation(async (opts) => {
    const { addProjectHandler } = await import(
      '../../handlers/project/project.handler.ts'
    );
    return addProjectHandler(opts);
  }),
});
