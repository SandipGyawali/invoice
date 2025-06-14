// lib/db.ts

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

let dbInstance: NodePgDatabase | null = null;

export function dbConnection(): NodePgDatabase {
  if (!dbInstance) {
    const pool = new Pool({
      connectionString: process.env.DB_URL!,
    });

    dbInstance = drizzle(pool);
  }

  return dbInstance;
}
