'use client';

import { Shield } from 'lucide-react';
import UserCard from '../components/UserCard';

type Settings = {
  privacy: {
    profileVisible: boolean;
    activityTracking: boolean;
  };
};

type Props = {
  settings: Settings;
  setSettings: (s: Settings) => void;
};

export default function PrivacySettings({ settings, setSettings }: Props) {
  return (
    <UserCard className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center text-white">
          <Shield className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Privacy & Security</h2>
          <p className="text-foreground-muted text-sm">Manage your privacy settings</p>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(settings.privacy).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <div className="font-medium">
                {key === 'profileVisible' ? 'Profile Visibility' : 'Activity Tracking'}
              </div>
              <div className="text-sm text-foreground-muted">
                {key === 'profileVisible'
                  ? 'Make your profile visible to others'
                  : 'Allow activity tracking for analytics'}
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(value)} // ✅ safe conversion
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    privacy: {
                      ...settings.privacy,
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
        ))}
      </div>
    </UserCard>
  );
}
