import { TRPCError } from '@trpc/server';
import { db } from '../../db/db.ts';
import { rolePermissions, roles } from '../../models/rbac.ts';
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

export const getRolePermissionHandler = async ({ input, ctx }: any) => {
  const query = db.select().from(rolePermissions).$dynamic();

  const filteredConditions = Object.entries(input).reduce(
    (acc, [key, value]) => {
      if (value === undefined || value == null) return acc;

      switch (key) {
        case 'roleId':
          acc.push(eq(rolePermissions.roleId, value as number));
          break;
        case 'tenantId':
          acc.push(eq(rolePermissions.tenantId, value as string));
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

  const customResult =
    result.length > 0
      ? result.map((val) => {
          return {
            permissionId: val.permissionId,
          };
        })
      : [];

  return customResult;
};
