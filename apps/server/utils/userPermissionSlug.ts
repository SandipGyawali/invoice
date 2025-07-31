import { and, eq, inArray } from 'drizzle-orm';
import { db } from '../db/db.ts';
import { permissions, rolePermissions, userRoles } from '../models/rbac.ts';

export const getUserPermissionSlugs = async ({
  userId,
  tenantId,
}: {
  userId: string;
  tenantId: string;
}): Promise<(string | null)[]> => {
  // Step 1: Get all roleIds for the user
  const userRoleRows = await db
    .select({ roleId: userRoles.roleId })
    .from(userRoles)
    .where(eq(userRoles.userId, userId));

  const roleIds = userRoleRows.map((r) => r.roleId);
  if (roleIds.length === 0) return [];

  // Step 2: Join role_permissions -> permissions to get slugs
  const permissionRows = await db
    .select({ slug: permissions.slug })
    .from(rolePermissions)
    .innerJoin(permissions, eq(rolePermissions.permissionId, permissions.id))
    .where(
      and(
        inArray(rolePermissions.roleId, roleIds),
        eq(rolePermissions.tenantId, tenantId)
      )
    );

  // Step 3: Extract slugs
  const slugs = permissionRows?.map((p) => p.slug)?.filter(Boolean);
  return slugs;
};
