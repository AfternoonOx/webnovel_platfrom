import React from 'react';

const Badge = ({ children, tone = 'gray', className = '' }) => {
  const tones = {
    gray: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    red: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200',
    green: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200',
    amber: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200',
    indigo: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200'
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${tones[tone] || tones.gray} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
