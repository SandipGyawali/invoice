import { TRPCError } from '@trpc/server';
import { db } from '../../db/db.ts';
import { roles } from '../../models/rbac.ts';
import { and, eq } from 'drizzle-orm';
import type {
  TZRoleInsertSchema,
  TZRoleSchema,
} from '../../schema/roleSchema.ts';

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

type CreateTenantRoleOptions = {
  ctx: {};
  input: TZRoleInsertSchema;
};

export const createTenantRoleHandler = async ({
  input,
  ctx,
}: CreateTenantRoleOptions) => {
  const roleExists = (
    await db.select().from(roles).where(eq(roles.name, input.name))
  ).at(0);

  if (roleExists) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Role with provided name already exists',
    });
  }

  const newRole = (
    await db
      .insert(roles)
      .values({
        name: input.name,
        tenantId: input.tenantId,
      })
      .returning()
  ).at(0);

  if (!newRole) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'internal_server_error',
    });
  }

  return {
    success: true,
    message: 'New Role Created Successfully',
  };
};

type EditTenantRoleOptions = {
  ctx: {};
  input: any;
};

export const updateTenantRoleHandler = async ({ input, ctx }: any) => {
  // find the role
  const existingRole = (
    await db.select().from(roles).where(eq(roles.id, input.id))
  ).at(0);

  if (!existingRole) {
    throw new TRPCError({
      message: "Provided role name dosen't exists",
      code: 'BAD_REQUEST',
    });
  }

  await db
    .update(roles)
    .set({
      name: input.name,
    })
    .where(and(eq(roles.id, input.id), eq(roles.tenantId, input.tenantId)));

  return {
    message: 'Role Updated Successfully',
    success: true,
  };
};
