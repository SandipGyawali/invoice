import { pgEnum } from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('status', ['1', '0']);
