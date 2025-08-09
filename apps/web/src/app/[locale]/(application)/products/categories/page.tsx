'use client';
import { useRolePermission } from '@/contexts/rolePermissionContext';
import ProductCategories from './categories';
import {
  ApplicationModules,
  ModuleOperations,
} from '@invoice/enums/routeModule.enum';
import { AccessDeniedCard } from '@invoice/ui/PermissionDeniedCard';

function Page() {
  const { hasPermission } = useRolePermission();

  return hasPermission(
    `${ApplicationModules.productCategory}:${ModuleOperations.list}`
  ) ? (
    <ProductCategories />
  ) : (
    <AccessDeniedCard />
  );
}

export default Page;
