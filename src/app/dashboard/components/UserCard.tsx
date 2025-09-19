// File: components/Card.tsx
import React, { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function UserCard({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-card rounded-2xl p-4 border border-card-border ${className}`}>
      {children}
    </div>
  );
}