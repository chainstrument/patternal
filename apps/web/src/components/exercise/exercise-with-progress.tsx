'use client'

import { useProgress } from '@/hooks/use-progress'
import { ExerciseBlock } from './exercise'
import type { Exercise } from '@patternal/pattern-engine'
import type { ProgressStatus } from '@/lib/dal/progress'

interface ExerciseWithProgressProps {
  exercise: Exercise
  initialStatus?: ProgressStatus
}

export function ExerciseWithProgress({ exercise, initialStatus }: ExerciseWithProgressProps) {
  const { markCompleted, markInProgress } = useProgress({
    patternId: exercise.patternId,
    initialStatus,
  })

  return (
    <ExerciseBlock
      exercise={exercise}
      onSuccess={markCompleted}
      onStart={markInProgress}
    />
  )
}
