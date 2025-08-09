'use client';
import { useRolePermission } from '@/contexts/rolePermissionContext';
import AddProductForm from '@/modules/product/AddProduct';
import {
  ApplicationModules,
  ModuleOperations,
} from '@invoice/enums/routeModule.enum';
import { AccessDeniedCard } from '@invoice/ui/PermissionDeniedCard';

function Page() {
  const { hasPermission } = useRolePermission();

  return hasPermission(
    `${ApplicationModules.product}:${ModuleOperations.create}`
  ) ? (
    <>
      <AddProductForm />
    </>
  ) : (
    <AccessDeniedCard />
  );
}

export default Page;
