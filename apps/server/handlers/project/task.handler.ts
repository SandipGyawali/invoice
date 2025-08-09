import { and, eq } from 'drizzle-orm';
import { db } from '../../db/db.ts';
import { projects, tasks } from '../../models/projectNtask.ts';
import { TRPCError } from '@trpc/server';
import type { TZTaskUpdateSchemaType } from '../../schema/project.schema.ts';
import type { TRPCContext } from '../../lib/context.ts';

interface TaskHandler {
  ctx: TRPCContext;
}

interface TaskHandlerById extends TaskHandler {
  input: any;
}

interface AddTaskInterface extends TaskHandler {
  input: any;
}

interface UpdateTaskInterface extends TaskHandler {
  input: TZTaskUpdateSchemaType;
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

export const addTaskHandler = async ({ input }: AddTaskInterface) => {
  const taskExists = (
    await db
      .select()
      .from(tasks)
      .where(
        and(eq(tasks.title, input.title), eq(tasks.projectId, input.projectId))
      )
  ).at(0);

  if (taskExists) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: `The provided task with the title: ${input.title} already exists`,
    });
  }

  const [newTask] = await db
    .insert(tasks)
    .values({
      projectId: input.projectId,
      title: input.title,
      description: input.description,
      priority: input.priority,
      tStatus: input.tStatus,
    })
    .returning();

  return {
    success: true,
    message: `Task ${input.title} added successfully`,
    data: newTask,
  };
};

export const updateTaskHandler = async ({ input }: UpdateTaskInterface) => {
  // check if task exists
  const taskExists = (
    await db.select().from(tasks).where(eq(tasks.id, input.id))
  ).at(0);

  if (!taskExists) {
    throw new TRPCError({
      message: "Task Handler doesn't exits with the provided name",
      code: 'BAD_REQUEST',
    });
  }

  const [updateTask] = await db
    .update(tasks)
    .set({
      title: input.title,
      description: input.description,
      priority: input.priority,
      endDate: input.endDate,
      tStatus: input.tStatus,
      projectId: input.projectId,
    })
    .where(eq(tasks.id, input.id))
    .returning();

  return {
    success: true,
    message: `Task updated successfully`,
    data: updateTask,
  };
};
