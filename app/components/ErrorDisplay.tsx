'use client'

interface ErrorDisplayProps {
  error: string
  onRetry: () => void
}

export default function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
  return (
    <div className="p-4 rounded-lg border-2 border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20">
      <div className="flex items-start gap-3">
        <div className="text-red-600 dark:text-red-400 text-xl">⚠️</div>
        <div className="flex-1">
          <h3 className="font-semibold text-red-900 dark:text-red-200">Error</h3>
          <p className="text-sm text-red-800 dark:text-red-300 mt-1">{error}</p>
          <button
            onClick={onRetry}
            className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white rounded font-medium transition-colors"
            aria-label="Retry"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  )
}
