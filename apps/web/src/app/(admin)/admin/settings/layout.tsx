import {
  PageContainer,
  PageContent,
  PageHeader,
  PageTitle,
} from '@/components/page-layout';
import { SettingsLayout } from '@/modules/shared/settings/settings-layout';
import { LogOut, SettingsIcon } from 'lucide-react';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageContainer>
      <PageHeader>
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <PageTitle>
              <div className="p-2 bg-muted rounded-md">
                <SettingsIcon />
              </div>
              Settings
              {/* <Trans i18nKeys="settings" /> */}
            </PageTitle>
          </div>
          <div className="flex items-center gap-2">
            {/* <SignOutButton /> */}
            <LogOut />
          </div>
        </div>
      </PageHeader>
      <PageContent>
        <SettingsLayout>{children}</SettingsLayout>
      </PageContent>
    </PageContainer>
  );
}

export default Layout;
