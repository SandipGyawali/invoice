'use client';
import { useRolePermission } from '@/contexts/rolePermissionContext';
import Products from './products';
import {
  ApplicationModules,
  ModuleOperations,
} from '@invoice/enums/routeModule.enum';
import { AccessDeniedCard } from '@invoice/ui/PermissionDeniedCard';

function Page() {
  const { hasPermission } = useRolePermission();

  return hasPermission(
    `${ApplicationModules.product}:${ModuleOperations.list}`
  ) ? (
    <Products />
  ) : (
    <AccessDeniedCard />
  );
}

export default Page;
