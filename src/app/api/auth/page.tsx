'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';
import SignInForm from './[...nextauth]/SignIn/SignInForm';
import AuthPageWrapper from './AuthPageWrapper';
import GoogleSignIn from './GoogleSignIn';
import SignUpForm from './SignUp/SignUpForm';

const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <AuthPageWrapper>
      <div className="min-h-screen bg-card-foreground/20 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-foreground-muted mt-2">
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </p>
          </div>

          {/* Auth Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-card-foreground/30 border border-card-border rounded-2xl p-8 shadow-lg backdrop-blur-sm"
          >
            {/* Tab Switcher */}
            <div className="flex bg-secondary rounded-lg p-1 mb-6">
              <button
                onClick={() => setIsSignUp(false)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  !isSignUp
                    ? 'bg-card-foreground/40 text-foreground shadow-sm'
                    : 'text-foreground-muted hover:text-foreground'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  isSignUp
                    ? 'bg-card-foreground/40 text-foreground shadow-sm'
                    : 'text-foreground-muted hover:text-foreground'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Google SignIn */}
            <GoogleSignIn />

            {/* Credentials Form */}
            {isSignUp ? (
              <SignUpForm switchToSignIn={() => setIsSignUp(false)} />
            ) : (
              <SignInForm switchToSignUp={() => setIsSignUp(true)} />
            )}
          </motion.div>
        </motion.div>
      </div>
    </AuthPageWrapper>
  );
};

export default AuthPage;
