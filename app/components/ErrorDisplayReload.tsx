'use client'

import ErrorDisplay from '@/app/components/ErrorDisplay'

interface ErrorDisplayReloadProps {
  error: string
}

export default function ErrorDisplayReload({ error }: ErrorDisplayReloadProps) {
  return <ErrorDisplay error={error} onRetry={() => window.location.reload()} />
}
