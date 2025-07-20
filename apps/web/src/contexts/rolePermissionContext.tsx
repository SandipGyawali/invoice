'use client';
import Loader from '@/components/Loader';
import { useTRPC } from '@/utils/trpc';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useMemo } from 'react';

interface Permission {
  id: number;
  slug: string;
  description: string;
  createdAt: string;
  status: string;
  statusFTR: string;
}

// interface GroupPermissionInterface {
//   groupedPermission: Array<{
//     title: string;
//     slugs: Array<Permission>;
//   }>;
// }

// Context Type
interface RolePermissionContextType {
  permission: Map<string, Permission[]>;
  //   hasPermission: (slug: string) => boolean;
}

export const RolePermissionContext =
  createContext<RolePermissionContextType | null>(null);

// custom hook to use the context
export function useRolePermission() {
  const context = useContext(RolePermissionContext);

  if (!context) {
    throw new Error(
      'Role Permission must be used withing RolePermissionContextProvider'
    );
  }
  return context;
}

// context provider mapped with the rbac permission slugs
function RolePermissionContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const trpc = useTRPC();
  const router = useRouter();
  const {
    data: permissionList,
    isLoading,
    isSuccess,
  } = useQuery(trpc.permissions.getPermissionSlugs.queryOptions());

  // map the protected routes with the permission slugs
  const permissionModules = useMemo(() => {
    const map = new Map<string, Array<any>>();
    const moduleSet = new Set<string>();

    permissionList?.forEach((permission) => {
      const _module = permission.slug?.split(':')[0] ?? '';
      moduleSet.add(_module);

      if (map.has(_module)) {
        const getPreviousMappedValue = (map.get(_module) as Array<any>) ?? [];
        getPreviousMappedValue?.push(permission);
        map.set(_module, getPreviousMappedValue);
      } else {
        map.set(_module, new Array(permission));
      }
    });

    return map;
  }, [permissionList]);

  const value = {
    permission: permissionModules,
  };

  if (!value.permission) {
    router.replace('/login');
    return;
  }

  if (isLoading && !isSuccess) {
    return <Loader />;
  }

  return (
    <RolePermissionContext.Provider value={value}>
      {children}
    </RolePermissionContext.Provider>
  );
}

export default RolePermissionContextProvider;
