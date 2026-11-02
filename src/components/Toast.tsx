import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  text: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 left-4 sm:left-auto z-50 flex flex-col gap-2 max-w-sm pointer-events-none pb-[env(safe-area-inset-bottom)]">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          onClick={() => onDismiss(toast.id)}
          className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all transform animate-in fade-in slide-in-from-bottom-2 duration-200 cursor-pointer ${
            toast.type === 'error'
              ? 'bg-rose-900 text-white border-rose-700'
              : 'bg-slate-900 text-white border-slate-700 dark:bg-emerald-950 dark:text-emerald-100 dark:border-emerald-800'
          }`}
        >
          {toast.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span className="truncate">{toast.text}</span>
        </div>
      ))}
    </div>
  );
};
