'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode, useState } from 'react';
import { ThemeProvider } from '../Context/AuthContext/ThemeContext';
import { DashboardHeader } from '../dashboard/components/DashboardHeader';
import { Sidebar } from '../dashboard/components/Sidebar';
import PrivateRoute from '../Routes/PrivateRoute';

interface LayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SessionProvider>
      <ThemeProvider>
        <PrivateRoute>
          <div className="min-h-screen bg-background text-foreground flex w-full">
            {/* Sidebar */}
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
              <DashboardHeader collapsed={collapsed} setCollapsed={setCollapsed} />
              <main className="flex-1 p-6 overflow-auto">{children}</main>
            </div>
          </div>
        </PrivateRoute>
      </ThemeProvider>
    </SessionProvider>
  );
}
