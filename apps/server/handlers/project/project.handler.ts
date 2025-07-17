import { and, eq, ilike } from 'drizzle-orm';
import { db } from '../../db/db.ts';
import { projects } from '../../models/projectNtask.ts';
import { TRPCError } from '@trpc/server';
import type { TZProjectSchemaType } from '../../schema/project.schema.ts';
import { options } from '../../router/project/project.route.ts';
import type { z } from 'zod';

interface ProjectHandler {
  ctx: {};
  input: z.infer<typeof options>;
}

export const listProjectHandler = async ({ ctx, input }: ProjectHandler) => {
  console.log(input);
  let query = db.select().from(projects).$dynamic();

  const filteredConditions = Object.entries(input).reduce(
    (acc, [key, value]) => {
      if (value === undefined || value == null) return acc;

      console.log(key, value);

      switch (key) {
        case 'id':
          acc.push(eq(projects.id, value as number));
          break;
        case 'tenantId':
          acc.push(eq(projects.tenantId, value as string));
          break;
      }

      return acc;
    },
    [] as any[]
  );

  const result = await query
    .where(
      filteredConditions.length > 0 ? and(...filteredConditions) : undefined
    )
    .execute();

  return result;
};

interface AddProjectHandler extends ProjectHandler {
  input: TZProjectSchemaType;
}

export const addProjectHandler = async ({ ctx, input }: AddProjectHandler) => {
  console.log(input);

  const projectExists = (
    await db.select().from(projects).where(ilike(projects.name, input.name))
  ).at(0);

  if (projectExists) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: `Project with the provided ${input.name} name already exists`,
    });
  }

  const [newProject] = await db
    .insert(projects)
    .values({
      name: input.name,
      startDate: input.startDate,
      clientId: input.clientId,
      description: input.description,
      pStatus: input.pStatus,
      endDate: input.endDate,
      tenantId: input.tenantId,
    })
    .returning();

  return {
    success: true,
    message: `Project ${input.name} added successfully`,
    data: newProject,
  };
};
