'use client';
import { useRolePermission } from '@/contexts/rolePermissionContext';
import TaxPage from './tax';
import {
  ApplicationModules,
  ModuleOperations,
} from '@invoice/enums/routeModule.enum';
import { AccessDeniedCard } from '@invoice/ui/PermissionDeniedCard';

function Page() {
  const rbac = useRolePermission();

  return rbac.hasPermission(
    `${ApplicationModules.tax}:${ModuleOperations.list}`
  ) ? (
    <TaxPage />
  ) : (
    <AccessDeniedCard />
  );
}

export default Page;
