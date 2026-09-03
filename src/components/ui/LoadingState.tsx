import { Loader2, Sparkles } from 'lucide-react';

export function LoadingState({ message = 'AI is thinking...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center">
          <Sparkles className="w-7 h-7 text-primary-500 animate-pulse-soft" />
        </div>
        <Loader2 className="absolute -bottom-1 -right-1 w-6 h-6 text-primary-600 animate-spin" />
      </div>
      <p className="mt-4 text-sm font-medium text-ink-600">{message}</p>
      <div className="mt-3 flex gap-1">
        <span className="w-2 h-2 rounded-full bg-primary-300 animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}

export function SkeletonLines({ lines = 4 }: { lines?: number }) {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 rounded-lg shimmer-bg"
          style={{ width: `${Math.max(40, 100 - i * 12)}%` }}
        />
      ))}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-ink-50 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-ink-300" />
      </div>
      <h3 className="text-base font-semibold text-ink-700">{title}</h3>
      <p className="mt-1.5 text-sm text-ink-400 max-w-sm">{description}</p>
    </div>
  );
}
