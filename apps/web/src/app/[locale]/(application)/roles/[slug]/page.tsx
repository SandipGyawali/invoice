'use client';
import {
  PageContainer,
  PageContent,
  PageHeader,
  PageTitle,
} from '@/components/page-layout';
import { RolePermissionContext } from '@/contexts/rolePermissionContext';
import { useParams } from 'next/navigation';
import { useContext, useState } from 'react';

function ModulePermission() {
  return <>This is module based permission</>;
}

function Page() {
  const params = useParams();
  const permissionData = useContext(RolePermissionContext);

  console.log(permissionData?.permission);

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle className="md:text-2xl">Role Permissions</PageTitle>
      </PageHeader>
      <PageContent>
        {/* {permissionData?.permission?.entries()?.map((module, idx) => {
          <ModulePermission key={Object.keys(module[idx]).at(0)} />;
        })} */}
      </PageContent>
    </PageContainer>
  );
}

export default Page;
