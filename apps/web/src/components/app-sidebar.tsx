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
import {
  ApplicationModules,
  ModuleOperations,
} from '@invoice/enums/routeModule.enum';
import { filterByPermission } from '@/utils/filterPermission';
import { useAuthStore } from '@/store/useAuthStore';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { info } = useAuthStore();
  const t = useTranslations('Sidebar');

  const data = {
    user: {
      name: info.user.name ?? '',
      email: info.user.email ?? '',
      avatar: '',
    },
    navMain: [
      {
        title: t('dashboard'),
        url: '/dashboard',
        icon: IconDashboard,
        permission: '',
      },
    ],
    modules: [
      {
        title: t('invoices'),
        url: '/invoices',
        icon: FileText,
        permission: `${ApplicationModules.invoice}:${ModuleOperations.list}`,
      },
      {
        title: t('quotations'),
        url: '/quotations',
        icon: FileText,
        permission: `${ApplicationModules.quotation}:${ModuleOperations.list}`,
      },

      {
        title: t('reports'),
        url: '/reports',
        icon: ReceiptText,
        permission: `${ApplicationModules.report}:${ModuleOperations.list}`,
      },
    ],
    navPermission: [
      {
        title: t('roles'),
        url: '/roles',
        icon: UserLock,
        permission: `${ApplicationModules.role}:${ModuleOperations.list}`,
      },
      {
        title: t('clients'),
        url: '/clients',
        icon: Users2,
        permission: `${ApplicationModules.client}:${ModuleOperations.list}`,
      },
    ],
    product: [
      {
        title: t('products'),
        url: '/products',
        icon: Package,
        permission: `${ApplicationModules.product}:${ModuleOperations.list}`,
      },
      {
        title: t('categories'),
        url: '/products/categories',
        icon: ChartBarStacked,
        permission: `${ApplicationModules.productCategory}:${ModuleOperations.list}`,
      },
      {
        title: t('units'),
        url: '/products/units',
        icon: Ruler,
        permission: `${ApplicationModules.unit}:${ModuleOperations.list}`,
      },
    ],
    tax: [
      {
        title: t('taxes'),
        url: '/tax',
        icon: BadgePercent,
        permission: `${ApplicationModules.tax}:${ModuleOperations.list}`,
      },
    ],
    projects: [
      {
        title: t('projects'),
        url: '/projects',
        icon: FolderOpenDot,
        permission: `${ApplicationModules.project}:${ModuleOperations.list}`,
      },
    ],
    navSecondary: [
      {
        title: t('settings'),
        url: '/settings',
        icon: IconSettings,
        permission: '',
      },
      {
        title: t('getHelp'),
        url: '#',
        icon: IconHelp,
        permission: '',
      },
    ],
  };

  const filteredNavMain = filterByPermission(data.navMain, info.permissions);
  const filteredModules = filterByPermission(data.modules, info.permissions);
  const filteredRolePermissions = filterByPermission(
    data.navPermission,
    info.permissions
  );
  const filteredProductCategoryUnits = filterByPermission(
    data.product,
    info.permissions
  );
  const filteredInvoiceTax = filterByPermission(data.tax, info.permissions);
  const filteredTaskProjects = filterByPermission(
    data.projects,
    info.permissions
  );

  const finalItems = {
    ...(filteredNavMain.length > 0 && {
      ['Main']: filterByPermission(data.navMain, info.permissions),
    }),
    ...(filteredModules.length > 0 && {
      ['Modules']: filterByPermission(data.modules, info.permissions),
    }),
    ...(filteredRolePermissions.length > 0 && {
      ['Roles & Permission']: filterByPermission(
        data.navPermission,
        info.permissions
      ),
    }),
    ...(filteredProductCategoryUnits.length > 0 && {
      ["Product, Category & It's Unit"]: filterByPermission(
        data.product,
        info.permissions
      ),
    }),
    ...(filteredInvoiceTax.length > 0 && {
      ['Invoice Tax']: filterByPermission(data.tax, info.permissions),
    }),
    ...(filteredTaskProjects.length > 0 && {
      ['Tasks & Projects']: filterByPermission(data.projects, info.permissions),
    }),
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
        <NavMain items={finalItems} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
