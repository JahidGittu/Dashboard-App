'use client';

import { motion } from 'framer-motion';
import { ChevronDown, LogOut, PanelLeftClose, PanelLeftOpen, Settings } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import ThemeSwitch from './ThemeSwitch';

interface DashboardHeaderProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

export function DashboardHeader({ collapsed, setCollapsed }: DashboardHeaderProps) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: session } = useSession();
  const user = session?.user;

  const router = useRouter();

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 🔹 Logout with SweetAlert2
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
    });

    if (result.isConfirmed) {
      await signOut({ callbackUrl: '/api/auth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 bg-card backdrop-blur-sm border-b border-card-border px-6 py-4 flex items-center justify-between"
    >
      {/* Left: Sidebar Toggle + Logo */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {collapsed ? (
            <PanelLeftOpen className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </button>
      </div>

      <div>
        <h1 className="text-accent-foreground font-bold text-3xl"> Simple Dashboard </h1>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Theme Switch */}
        <div className="scale-46 -mr-12 -ml-7">
          <ThemeSwitch />
        </div>

        {/* Profile Dropdown */}
        <div className="relative ml-3" ref={dropdownRef}>
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center gap-3 bg-green-600 hover:bg-green-700 rounded-lg p-2 transition"
          >
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {user?.name
                  ? (() => {
                      const words = user.name.split(' ').filter(Boolean);
                      if (words.length > 1) {
                        return words
                          .map((w) => w.charAt(0))
                          .join('')
                          .toUpperCase();
                      } else {
                        return words[0].charAt(0).toUpperCase();
                      }
                    })()
                  : 'U'}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-foreground-muted" />
          </button>

          {showProfileDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full right-0 mt-2 w-56 bg-card border border-card-border rounded-lg shadow-lg z-50"
            >
              <div className="p-3 border-b border-border">
                <div className="font-medium">{user?.name || 'Guest User'}</div>
                <div className="text-sm text-foreground-muted">{user?.email || ''}</div>
              </div>

              <div className="p-1">
                <Link href="/dashboard/setting">
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-secondary rounded-md transition-colors cursor-pointer">
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                </Link>
                <div className="border-t border-border my-1" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center bg-card-foreground/30 gap-3 px-3 py-2 text-sm text-error hover:bg-error/10 rounded-md transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
