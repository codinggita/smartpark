import React, { useState } from 'react';
import { useField } from 'formik';
import { Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = props.type === 'password';

  const togglePassword = () => setShowPassword(!showPassword);
  
  const hasError = meta.touched && meta.error;

  return (
    <div className="mb-5 relative">
      <label 
        htmlFor={props.id || props.name} 
        className="block text-sm font-bold text-slate-700 mb-2 ml-1"
      >
        {label}
      </label>
      <div className="relative">
        <input
          {...field}
          {...props}
          type={isPassword && showPassword ? 'text' : props.type}
          className={`w-full px-5 py-3.5 rounded-2xl bg-slate-50 border transition-all text-slate-900 font-medium focus:outline-none focus:ring-4 ${
            hasError 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30' 
              : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'
          } ${isPassword ? 'pr-12' : ''}`}
        />
        
        {isPassword && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
            tabIndex="-1"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="text-red-500 text-xs font-bold mt-2 ml-1"
          >
            {meta.error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthInput;
