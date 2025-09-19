'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import SettingsHeader from './SettingsHeader';
import ProfileSettings from './ProfileSettings';
import NotificationSettings from './NotificationSettings';
import PrivacySettings from './PrivacySettings';
import SaveButton from './SaveButton';
import { saveToStorage, getFromStorage } from '@/utils/storage';

export default function SettingsPage() {
  const { data: session, status } = useSession();

  const [settings, setSettings] = useState(() =>
    getFromStorage("user-settings", {
      notifications: { email: true, push: false, marketing: false },
      privacy: { profileVisible: true, activityTracking: false },
      preferences: { darkMode: true, language: 'en', timezone: 'UTC' },
    })
  );

  const handleSave = () => {
    saveToStorage("user-settings", settings);
    console.log("Settings saved:", settings);
  };

  useEffect(() => {
    saveToStorage("user-settings", settings);
  }, [settings]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Please log in to access settings.</div>;
  }

  const user = session?.user;

  return (
    <div className="space-y-6">
      <SettingsHeader />
      <div className="grid gap-6">
        <ProfileSettings user={user} />
        <NotificationSettings settings={settings} setSettings={setSettings} />
        <PrivacySettings settings={settings} setSettings={setSettings} />
        <SaveButton onClick={handleSave} />
      </div>
    </div>
  );
}
