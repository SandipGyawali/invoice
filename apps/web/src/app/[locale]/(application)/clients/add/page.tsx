'use client';
import { useRolePermission } from '@/contexts/rolePermissionContext';
import AddClientForm from '@/modules/client/AddClient';
import {
  ApplicationModules,
  ModuleOperations,
} from '@invoice/enums/routeModule.enum';
import { AccessDeniedCard } from '@invoice/ui/PermissionDeniedCard';

function Page() {
  const { hasPermission } = useRolePermission();

  return hasPermission(
    `${ApplicationModules.client}:${ModuleOperations.create}`
  ) ? (
    <AddClientForm />
  ) : (
    <AccessDeniedCard />
  );
}

export default Page;
