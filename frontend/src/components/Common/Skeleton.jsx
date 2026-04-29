import React from 'react';

/**
 * Skeleton component for loading states.
 * 
 * @param {string} className - Additional Tailwind classes for sizing and shape
 */
const Skeleton = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-slate-200 rounded-md ${className}`}></div>
  );
};

export const CardSkeleton = () => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
    <Skeleton className="w-12 h-12 rounded-xl" />
    <Skeleton className="w-3/4 h-6" />
    <Skeleton className="w-full h-4" />
    <Skeleton className="w-1/2 h-8" />
  </div>
);

export const TableRowSkeleton = () => (
  <tr className="animate-pulse">
    <td className="px-8 py-5"><Skeleton className="h-10 w-full rounded-xl" /></td>
    <td className="px-8 py-5"><Skeleton className="h-10 w-full rounded-xl" /></td>
    <td className="px-8 py-5"><Skeleton className="h-10 w-full rounded-xl" /></td>
    <td className="px-8 py-5"><Skeleton className="h-10 w-full rounded-xl" /></td>
    <td className="px-8 py-5"><Skeleton className="h-10 w-full rounded-xl" /></td>
    <td className="px-8 py-5 text-right"><Skeleton className="h-10 w-10 rounded-xl inline-block" /></td>
  </tr>
);

export default Skeleton;
