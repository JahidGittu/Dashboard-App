
// File: components/SearchInput.tsx
import React from 'react';
import { Search } from 'lucide-react';

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export default function SearchInput({ value, onChange, placeholder = 'Search...' }: Props) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted w-4 h-4" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary hover:bg-input-hover transition-colors"
      />
    </div>
  );
}