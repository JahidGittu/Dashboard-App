'use client';
import { useState, useEffect } from 'react';

import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const AuthPageWrapper: React.FC<Props> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return <>{children}</>;
};

export default AuthPageWrapper;
