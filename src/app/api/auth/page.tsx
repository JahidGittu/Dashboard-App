"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import SignInForm from "./[...nextauth]/SignIn/SignInForm";
import SignUpForm from "./SignUp/SignUpForm";
import GoogleSignIn from "./GoogleSignIn";

const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-gradient-primary rounded-xl mx-auto mb-4 flex items-center justify-center"
          >
            <span className="text-2xl font-bold text-white">D</span>
          </motion.div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-foreground-muted mt-2">
            {isSignUp ? "Create your account" : "Welcome back"}
          </p>
        </div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-card-border rounded-2xl p-8 shadow-lg backdrop-blur-sm"
        >
          {/* Tab Switcher */}
          <div className="flex bg-secondary rounded-lg p-1 mb-6">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                !isSignUp
                  ? "bg-background text-foreground shadow-sm"
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                isSignUp
                  ? "bg-background text-foreground shadow-sm"
                  : "text-foreground-muted hover:text-foreground"
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
  );
};

export default AuthPage;
