import { db } from '../../db/db.ts';
import { permissions } from '../../models/rbac.ts';

type PermissionOptions = {
  ctx: {};
  input: any;
};

export const permissionHandler = async ({ input, ctx }: PermissionOptions) => {
  const permissionSlugs = await db.select().from(permissions);

  return permissionSlugs;
};
