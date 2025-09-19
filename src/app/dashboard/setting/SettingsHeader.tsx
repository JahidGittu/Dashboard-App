'use client';

import { motion } from 'framer-motion';

export default function SettingsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-foreground-muted mt-2">
          Manage your account and preferences
        </p>
      </div>
    </motion.div>
  );
}
