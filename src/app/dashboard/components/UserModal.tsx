// File: components/UserModal.tsx
import { motion } from 'framer-motion';
import { Building, Mail, Phone } from 'lucide-react';

type Address = {
  street?: string;
  suite?: string;
  city?: string;
  zipcode?: string;
};

type Company = {
  name?: string;
  catchPhrase?: string;
  bs?: string;
};

export type User = {
  id: number;
  name: string;
  username?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: Address;
  company?: Company;
};

type Props = {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function UserModal({ user, isOpen, onClose }: Props) {
  if (!isOpen || !user) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 
                 bg-black/40 backdrop-blur-sm transition-all"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="max-w-xl w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400" />
            <a className="text-sm hover:underline" href={`mailto:${user.email}`}>
              {user.email}
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-400" />
            <span className="text-sm">{user.phone}</span>
          </div>

          {user.company && (
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-gray-400" />
              <div className="text-sm">
                <div className="font-medium">{user.company.name}</div>
                {user.company.catchPhrase && (
                  <div className="text-gray-500 dark:text-gray-400">{user.company.catchPhrase}</div>
                )}
              </div>
            </div>
          )}

          {user.address && (
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm font-medium">Address</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {user.address.street ?? ''} {user.address.suite ?? ''}, {user.address.city ?? ''}{' '}
                {user.address.zipcode ?? ''}
              </div>
            </div>
          )}

          {user.website && (
            <div className="pt-2">
              <a
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                href={`http://${user.website}`}
                target="_blank"
                rel="noreferrer"
              >
                {user.website}
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
