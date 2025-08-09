'use client';
import { useRolePermission } from '@/contexts/rolePermissionContext';
import ProductUnits from './units';
import {
  ApplicationModules,
  ModuleOperations,
} from '@invoice/enums/routeModule.enum';
import { AccessDeniedCard } from '@invoice/ui/PermissionDeniedCard';

function Page() {
  const { hasPermission } = useRolePermission();

  return hasPermission(
    `${ApplicationModules.unit}:${ModuleOperations.list}`
  ) ? (
    <ProductUnits />
  ) : (
    <AccessDeniedCard />
  );
}

export default Page;
