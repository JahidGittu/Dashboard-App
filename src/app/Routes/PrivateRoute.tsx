'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { LoadingSpinner } from '../dashboard/components/Loading';

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const router = useRouter();

  // required:true automatically redirects unauthenticated users
  const { data: session, status } = useSession({ required: true, onUnauthenticated() {
    router.replace('/api/auth'); // redirect to login page
  }});

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // Extra safety: if somehow session is missing
  if (!session) {
    router.replace('/api/auth');
    return null;
  }

  return <>{children}</>;
}
