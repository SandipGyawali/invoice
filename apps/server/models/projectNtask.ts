import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  pgEnum,
  integer,
} from 'drizzle-orm/pg-core';
import { statusEnum } from './status.enum.ts';
import { tenants } from './tenant.ts';

export const projectStatusEnum = pgEnum('project_status', [
  'in_progress',
  'completed',
  'not_started',
]);

export const priorityEnum = pgEnum('priority_enum', ['medium', 'high', 'low']);

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  tenantId: varchar('tenant_id').references(() => tenants.id, {
    onDelete: 'cascade',
  }),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date'),
  pStatus: projectStatusEnum('p_status').default('not_started'),
  status: statusEnum('status').default('1'),
  statusFTR: varchar('status_ftr', { length: 50 }).default(''),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdateFn(() => new Date()),
});

// project tasks table
export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  endDate: timestamp('end_date'),
  priority: priorityEnum('priority').default('low'),
  tStatus: projectStatusEnum('t_status').default('not_started'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdateFn(() => new Date()),
});
