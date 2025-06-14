import { dbConnection } from './conn';
import { seed } from 'drizzle-seed';

export async function seedUsers() {
  const db = dbConnection();

  console.info('Seeding users...');

  //   const user = await

  console.info(`✓ Seeded user`);
}
