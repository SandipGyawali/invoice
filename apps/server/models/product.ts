import {
  integer,
  timestamp,
  pgTable,
  serial,
  text,
  varchar,
  decimal,
} from 'drizzle-orm/pg-core';
import { tenants } from './tenant.ts';
import { statusEnum } from './status.enum.ts';

/**
 * product category table schema
 */
export const productCategory = pgTable('product_category', {
  id: serial().primaryKey(),
  tenantId: varchar('tenant_id').references(() => tenants.id, {
    onDelete: 'cascade',
  }),
  catName: text('cat_name'),
  status: statusEnum('status').default('1'),
  statusFTR: varchar('status_ftr', { length: 50 }).default(''),
});

/**
 * product unit category table
 */
export const productUnit = pgTable('product_unit', {
  id: serial().primaryKey(),
  tenantId: varchar('tenant_id').references(() => tenants.id, {
    onDelete: 'cascade',
  }),
  name: varchar('name', { length: 10 }).notNull(),
  namePlural: varchar('name_plural', { length: 12 }).default(''),
  status: statusEnum('status').default('1'),
  statusFTR: varchar('status_ftr', { length: 50 }).default(''),
});

/**
 * products table
 * To be done: Tax rate section
 */
export const products = pgTable('products', {
  id: serial().primaryKey(),
  tenantId: varchar('tenant_id').references(() => tenants.id, {
    onDelete: 'cascade',
  }),
  pCatId: integer('p_catId')
    .references(() => productCategory.id)
    .notNull(),
  pName: text('p_name').notNull(),
  sku: integer('sku').notNull().default(0),
  pUnit: integer('p_unit')
    .references(() => productUnit.id)
    .notNull(),
  pPrice: decimal('p_price').notNull(),
  sPrice: decimal('s_price').notNull(),
  pDescription: text('p_description').default(''),
  providerName: text('provider_name').default(''),
  status: statusEnum('status').default('1'),
  statusFTR: varchar('status_ftr', { length: 50 }).default(''),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdateFn(() => new Date()),
});
