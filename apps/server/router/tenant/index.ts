import { trpc } from '../../lib/trpc.ts';
import { addTenantRoute } from './add.tenant.route.ts';
import { listTenantRoute } from './list.tenant.route.ts';

export const tenantRouter = trpc.router({
  addTenant: addTenantRoute,
  listTenant: listTenantRoute,
});
