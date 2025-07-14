import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  date,
} from 'drizzle-orm/pg-core';
import { tenants } from './tenant.ts';
import { statusEnum } from './status.enum.ts';

export const client = pgTable('clients', {
  id: serial('id').primaryKey(),
  tenantId: varchar('tenant_id', { length: 36 }).references(() => tenants.id, {
    onDelete: 'cascade',
  }),
  //   personal info
  firstName: text('first_name'),
  lastName: text('last_name'),
  phone: varchar('phone', { length: 20 }),
  email: varchar('email', { length: 255 }).unique().notNull(),
  gender: varchar('gender', { length: 10 }).default('Male'),
  dob: date('dob'), // Date of Birth
  // address info
  address: text('address'),
  address2: text('address2'),
  city: text('city'),
  state: text('state'),
  zip: varchar('zip', { length: 20 }),
  country: text('country'),
  // business identity
  vatId: varchar('vat_id', { length: 50 }),
  taxId: varchar('tax_id', { length: 50 }),
  // status and timestamp
  status: statusEnum('status').default('1'),
  statusFTR: varchar('status_ftr', { length: 50 }).default(''),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdateFn(
    () => new Date()
  ),
});
