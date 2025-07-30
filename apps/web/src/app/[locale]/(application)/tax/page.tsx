'use client';
import { useRolePermission } from '@/contexts/rolePermissionContext';
import TaxPage from './tax';
import { ApplicationModules, ModuleOperations } from '@/enums/routeModule.enum';
import { PermissionDeniedCard } from '@invoice/ui/PermissionDeniedCard';

function Page() {
  const rbac = useRolePermission();

  return rbac.hasPermission(
    `${ApplicationModules.tax}:${ModuleOperations.view}`
  ) ? (
    <TaxPage />
  ) : (
    <PermissionDeniedCard />
  );
}

export default Page;
