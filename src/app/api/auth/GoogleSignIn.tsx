'use client';

import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

const GoogleSignIn: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    await signIn('google', { callbackUrl: '/dashboard' });
    setLoading(false);
  };

  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-border rounded-lg bg-card-foreground/40 hover:bg-card-foreground/30 transition-colors mb-6 disabled:opacity-50"
      >
        <FcGoogle />
        Continue with Google
      </button>

      <div className="flex items-center justify-center gap-4">
        <div className="h-[1px] flex-1 bg-green-900/40"></div>
        <span className="text-accent-foreground text-sm font-medium">OR</span>
        <div className="h-[1px] flex-1 bg-green-900/40"></div>
      </div>
    </div>
  );
};

export default GoogleSignIn;
