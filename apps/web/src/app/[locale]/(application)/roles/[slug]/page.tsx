'use client';
import {
  PageContainer,
  PageContent,
  PageHeader,
  PageTitle,
} from '@/components/page-layout';

function Page() {
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle className="md:text-2xl">Role Permissions</PageTitle>
      </PageHeader>
      <PageContent>Hello this is authenticated page content.</PageContent>
    </PageContainer>
  );
}

export default Page;
