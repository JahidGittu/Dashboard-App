'use client';

import { ClipboardList, Home, LayoutDashboardIcon, LogOut, User } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Swal, { SweetAlertResult } from 'sweetalert2';

interface SidebarProps {
  collapsed?: boolean;
  setCollapsed?: (value: boolean) => void;
}

// Nav Items
const navItems = [
  { href: '/dashboard', icon: Home, label: 'Dashboard', color: 'text-success' },
  { href: '/dashboard/posts', icon: ClipboardList, label: 'Posts', color: 'text-purple-500' },
  { href: '/dashboard/users', icon: User, label: 'Users', color: 'text-blue-500' },
  { href: '/dashboard/setting', icon: User, label: 'Profile', color: 'text-primary' },
];

export function Sidebar({
  collapsed: collapsedProp,
  setCollapsed: setCollapsedProp,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState<boolean>(
    collapsedProp ?? (typeof window !== 'undefined' ? window.innerWidth < 768 : false)
  );
  const [width, setWidth] = useState<number>(collapsed ? 70 : 240);
  const [dragging, setDragging] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const pathname = usePathname();

  const router = useRouter();

  // 🔹 Logout handler with SweetAlert + NextAuth
  const handleLogout = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will be logged out!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, logout!',
  }).then((result: SweetAlertResult) => {
    if (result.isConfirmed) {
      signOut({ redirect: false })
        .then(() => {
          router.push("/api/auth"); // 
          Swal.fire('Logged Out!', 'You have been logged out.', 'success');
        })
        .catch((err) => console.error(err));
    }
  });
};


  // Sync with parent
  useEffect(() => {
    if (collapsedProp !== undefined) {
      setCollapsed(collapsedProp);
      setWidth(collapsedProp ? 70 : 240);
    }
  }, [collapsedProp]);

  // Responsive resize
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setCollapsed(isMobile);
      setWidth(isMobile ? 70 : 240);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Drag-to-resize
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragging && sidebarRef.current) {
        document.body.style.userSelect = 'none';
        let newWidth = e.clientX - sidebarRef.current.getBoundingClientRect().left;
        if (newWidth < 70) newWidth = 70;
        if (newWidth > 300) newWidth = 240;
        setWidth(newWidth);
        const newCollapsed = newWidth < 100;
        setCollapsed(newCollapsed);
        if (setCollapsedProp) setCollapsedProp(newCollapsed);
      }
    };
    const handleMouseUp = () => {
      setDragging(false);
      document.body.style.userSelect = 'auto';
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'auto';
    };
  }, [dragging, setCollapsedProp]);

  // Toggle
  const toggleCollapsed = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    setWidth(newCollapsed ? 70 : 240);
    if (setCollapsedProp) setCollapsedProp(newCollapsed);
  };

  return (
    <aside
      ref={sidebarRef}
      className="bg-card/80 border-r h-screen sticky top-0 transition-all duration-300 flex flex-col justify-between"
      style={{ width: `${width}px`, flexShrink: 0 }}
    >
      <div>
        {/* Toggle button */}
        <button
          onClick={toggleCollapsed}
          className="w-full flex items-center py-[29px] bg-card/80 backdrop-blur-sm border-b border-card-border justify-center text-sm font-medium"
        >
          <LayoutDashboardIcon />
        </button>

        {/* Navigation Links */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center rounded-lg transition-colors ${
                  isActive
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-500'
                } ${collapsed ? 'justify-center px-0 py-3' : 'space-x-3 px-4 py-3'}`}
              >
                <Icon className={`h-5 w-5 ${item.color}`} />
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* 🔹 Logout button */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg py-2 hover:scale-105 transition-transform"
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && 'Logout'}
        </button>
      </div>

      {/* Drag Handle */}
      <div
        onMouseDown={() => setDragging(true)}
        className={`w-1 cursor-col-resize h-full absolute right-0 top-0 z-10 ${
          dragging ? 'bg-indigo-500' : 'hover:bg-indigo-300'
        }`}
      />
    </aside>
  );
}
