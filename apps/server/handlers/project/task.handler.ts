import { eq } from 'drizzle-orm';
import { db } from '../../db/db.ts';
import { projects, tasks } from '../../models/projectNtask.ts';
import { TRPCError } from '@trpc/server';

interface TaskHandler {
  ctx: {};
}

interface TaskHandlerById extends TaskHandler {
  input: any;
}

export const getTaskByProjectIdHandler = async ({ input }: TaskHandlerById) => {
  const projectExits = (
    await db.select().from(projects).where(eq(projects.id, input.projectId))
  ).at(0);

  if (!projectExits) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: `Project with provided id: ${input.projectId} doesn't exists`,
    });
  }

  const tasksList = await db
    .select()
    .from(tasks)
    .where(eq(tasks.projectId, input.projectId));

  return tasksList;
};
