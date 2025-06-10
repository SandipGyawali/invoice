import { db } from '../../db/db.ts';
import { trpc } from '../../lib/trpc.ts';
import { tenants } from '../../models/tenant.ts';

export const listTenantRoute = trpc.procedure.query(async () => {
  const result = await db.select().from(tenants);

  return {
    message: 'Tenant List fetched Successfully',
    data: result,
  };
});
