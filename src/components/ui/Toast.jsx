'use client';
import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-24 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
        <AnimatePresence>
          {toasts.map(toast => (
            <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

const ToastItem = ({ toast, onRemove }) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-gold" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-grey" />
  };

  const borders = {
    success: 'border-gold',
    error: 'border-red-900',
    info: 'border-[#333]'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`bg-black border ${borders[toast.type]} p-4 flex items-start gap-3 shadow-2xl`}
    >
      {icons[toast.type]}
      <p className="flex-1 text-sm font-poppins text-ivory mt-0.5">{toast.message}</p>
      <button onClick={onRemove} className="text-grey hover:text-white transition-colors">
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};
