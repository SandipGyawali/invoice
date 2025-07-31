import { AppSidebar } from '@/components/app-sidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import RolePermissionContextProvider from '@/contexts/rolePermissionContext';
import { SidebarInset, SidebarProvider } from '@invoice/ui/sidebar';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <RolePermissionContextProvider>
        <SidebarProvider
          style={
            {
              '--sidebar-width': 'calc(var(--spacing) * 72)',
              '--header-height': 'calc(var(--spacing) * 12)',
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="inset" />
          <SidebarInset>
            <div className="flex flex-1 flex-col">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </RolePermissionContextProvider>
    </ProtectedRoute>
  );
}
