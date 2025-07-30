'use client';
import * as React from 'react';
import {
  IconDashboard,
  IconHelp,
  IconInnerShadowTop,
  IconSettings,
} from '@tabler/icons-react';
import { NavMain } from '@/components/nav-main';
import { NavUser } from './nav-user';
import { NavSecondary } from './nav-secondary';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@invoice/ui/sidebar';
import {
  BadgePercent,
  ChartBarStacked,
  FileText,
  FolderOpenDot,
  Package,
  ReceiptText,
  Ruler,
  UserLock,
  Users2,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations('Sidebar');

  const data = {
    user: {
      name: 'Sandip',
      email: 'sandip@gmail.com',
      avatar: '',
    },
    navMain: [
      {
        title: t('dashboard'),
        url: '/dashboard',
        icon: IconDashboard,
      },
    ],
    modules: [
      {
        title: t('invoices'),
        url: '/invoices',
        icon: FileText,
      },
      {
        title: t('quotations'),
        url: '/quotations',
        icon: FileText,
      },

      {
        title: t('reports'),
        url: '/reports',
        icon: ReceiptText,
      },
    ],
    navPermission: [
      {
        title: t('roles'),
        url: '/roles',
        icon: UserLock,
      },
      {
        title: t('clients'),
        url: '/clients',
        icon: Users2,
      },
    ],
    product: [
      {
        title: t('products'),
        url: '/products',
        icon: Package,
      },
      {
        title: t('categories'),
        url: '/products/categories',
        icon: ChartBarStacked,
      },
      {
        title: t('units'),
        url: '/products/units',
        icon: Ruler,
      },
    ],
    tax: [
      {
        title: t('taxes'),
        url: '/tax',
        icon: BadgePercent,
      },
    ],
    projects: [
      {
        title: t('projects'),
        url: '/projects',
        icon: FolderOpenDot,
      },
    ],
    navSecondary: [
      {
        title: t('settings'),
        url: '/settings',
        icon: IconSettings,
      },
      {
        title: t('getHelp'),
        url: '#',
        icon: IconHelp,
      },
    ],
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">INVOICE</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={{
            ['Main']: data.navMain,
            ['Modules']: data.modules,
            ['Roles & Permission']: data.navPermission,
            ["Product, Category & It's Unit"]: data.product,
            ['Invoice Tax']: data.tax,
            ['Tasks & Projects']: data.projects,
          }}
        />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
