import { and, eq } from 'drizzle-orm';
import { db } from '../../db/db.ts';
import { projects, tasks } from '../../models/projectNtask.ts';
import { TRPCError } from '@trpc/server';

interface TaskHandler {
  ctx: {};
}

interface TaskHandlerById extends TaskHandler {
  input: any;
}

interface AddTaskInterface extends TaskHandler {
  input: any;
}


interface UpdateTaskInterface extends TaskHandler {
  input: any
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

\\

export const updateTaskHandler = async ({input}: )