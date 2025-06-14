import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { tenants } from './tenant.ts';
import { user } from './user.ts';

/**
 * Role Based Access control models
 */
export const roles = pgTable('roles', {
  id: serial().primaryKey(),
  tenantId: varchar('tenant_id').references(() => tenants.id, {
    onDelete: 'cascade',
  }),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').$default(() => new Date()),
});

/**
 * permissions table
 */
export const permissions = pgTable('permissions', {
  id: serial().primaryKey(),
  name: text('name'),
  createdAt: timestamp('created_at').$default(() => new Date()),
});

/**
 * Role-Permissions (many-to-many) relations
 */
export const rolePermissions = pgTable(
  'role_permissions',
  {
    tenantId: varchar('tenant_id').references(() => tenants.id, {
      onDelete: 'cascade',
    }),
    roleId: integer('role_id')
      .references(() => roles.id, { onDelete: 'cascade' })
      .notNull(),
    permissionId: integer('permission_id')
      .references(() => permissions.id, { onDelete: 'cascade' })
      .notNull(),
    createdAt: timestamp('created_at').$default(() => new Date()),
  },
  (t) => [primaryKey({ name: 'id', columns: [t.roleId, t.permissionId] })]
);

/**
 * User-Role mapping table (Many-to-Many)
 * Keeps track of multiple roles assigned to each user.
 */
export const userRoles = pgTable(
  'user_roles',
  {
    tenantId: varchar('tenant_id').references(() => tenants.id, {
      onDelete: 'cascade',
    }),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    roleId: integer('role_id')
      .notNull()
      .references(() => roles.id, { onDelete: 'cascade' }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.roleId] }),
    };
  }
);
