import { db } from '../../db/db.ts';
import { projects } from '../../models/projectNtask.ts';

interface ProjectHandler {
  ctx: {};
}

export const listProjectHandler = async ({ ctx }: ProjectHandler) => {
  const result = await db.select().from(projects);
  return result;
};
