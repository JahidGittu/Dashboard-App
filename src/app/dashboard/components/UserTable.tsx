// File: components/UserTable.tsx
import { motion } from 'framer-motion';
import { Building, Mail, Phone } from 'lucide-react';
import { User } from './UserModal';

type Props = {
  users: User[];
  onRowClick: (u: User) => void;
};

export default function UserTable({ users, onRowClick }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-card-border">
            <th className="text-left py-4 px-6 font-semibold">User</th>
            <th className="text-left py-4 px-6 font-semibold hidden md:table-cell">Contact</th>
            <th className="text-left py-4 px-6 font-semibold hidden lg:table-cell">Company</th>
            <th className="text-left py-4 px-6 font-semibold hidden lg:table-cell">Website</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <motion.tr
              key={user.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => onRowClick(user)}
              className="border-b border-card-border hover:bg-card-hover cursor-pointer transition-colors group"
            >
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {user.name
                        ?.split(' ')
                        .map((n) => n[0])
                        .filter(Boolean)
                        .join('') ?? 'U'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium group-hover:text-primary transition-colors">
                      {user.name}
                    </p>
                    <p className="text-sm text-foreground-muted">@{user.username ?? ''}</p>
                  </div>
                </div>
              </td>

              <td className="py-4 px-6 hidden md:table-cell">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-3 h-3 text-foreground-muted" />
                    {user.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground-muted">
                    <Phone className="w-3 h-3" />
                    {user.phone?.split(' ')[0] ?? ''}
                  </div>
                </div>
              </td>

              <td className="py-4 px-6 hidden lg:table-cell">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-foreground-muted" />
                  <span className="text-sm">{user.company?.name ?? ''}</span>
                </div>
              </td>

              <td className="py-4 px-6 hidden lg:table-cell">
                <span className="text-sm text-primary hover:underline">{user.website ?? ''}</span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
