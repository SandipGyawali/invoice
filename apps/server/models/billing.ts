import {
  boolean,
  integer,
  json,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { user } from './user';

export const subscriptionStatusEnum = pgEnum('subscription_status', [
  'incomplete',
  'active',
  'paused',
  'unpaid',
  'previous_due',
]);

export const subscriptionIntervalEnum = pgEnum('subscription_interval', [
  'day',
  'week',
  'month',
  'year',
]);

export const subscription = pgTable('subscription', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => user.id, {
    onDelete: 'cascade',
  }),
  amount: integer('amount'),
  currency: text('currency'),
  active: boolean('active'),
  status: subscriptionStatusEnum(),
  interval: subscriptionIntervalEnum(),
  subscriptionStart: timestamp(),
  subscriptionEnd: timestamp(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdateFn(() => new Date()),
});

export const paymentMethod = pgTable('payment_method', {
  id: text('id').primaryKey().notNull(),
  userId: text('user_id').references(() => user.id, {
    onDelete: 'cascade',
  }),
  metadata: json(),
  type: text('type'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdateFn(() => new Date()),
});
