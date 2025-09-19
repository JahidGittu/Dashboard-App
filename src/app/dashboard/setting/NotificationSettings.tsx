'use client';

import { Bell } from 'lucide-react';
import UserCard from '../components/UserCard';

type Props = {
  settings: any;
  setSettings: (s: any) => void;
};

export default function NotificationSettings({ settings, setSettings }: Props) {
  return (
    <UserCard className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
          <Bell className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Notifications</h2>
          <p className="text-foreground-muted text-sm">Configure your notification preferences</p>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(settings.notifications).map(([key, value]) => {
          const checked = Boolean(value); // force boolean
          return (
            <div key={key} className="flex items-center justify-between">
              <div>
                <div className="font-medium capitalize">{key} Notifications</div>
                <div className="text-sm text-foreground-muted">Receive {key} notifications</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        [key]: e.target.checked,
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div
                  className="w-11 h-6 bg-gray-400 peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer
    peer-checked:bg-gray-400 
    after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white 
    peer-checked:after:bg-green-500 after:rounded-full after:h-5 after:w-5 after:transition-all 
    peer-checked:after:translate-x-full"
                ></div>
              </label>
            </div>
          );
        })}
      </div>
    </UserCard>
  );
}
