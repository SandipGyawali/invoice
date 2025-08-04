'use client';
import { useRolePermission } from '@/contexts/rolePermissionContext';
import ProjectPage from './project';
import {
  ApplicationModules,
  ModuleOperations,
} from '@invoice/enums/routeModule.enum';
import { AccessDeniedCard } from '@invoice/ui/PermissionDeniedCard';

function Page() {
  const { hasPermission } = useRolePermission();

  return hasPermission(`${ApplicationModules.tax}:${ModuleOperations.list}`) ? (
    <ProjectPage />
  ) : (
    <AccessDeniedCard />
  );
}

export default Page;
