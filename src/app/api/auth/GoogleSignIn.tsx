"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const GoogleSignIn: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl: "/dashboard" });
    setLoading(false);
  };

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={loading}
      className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-border rounded-lg hover:bg-card-hover transition-colors mb-6 disabled:opacity-50"
    >
      <FcGoogle/>
      Continue with Google
    </button>
  );
};

export default GoogleSignIn;
