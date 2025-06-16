import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../models/index.ts';
// import { Logger } from "~/utils/logger";

/**
 * Cache the database connection in developer
 */
const globalForDb = globalThis as unknown as {
  conn: Pool | undefined;
};

const conn =
  globalForDb.conn ??
  new Pool({ connectionString: process.env.DB_URL, max: 1 });

if (process.env.NODE_ENV !== 'production') globalForDb.conn = conn;

export const db = drizzle(conn, { schema, logger: true });

/**
 * test db-connection
 */
export async function connectDb() {
  try {
    const client = await conn.connect();
    client.release();
  } catch (err) {
    console.error(err);
    // Logger.error(`Failed to establish database connection ${err}`);
    process.exit(1);
  }
}
