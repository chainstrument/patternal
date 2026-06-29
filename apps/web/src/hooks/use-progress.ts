'use client'

import { useCallback, useState } from 'react'
import type { ProgressStatus } from '@/lib/dal/progress'

interface UseProgressOptions {
  patternId: string
  initialStatus?: ProgressStatus
}

export function useProgress({ patternId, initialStatus = 'not_started' }: UseProgressOptions) {
  const [status, setStatus] = useState<ProgressStatus>(initialStatus)
  const [isPending, setIsPending] = useState(false)

  const updateStatus = useCallback(
    async (newStatus: ProgressStatus) => {
      setIsPending(true)
      try {
        await fetch(`/api/progress/${patternId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        })
        setStatus(newStatus)
      } finally {
        setIsPending(false)
      }
    },
    [patternId],
  )

  const markCompleted = useCallback(() => updateStatus('completed'), [updateStatus])
  const markInProgress = useCallback(() => updateStatus('in_progress'), [updateStatus])

  return { status, isPending, markCompleted, markInProgress, updateStatus }
}
