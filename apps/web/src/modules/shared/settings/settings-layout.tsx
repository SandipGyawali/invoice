'use client';
import { usePathname } from 'next/navigation';
import { Tabs, TabsContent, TabsTrigger, TabsList } from '@invoice/ui/tabs';
import Link from 'next/link';
import { User2 } from 'lucide-react';

function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <Tabs value={pathname}>
      <TabsList>
        <TabsTrigger asChild value="/admin/settings/profile">
          <div className="flex items-center">
            <User2 />
            <Link href="/admin/settings/profile" className="">
              Profile
            </Link>
          </div>
        </TabsTrigger>

        <TabsTrigger asChild value="/admin/settings/menu">
          <Link href="/admin/settings/menu">Menu</Link>
        </TabsTrigger>

        <TabsTrigger asChild value="/admin/settings/general">
          <Link href="/admin/settings/general">General</Link>
        </TabsTrigger>

        <TabsTrigger asChild value="/admin/settings/appearance">
          <Link href="/admin/settings/appearance">Appearance</Link>
        </TabsTrigger>
      </TabsList>

      <TabsContent className="mt-4" value={pathname}>
        {children}
      </TabsContent>
    </Tabs>
  );
}

export { SettingsLayout };
