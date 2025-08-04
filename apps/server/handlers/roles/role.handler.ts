import { TRPCError } from '@trpc/server';
import { db } from '../../db/db.ts';
import { rolePermissions, roles } from '../../models/rbac.ts';
import { and, count, eq, ilike } from 'drizzle-orm';
import type {
  TZRoleInsertSchema,
  TZRoleSchema,
} from '../../schema/roleSchema.ts';
import { getUserPermissionSlugs } from '../../utils/userPermissionSlug.ts';
import type { StatusEnumType } from '../../models/status.enum.ts';

type RoleOptions = {
  ctx: {};
  input: TZRoleSchema;
};

export const roleHandler = async ({ input, ctx }: RoleOptions) => {
  const { tenantId } = ctx;
  const { page, pageSize } = input;
  const offset = (page - 1) * pageSize;

  const query = db.select().from(roles).$dynamic();
  const filteredConditions = Object.entries(input).reduce(
    (acc, [key, value]) => {
      if (value === undefined || value == null) return acc;

      switch (key) {
        case 'search':
          value.toString().length > 0
            ? acc.push(ilike(roles.name, `%${String(value).trim()}%`))
            : undefined;
          break;
        case 'status':
          acc.push(eq(roles.status, value as StatusEnumType));
          break;
      }
      return acc;
    },
    [] as any[]
  );

  filteredConditions.push(eq(roles.tenantId, tenantId as string));
  console.log(filteredConditions);

  const builtQuery = query.where(and(...filteredConditions));
  const countQuery = db.select({ totalCount: count() }).from(roles).$dynamic();

  const [result, [{ totalCount }]] = await Promise.all([
    builtQuery.limit(pageSize).offset(offset).execute(),
    countQuery.where(and(...filteredConditions)).execute(),
  ]);

  return {
    data: result,
    total: Number(totalCount),
    page: page,
    pageSize: pageSize,
    message: 'Tax Fetched Successfully',
  };
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

// assign permission on tenantRole
export const assignPermissionOnTenantRoleHandler = async ({
  ctx,
  input,
}: {
  ctx: any;
  input: any;
}) => {
  const { tenantId } = ctx;
  const { roleId, permissions } = input;

  // step 1: delete all existing permissions for the role within the tenant
  // Step 1: Delete all existing permissions for this role within the tenant
  await db
    .delete(rolePermissions)
    .where(
      and(
        eq(rolePermissions.tenantId, tenantId),
        eq(rolePermissions.roleId, roleId)
      )
    );

  if (permissions.length > 0) {
    const validPermissions = permissions.filter(
      (id: number): id is number => typeof id === 'number' && !isNaN(id)
    );

    if (validPermissions.length > 0) {
      const newPermissions = validPermissions.map((id: number) => ({
        tenantId,
        roleId,
        permissionId: id,
      }));

      await db.insert(rolePermissions).values(newPermissions);
    }
  }

  return {
    success: true,
    message: 'Permission assigned Successfully',
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

export const userBasedPermissionsHandler = async ({
  input,
  ctx,
}: {
  input: {
    userId: string;
  };
  ctx: {
    tenantId: string;
  };
}) => {
  const slugs = await getUserPermissionSlugs({
    userId: input.userId,
    tenantId: ctx.tenantId,
  });

  return slugs;
};
