'use client';

import { ReactNode } from 'react';

interface SettingCardProps {
  icon: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
}

export default function SettingCard({ icon, title, description, children }: SettingCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-900 text-white dark:bg-gray-700">
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div>{children}</div>
    </div>
  );
}
