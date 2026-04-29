import React from 'react';
import { PackageOpen } from 'lucide-react';

/**
 * EmptyState component for when no data is available.
 * 
 * @param {string} title - The main message
 * @param {string} description - The supporting message
 * @param {React.ReactNode} action - Optional action button
 */
const EmptyState = ({ 
  title = "No data found", 
  description = "There are no items to display at the moment.", 
  action = null 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
        <PackageOpen size={40} className="text-slate-300" />
      </div>
      <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">{title}</h3>
      <p className="text-slate-500 font-medium max-w-xs mx-auto mb-8 leading-relaxed">
        {description}
      </p>
      {action}
    </div>
  );
};

export default EmptyState;
