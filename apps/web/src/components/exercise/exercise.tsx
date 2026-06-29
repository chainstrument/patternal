'use client'

import { useState } from 'react'
import { CodeEditor } from '@/components/editor/code-editor'
import type { Exercise, ValidationResult } from '@patternal/pattern-engine'

interface ExerciseProps {
  exercise: Exercise
  onSuccess?: () => void
  onStart?: () => void
}

type Status = 'idle' | 'running' | 'success' | 'error'

export function ExerciseBlock({ exercise, onSuccess, onStart }: ExerciseProps) {
  const [code, setCode] = useState(exercise.starterCode)
  const [result, setResult] = useState<ValidationResult | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [revealedHints, setRevealedHints] = useState(0)

  function handleCodeChange(value: string) {
    if (status === 'idle') onStart?.()
    setCode(value)
  }

  async function handleRun() {
    setStatus('running')
    setResult(null)

    try {
      const { validateExercise } = await import('@patternal/pattern-engine')
      const validation = validateExercise(exercise, code)
      setResult(validation)
      setStatus(validation.success ? 'success' : 'error')
      if (validation.success) onSuccess?.()
    } catch {
      setStatus('error')
    }
  }

  function handleRevealHint() {
    if (revealedHints < exercise.hints.length) {
      setRevealedHints((n) => n + 1)
    }
  }

  function handleReset() {
    setCode(exercise.starterCode)
    setResult(null)
    setStatus('idle')
    setRevealedHints(0)
  }

  return (
    <div className="my-8 space-y-4 rounded-xl border border-border bg-background shadow-sm">
      {/* En-tête */}
      <div className="flex items-start justify-between gap-4 border-b border-border p-5">
        <div>
          <h3 className="font-semibold">{exercise.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{exercise.description}</p>
        </div>
        {status === 'success' && (
          <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
            ✓ Réussi
          </span>
        )}
      </div>

      {/* Éditeur */}
      <div className="px-5">
        <CodeEditor value={code} onChange={handleCodeChange} height="280px" />
      </div>

      {/* Hints */}
      {exercise.hints.length > 0 && (
        <div className="space-y-2 px-5">
          {exercise.hints.slice(0, revealedHints).map((hint, i) => (
            <div key={i} className="flex gap-2 rounded-lg bg-blue-50 p-3 text-sm text-blue-900">
              <span className="shrink-0 font-medium">Indice {i + 1} :</span>
              <span>{hint}</span>
            </div>
          ))}
          {revealedHints < exercise.hints.length && (
            <button
              onClick={handleRevealHint}
              className="text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
            >
              Afficher l'indice {revealedHints + 1}/{exercise.hints.length}
            </button>
          )}
        </div>
      )}

      {/* Résultats */}
      {result && (
        <div className="space-y-2 px-5">
          <p className="text-sm font-medium">
            {result.passed}/{result.total} assertion{result.total > 1 ? 's' : ''} passée{result.total > 1 ? 's' : ''}
          </p>
          <div className="space-y-1.5">
            {result.results.map((r, i) => (
              <div
                key={i}
                className={`flex items-start gap-2 rounded-md px-3 py-2 text-sm ${
                  r.passed
                    ? 'bg-green-50 text-green-800'
                    : 'bg-red-50 text-red-800'
                }`}
              >
                <span className="shrink-0 font-mono">{r.passed ? '✓' : '✗'}</span>
                <div>
                  <span>{r.description}</span>
                  {r.error && (
                    <p className="mt-0.5 font-mono text-xs opacity-80">{r.error}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 border-t border-border p-5">
        <button
          onClick={handleRun}
          disabled={status === 'running'}
          className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {status === 'running' ? 'Vérification…' : 'Vérifier'}
        </button>
        <button
          onClick={handleReset}
          className="rounded-md border border-border px-5 py-2 text-sm font-medium transition-colors hover:bg-muted"
        >
          Réinitialiser
        </button>
      </div>
    </div>
  )
}
