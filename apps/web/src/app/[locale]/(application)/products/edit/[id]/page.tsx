'use client';
import { useRolePermission } from '@/contexts/rolePermissionContext';
import UpdateProductForm from '@/modules/product/UpdateProduct';
import {
  ApplicationModules,
  ModuleOperations,
} from '@invoice/enums/routeModule.enum';
import { AccessDeniedCard } from '@invoice/ui/PermissionDeniedCard';

function Page() {
  const { hasPermission } = useRolePermission();

  return hasPermission(
    `${ApplicationModules.product}:${ModuleOperations.update}`
  ) ? (
    <UpdateProductForm />
  ) : (
    <AccessDeniedCard />
  );
}

export default Page;
