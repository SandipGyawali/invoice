'use client';
import { useRolePermission } from '@/contexts/rolePermissionContext';
import {
  ApplicationModules,
  ModuleOperations,
} from '@invoice/enums/routeModule.enum';
import { AccessDeniedCard } from '@invoice/ui/PermissionDeniedCard';
import dynamic from 'next/dynamic';

const PermissionSlugs = dynamic(() => import('./slug'), { ssr: false });

function Page() {
  const { hasPermission } = useRolePermission();

  return hasPermission(
    `${ApplicationModules.permission}:${ModuleOperations.list}`
  ) ? (
    <PermissionSlugs />
  ) : (
    <AccessDeniedCard />
  );
}
export default Page;
