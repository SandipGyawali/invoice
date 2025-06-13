import { boolean, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';

export const instanceSettings = pgTable('instance_settings', {
  id: serial().primaryKey(),
  disableUserRegistration: boolean('disable_user_registration').default(false),
  createdAt: timestamp('created_at').$defaultFn(() => new Date()),
  updatedAt: timestamp('updated_at').$onUpdateFn(() => new Date()),
});
