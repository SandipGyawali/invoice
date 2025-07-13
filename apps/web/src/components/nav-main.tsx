'use client';

import { type Icon } from '@tabler/icons-react';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@invoice/ui/sidebar';
import { Link } from '@/i18n/navigation';

interface Item {
  title: string;
  url: string;
  icon?: Icon;
}

interface Items {
  [key: string]: Item[];
}

interface NavMainProps {
  items: Items;
}

export function NavMain({ items }: NavMainProps) {
  return (
    <>
      {Object.entries(items).map(([sectionName, sectionItems], idx) => (
        <SidebarGroup key={`${sectionName}-${idx}`}>
          <SidebarGroupContent className="flex flex-col">
            <SidebarGroupLabel>{sectionName}</SidebarGroupLabel>
            <SidebarMenu>
              {sectionItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
