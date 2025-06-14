import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

/**
 * @tenant storage table.
 */
export const tenants = pgTable('tenants', {
  id: varchar('id', { length: 8 }).primaryKey(),
  name: text('name'),
  email: text('email').unique(),
  status: integer().default(1).notNull(), // 1 = Active, 0 = Inactive
  // subscription information
  subscriptionStart: timestamp('subscription_start'),
  subscriptionEnd: timestamp('subscription_end'),
  // which subscription plan is currently assigned to.
  plan: text('plan').default('basic'),
  // date status for tenant creation and update.
  createdAt: timestamp('created_at').$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp('updated_at').$onUpdate(
    () => /* @__PURE__ */ new Date()
  ),
});
