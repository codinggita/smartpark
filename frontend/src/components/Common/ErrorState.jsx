import React from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';

/**
 * ErrorState component for API or logic failures.
 * 
 * @param {string} message - Error message to display
 * @param {Function} onRetry - Function to call when retry button is clicked
 */
const ErrorState = ({ 
  message = "Failed to load data", 
  onRetry = null 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-red-50/50 rounded-[2.5rem] border border-red-100 shadow-sm">
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <AlertCircle size={40} className="text-red-500" />
      </div>
      <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">Oops! Something went wrong</h3>
      <p className="text-red-600/70 font-medium max-w-xs mx-auto mb-8 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-red-200 flex items-center gap-2"
        >
          <RefreshCcw size={18} />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
