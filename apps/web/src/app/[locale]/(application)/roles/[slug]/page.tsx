'use client';
import {
  PageContainer,
  PageContent,
  PageHeader,
  PageTitle,
} from '@/components/page-layout';
import { useTRPC } from '@/utils/trpc';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from '@/i18n/navigation';

function Page() {
  const trpc = useTRPC();
  const router = useRouter();
  const { data: permissionList } = useQuery(
    trpc.permissions.getPermissionSlugs.queryOptions()
  );

  console.log(permissionList);

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle className="md:text-2xl">Role Permissions</PageTitle>
      </PageHeader>
      <PageContent></PageContent>
    </PageContainer>
  );
}

export default Page;
