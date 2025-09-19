'use client';

import { motion } from 'framer-motion';
import { Save } from 'lucide-react';

export default function SaveButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center gap-2 bg-gradient-primary text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity ml-auto"
    >
      <Save className="w-4 h-4" />
      Save Changes
    </motion.button>
  );
}
