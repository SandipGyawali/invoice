'use client';
import { useRolePermission } from '@/contexts/rolePermissionContext';
import Clients from './clients';
import {
  ApplicationModules,
  ModuleOperations,
} from '@invoice/enums/routeModule.enum';
import { AccessDeniedCard } from '@invoice/ui/PermissionDeniedCard';

function Page() {
  const { hasPermission } = useRolePermission();

  return hasPermission(
    `${ApplicationModules.client}:${ModuleOperations.list}`
  ) ? (
    <Clients />
  ) : (
    <AccessDeniedCard />
  );
}

export default Page;
