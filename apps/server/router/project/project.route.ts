import { z } from 'zod';
import { publicProcedure, trpc } from '../../lib/trpc.ts';
import { zProjectSchema } from '../../schema/project.schema.ts';
import { zQueryOptionSchema } from '../../schema/queryOptionSchema.ts';

export const options = z.object({
  id: z.number().optional(),
});

export const projectRouter = trpc.router({
  listProjects: publicProcedure
    .input(zQueryOptionSchema)
    .query(async (opts) => {
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
