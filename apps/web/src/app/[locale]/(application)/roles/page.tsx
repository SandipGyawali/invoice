'use client';
import { useRolePermission } from '@/contexts/rolePermissionContext';
import RolesPage from './roles';
import {
  ApplicationModules,
  ModuleOperations,
} from '@invoice/enums/routeModule.enum';
import { AccessDeniedCard } from '@invoice/ui/PermissionDeniedCard';

function Page() {
  const { hasPermission } = useRolePermission();

  return hasPermission(
    `${ApplicationModules.role}:${ModuleOperations.list}`
  ) ? (
    <RolesPage />
  ) : (
    <AccessDeniedCard />
  );
}

export default Page;
