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
            <Link href="/admin/settings/profile">{t('profile')}</Link>
          </div>
        </TabsTrigger>

        {/* <TabsTrigger asChild value="/admin/settings/menu">
          <Link href="/admin/settings/menu">Menu</Link>
        </TabsTrigger> */}

        <TabsTrigger asChild value="/admin/settings/general">
          <div className="flex items-center">
            <IconAdjustments />
            <Link href="/admin/settings/general">{t('general')}</Link>
          </div>
        </TabsTrigger>

        <TabsTrigger asChild value="/admin/settings/appearance">
          <div className="flex items-center">
            <IconEyeSearch />
            <Link href="/admin/settings/appearance">{t('appearance')}</Link>
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
