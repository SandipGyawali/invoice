import {
  PageContainer,
  PageContent,
  PageHeader,
  PageTitle,
} from '@/components/page-layout';
import { SettingsLayout } from '@/modules/shared/settings/settings-layout';
import { Button } from '@invoice/ui/button';
import { LogOut, SettingsIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

function Layout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('Settings');

  return (
    <PageContainer>
      <PageHeader>
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <PageTitle className="lg:text-2xl">
              <div className="p-2 bg-muted rounded-md">
                <SettingsIcon />
              </div>
              {t('settings')}
              {/* Settings */}
              {/* <Trans i18nKeys="settings" /> */}
            </PageTitle>
          </div>
          <div className="flex items-center gap-2">
            {/* <SignOutButton /> */}
            {/* <LogOut /> */}
            <Button className="group" variant="destructive">
              <LogOut
                className="-ms-1 opacity-60 transition-transform group-hover:-translate-x-0.5"
                size={16}
                aria-hidden="true"
              />
              {t('logout')}
            </Button>
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
