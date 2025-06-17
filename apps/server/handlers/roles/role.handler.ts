import { TRPCError } from '@trpc/server';
import { db } from '../../db/db.ts';
import { roles } from '../../models/rbac.ts';
import { eq } from 'drizzle-orm';
import type { TZRoleSchema } from '../../schema/roleSchema.ts';

type RoleOptions = {
  ctx: {};
  input: TZRoleSchema;
};

export const roleHandler = async ({ input, ctx }: RoleOptions) => {
  if (!input.tenantId) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Tenant id not passed',
    });
  }

  const tenantRoles = await db
    .select()
    .from(roles)
    .where(eq(roles.tenantId, input.tenantId));

  console.log(tenantRoles);

  return tenantRoles;
};
