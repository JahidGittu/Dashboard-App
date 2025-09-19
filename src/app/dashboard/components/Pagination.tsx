'use client';

import React from 'react';
import clsx from 'clsx';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const generatePages = () => {
    const pages: (number | string)[] = [];
    if (currentPage > 3) pages.push(1, '...');
    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...', totalPages);
    return pages;
  };

  const pages = generatePages();

  return (
    <div className="flex items-center justify-center gap-2 mt-8 *:cursor-pointer">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-sm disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      {pages.map((p, i) =>
        typeof p === 'number' ? (
          <button
            key={i}
            onClick={() => onPageChange(p)}
            className={clsx(
              'px-3 py-1.5 rounded-lg text-sm transition',
              p === currentPage
                ? 'bg-blue-600 text-white font-semibold'
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            )}
          >
            {p}
          </button>
        ) : (
          <span key={i} className="px-2 text-gray-500">
            ...
          </span>
        )
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-sm disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}
