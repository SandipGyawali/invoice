'use client';
import {
  PageContainer,
  PageContent,
  PageHeader,
  PageTitle,
} from '@/components/page-layout';
import { RolePermissionContext } from '@/contexts/rolePermissionContext';
import { useTRPC } from '@/utils/trpc';
import { Checkbox } from '@invoice/ui/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@invoice/ui/collapsible';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@invoice/ui/form';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent } from '@invoice/ui/card';
import { formatDate } from '@/utils/formatDate';
import { Badge } from '@invoice/ui/badge';
import Loader from '@/components/Loader';
import { usePermissionStore } from '@/store/permissionStore';
import { Button } from '@invoice/ui/button';

function ModulePermission({
  module,
  permission,
  openSections,
  toggleSection,
  getPermissionType,
  setPermission,
  removePermission,
  includesPermission,
}: {
  openSections: any;
  toggleSection: any;
  module: any;
  permission: any;
  getPermissionType: any;
  setPermission: (id: number) => void;
  removePermission: (id: number) => void;
  includesPermission: (id: number) => boolean;
}) {
  const form = useForm();

  return (
    <Form {...form}>
      <form>
        <Collapsible
          key={module}
          defaultOpen={false}
          open={openSections[module]}
          onOpenChange={() => toggleSection(module)}
          className="border dark:border-white/25 rounded-lg p-2"
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 font-semibold">
            <span className="capitalize">{module}</span>
            {openSections[module] ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2">
            {permission?.map((prm, idx) => {
              return (
                <FormField
                  key={`collapsible-${prm.id}`}
                  control={form.control}
                  name={`permissions.permission_${permission.id}`}
                  render={({ field }) => (
                    <FormItem className="ml-4 p-2 flex flex-row items-start space-x-2">
                      <FormControl>
                        <Checkbox
                          defaultChecked={includesPermission(prm.id)}
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setPermission(prm.id);
                            } else {
                              removePermission(prm.id);
                            }
                          }}
                        />
                      </FormControl>
                      <div className="flex flex-col">
                        <FormLabel className="text-sm font-medium">
                          {prm.description || 'No description available'}
                        </FormLabel>
                        <span className="text-xs text-muted-foreground">
                          Type: {getPermissionType(permission.slug)}
                        </span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })}
          </CollapsibleContent>
        </Collapsible>
      </form>
    </Form>
  );
}

function RoleCard({ role }: { role: typeof roleData }) {
  return (
    <Card className="w-full border-l-4 border-r-4 border-transparent border-l-primary border-r-primary p-0 m-0">
      <CardContent className="space-y-2 text-sm">
        <div>
          <span className="font-medium">Name:</span> {role?.name}
        </div>
        <div>
          <span className="font-medium">ID:</span> {role?.id}
        </div>
        <div>
          <span className="font-medium">Status:</span>{' '}
          <Badge
            className={`px-2 py-1 rounded text-white text-xs ${
              role?.status === '1' ? 'bg-primary text-black' : 'bg-red-500'
            }`}
          >
            {role?.status === '1' ? 'Active' : 'Inactive'}
          </Badge>
        </div>
        <div>
          <span className="font-medium">Created At:</span>{' '}
          {role?.createdAt ? formatDate(role.createdAt) : 'N/A'}
        </div>
        <div>
          <span className="font-medium">Tenant ID:</span>{' '}
          {role?.tenantId || 'N/A'}
        </div>
      </CardContent>
    </Card>
  );
}

function Page() {
  const trpc = useTRPC();
  const params = useParams();
  const permissionData = useContext(RolePermissionContext);
  const [openSections, setOpenSections] = React.useState<
    Record<string, boolean>
  >({});
  const [roleData, setRoleData] = useState(null);
  const queryParams = {
    tenantId: 'e1065a8c',
    roleId: Number(params.slug ?? 0),
  };
  const {
    data: roleList,
    isSuccess: roleFetchSuccess,
    isLoading: roleIsLoading,
  } = useQuery(trpc.roles.tenantRoles.queryOptions(queryParams));
  const {
    data: assignedPermissionList,
    isLoading: assignedRolePermissionLoading,
    isSuccess: assignedRolePermissionSuccess,
  } = useQuery(trpc.roles.rolePermissions.queryOptions(queryParams));
  const {
    ids: permissionStoreIds,
    setPermission,
    removePermission,
  } = usePermissionStore();

  console.log(permissionStoreIds);

  useEffect(() => {
    if (roleFetchSuccess) {
      setRoleData(roleList?.[0] as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleFetchSuccess]);

  useEffect(() => {
    assignedPermissionList?.forEach((id) => setPermission(id.permissionId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignedRolePermissionSuccess]);

  const toggleSection = (section: string): void => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  function includesPermission(id: number): boolean {
    const includesPermission = permissionStoreIds.find((val) => val === id);
    if (includesPermission) return true;
    return false;
  }

  const getPermissionType = (slug: string): string => {
    if (!slug) return 'Unknown';
    const action = slug.split('_')[1]?.toLowerCase();
    if (!action) return 'Unknown';
    if (action.startsWith('in')) return 'Query';
    if (action.startsWith('up')) return 'Update';
    if (action.startsWith('login')) return 'Authentication';
    if (action.startsWith('user')) return 'User Management';
    return 'Other';
  };

  if (roleIsLoading && assignedRolePermissionLoading)
    return <Loader className="w-full h-full" />;

  return (
    <PageContainer className="max-w-5xl">
      <PageHeader className="mb-8">
        <PageTitle className="md:text-2xl">Role Permissions.</PageTitle>
      </PageHeader>

      {roleData && <RoleCard role={roleData} />}

      <PageContent className=" flex flex-col gap-4">
        {Array.from(permissionData?.permission?.entries() || []).map(
          ([module, permission], idx) => {
            return (
              <ModulePermission
                openSections={openSections}
                key={`${module}-${idx}`}
                module={module}
                permission={permission}
                toggleSection={toggleSection}
                getPermissionType={getPermissionType}
                setPermission={setPermission}
                removePermission={removePermission}
                includesPermission={includesPermission}
              />
            );
          }
        )}
      </PageContent>

      <div className="flex items-end justify-end mt-5">
        <Button
          onClick={() => {
            // assign permission mutation
          }}
        >
          Assign Permission
        </Button>
      </div>
    </PageContainer>
  );
}

export default Page;
