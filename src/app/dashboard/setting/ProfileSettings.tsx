'use client';

import UserCard from '../components/UserCard';

export default function ProfileSettings({ user }: { user: any }) {
  return (
    <UserCard className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-card-foreground/30 rounded-lg flex items-center justify-center">
          <span className="text-accent-foreground font-bold">
            {user?.name
              ?.split(' ')
              .map((w: string, i: number) => (i < 2 ? w[0] : ''))
              .join('')
              .toUpperCase() || 'U'}
          </span>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Profile Settings</h2>
          <p className="text-foreground-muted text-sm">Update your profile information</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            value={user?.name || ''}
            disabled
            className="w-full px-3 py-2 bg-input border border-border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={user?.email || ''}
            disabled
            className="w-full px-3 py-2 bg-input border border-border rounded-lg"
          />
        </div>
      </div>
    </UserCard>
  );
}
