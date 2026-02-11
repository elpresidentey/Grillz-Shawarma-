import React, { useEffect, useState } from 'react';
import { CheckCircleIcon, XMarkIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Date.now().toString();
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration || 5000,
    };
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  useEffect(() => {
    toasts.forEach(toast => {
      const timer = setTimeout(() => {
        removeToast(toast.id);
      }, toast.duration || 5000);
      return () => clearTimeout(timer);
    });
    return () => {
      toasts.forEach(toast => removeToast(toast.id));
    };
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`transform transition-all duration-300 ease-in-out ${
              toast.type === 'success' ? 'bg-green-500' :
              toast.type === 'error' ? 'bg-red-500' :
              toast.type === 'warning' ? 'bg-yellow-500' :
              'bg-blue-500'
            } text-white p-4 rounded-lg shadow-lg max-w-sm w-full`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                {toast.type === 'success' && <CheckCircleIcon className="h-6 w-6" />}
                {toast.type === 'error' && <ExclamationTriangleIcon className="h-6 w-6" />}
                {toast.type === 'warning' && <ExclamationTriangleIcon className="h-6 w-6" />}
                {toast.type === 'info' && <InformationCircleIcon className="h-6 w-6" />}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{toast.title}</h4>
                {toast.message && (
                  <p className="text-sm opacity-90 mt-1">{toast.message}</p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 ml-4 text-white hover:text-gray-200 transition-colors"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
