'use client';
import { Tabs, TabsContent, TabsTrigger, TabsList } from '@invoice/ui/tabs';
import { User2 } from 'lucide-react';
import { usePathname, Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { IconAdjustments, IconEyeSearch } from '@tabler/icons-react';

function SettingsLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('Settings');
  const pathname = usePathname();

  return (
    <Tabs value={pathname}>
      <TabsList>
        <TabsTrigger asChild value="/admin/settings/profile">
          <div className="flex items-center">
            <User2 />
            <Link href="/settings/profile">{t('profile')}</Link>
          </div>
        </TabsTrigger>
        <TabsTrigger asChild value="/settings/general">
          <div className="flex items-center">
            <IconAdjustments />
            <Link href="/settings/general">{t('general')}</Link>
          </div>
        </TabsTrigger>

        <TabsTrigger asChild value="/settings/appearance">
          <div className="flex items-center">
            <IconEyeSearch />
            <Link href="/settings/appearance">{t('appearance')}</Link>
          </div>
        </TabsTrigger>

        <TabsTrigger asChild value="/settings/password">
          <div className="flex items-center">
            <IconEyeSearch />
            <Link href="/settings/password">{t('password')}</Link>
          </div>
        </TabsTrigger>
      </TabsList>

      <TabsContent className="mt-4" value={pathname}>
        {children}
      </TabsContent>
    </Tabs>
  );
}

export { SettingsLayout };
