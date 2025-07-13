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
  FileText,
  Package,
  ReceiptText,
  UserLock,
  UserRound,
  Users2,
} from 'lucide-react';

const data = {
  user: {
    name: 'Sandip',
    email: 'sandip@gmail.com',
    avatar: '',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: IconDashboard,
    },
  ],
  modules: [
    {
      title: 'Invoices',
      url: '/invoices',
      icon: FileText,
    },
    {
      title: 'Quotation',
      url: '/quotations',
      icon: FileText,
    },
    {
      title: 'Products',
      url: '/products',
      icon: Package,
    },
    {
      title: 'Products',
      url: '/reports',
      icon: ReceiptText,
    },
  ],
  navPermission: [
    {
      title: 'Roles',
      url: '/roles',
      icon: UserLock,
    },
    {
      title: 'Clients',
      url: '/clients',
      icon: Users2,
    },
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '/settings',
      icon: IconSettings,
    },
    {
      title: 'Get Help',
      url: '#',
      icon: IconHelp,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
