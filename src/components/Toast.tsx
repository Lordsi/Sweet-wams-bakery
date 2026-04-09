import { useEffect } from 'react';
import { X, Check, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type = 'success',
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor =
    type === 'success'
      ? 'bg-success-muted'
      : type === 'error'
        ? 'bg-red-600'
        : 'bg-taupe-dark';

  return (
    <div className="fixed bottom-6 right-6 z-[10000] animate-slide-up max-[480px]:left-4 max-[480px]:right-4">
      <div
        className={`${bgColor} text-white px-5 py-3 rounded-lg shadow-elevate-2 flex items-center gap-3 min-w-[280px] max-w-md`}
        role="status"
        aria-live="polite"
      >
        {type === 'success' && <Check className="w-5 h-5 shrink-0" aria-hidden />}
        {type === 'error' && <AlertCircle className="w-5 h-5 shrink-0" aria-hidden />}
        {type === 'info' && <AlertCircle className="w-5 h-5 shrink-0" aria-hidden />}
        <p className="text-sm font-medium flex-1">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded transition-colors focus-ring-dark"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
