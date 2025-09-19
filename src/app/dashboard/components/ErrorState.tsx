// File: components/ErrorState.tsx
import { RefreshCw } from 'lucide-react';

type Props = {
  onRetry?: () => void;
};

export function ErrorState({ onRetry }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <p className="text-foreground-muted mb-4">Something went wrong while loading data.</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 bg-danger/90 text-white rounded-lg"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      )}
    </div>
  );
}
