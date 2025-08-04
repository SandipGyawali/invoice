import { and, count, eq, ilike } from 'drizzle-orm';
import { db } from '../../db/db.ts';
import { projects } from '../../models/projectNtask.ts';
import { TRPCError } from '@trpc/server';
import type { TZProjectSchemaType } from '../../schema/project.schema.ts';
import type { StatusEnumType } from '../../models/status.enum.ts';
import type { TZQueryOptionSchema } from '../../schema/queryOptionSchema.ts';
import type { TRPCContext } from '../../lib/context.ts';

interface ProjectHandler {
  ctx: TRPCContext;
  input: TZQueryOptionSchema;
}

export const listProjectHandler = async ({ ctx, input }: ProjectHandler) => {
  const { tenantId } = ctx;
  const { page, pageSize } = input;
  const offset = (page - 1) * pageSize;

  const query = db.select().from(projects).$dynamic();
  const filteredConditions = Object.entries(input).reduce(
    (acc, [key, value]) => {
      if (value === undefined || value == null) return acc;

      switch (key) {
        case 'id':
          acc.push(eq(projects.id, value as number));
          break;
        case 'search':
          value.toString().length > 0
            ? acc.push(ilike(projects.name, `%${String(value).trim()}%`))
            : undefined;
          break;
        case 'status':
          acc.push(eq(projects.status, value as StatusEnumType));
          break;
      }

      return acc;
    },
    [] as any[]
  ); // Add this below

  filteredConditions.push(eq(projects.tenantId, tenantId as string));

  const builtQuery = query.where(and(...filteredConditions));
  const countQuery = db
    .select({ totalCount: count() })
    .from(projects)
    .$dynamic();

  const [result, [{ totalCount }]] = await Promise.all([
    builtQuery.limit(pageSize).offset(offset).execute(),
    countQuery.where(and(...filteredConditions)).execute(),
  ]);

  return {
    data: result,
    total: Number(totalCount),
    page: page,
    pageSize: pageSize,
    message: `Projects Fetched Successfully`,
  };
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
