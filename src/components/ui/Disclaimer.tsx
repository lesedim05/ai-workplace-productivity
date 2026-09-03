import { AlertTriangle } from 'lucide-react';

export function Disclaimer({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-start gap-2.5 rounded-xl border border-amber-200/60 bg-amber-50/80 px-4 py-3 ${className}`}>
      <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
      <p className="text-xs leading-relaxed text-amber-700">
        <span className="font-semibold">Disclaimer:</span> AI-generated content may require human review. Verify accuracy,
        tone, and appropriateness before use in professional settings.
      </p>
    </div>
  );
}
