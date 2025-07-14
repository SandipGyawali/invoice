import { sql } from 'drizzle-orm';
import {
  decimal,
  json,
  pgEnum,
  pgTable,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';
import { statusEnum } from './status.enum.ts';
import { tenants } from './tenant.ts';

export const typeEnum = pgEnum('type', ['inclusive', 'exclusive']);

export const tax = pgTable('tax', {
  id: serial().primaryKey(),
  tenantId: varchar('tenant_id').references(() => tenants.id, {
    onDelete: 'cascade',
  }),
  name: varchar('name', { length: 50 }).notNull(),
  rate: decimal('rate').notNull(),
  type: typeEnum('type').default('inclusive'),
  applicableTo: json('applicable_to')
    .$type<string[]>()
    .notNull()
    .default(sql`('[]')`),
  status: statusEnum('status').default('1'),
  statusFTR: varchar('status_ftr', { length: 50 }).default(''),
});
