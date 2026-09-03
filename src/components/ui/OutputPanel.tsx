import { type ReactNode } from 'react';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export function OutputPanel({ children, title, onCopy }: { children: ReactNode; title?: string; onCopy?: () => string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (onCopy) {
      navigator.clipboard.writeText(onCopy());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-2xl border border-ink-200/60 bg-ink-50/50 overflow-hidden animate-slide-up">
      {(title || onCopy) && (
        <div className="flex items-center justify-between px-5 py-3 border-b border-ink-200/60 bg-white">
          <span className="text-sm font-semibold text-ink-700">{title || 'Output'}</span>
          {onCopy && (
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-500 hover:text-primary-600 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-success-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

export function Badge({ children, color = 'default' }: { children: ReactNode; color?: 'default' | 'high' | 'medium' | 'low' | 'info' | 'success' }) {
  const colors = {
    default: 'bg-ink-100 text-ink-600',
    high: 'bg-error-100 text-error-700',
    medium: 'bg-warning-100 text-warning-700',
    low: 'bg-success-100 text-success-700',
    info: 'bg-primary-100 text-primary-700',
    success: 'bg-success-100 text-success-700',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color]}`}>
      {children}
    </span>
  );
}
