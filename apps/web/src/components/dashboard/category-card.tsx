import Link from 'next/link'
import type { PatternMeta } from '@/lib/patterns'
import type { PatternProgress } from '@/lib/dal/progress'
import { CATEGORY_LABELS, DIFFICULTY_LABELS } from '@/lib/patterns'
import { ProgressRing } from './progress-ring'

const statusStyles = {
  completed:   { dot: 'bg-green-500',  label: 'text-green-700',  bg: 'border-green-200 bg-green-50/50' },
  in_progress: { dot: 'bg-yellow-500', label: 'text-yellow-700', bg: 'border-yellow-200 bg-yellow-50/50' },
  not_started: { dot: 'bg-border',     label: 'text-muted-foreground', bg: '' },
}

const statusLabels = {
  completed:   'Terminé',
  in_progress: 'En cours',
  not_started: 'À faire',
}

interface CategoryCardProps {
  category: 'creational' | 'structural' | 'behavioral'
  patterns: PatternMeta[]
  progressMap: Record<string, PatternProgress>
}

export function CategoryCard({ category, patterns, progressMap }: CategoryCardProps) {
  const completed = patterns.filter(
    (p) => (progressMap[p.slug]?.status ?? 'not_started') === 'completed',
  ).length

  return (
    <section className="rounded-xl border border-border bg-background shadow-sm">
      {/* En-tête catégorie */}
      <div className="flex items-center justify-between p-5 border-b border-border">
        <div>
          <h2 className="font-semibold text-lg">{CATEGORY_LABELS[category]}</h2>
          <p className="text-sm text-muted-foreground">
            {completed}/{patterns.length} pattern{patterns.length > 1 ? 's' : ''} terminé{completed > 1 ? 's' : ''}
          </p>
        </div>
        <div className="relative flex items-center justify-center">
          <ProgressRing completed={completed} total={patterns.length} />
          <span className="absolute text-xs font-semibold">
            {Math.round((completed / Math.max(patterns.length, 1)) * 100)}%
          </span>
        </div>
      </div>

      {/* Liste des patterns */}
      <ul className="divide-y divide-border">
        {patterns.map((pattern) => {
          const status = progressMap[pattern.slug]?.status ?? 'not_started'
          const style = statusStyles[status]

          return (
            <li key={pattern.slug}>
              <Link
                href={`/patterns/${pattern.slug}`}
                className={`flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-muted/50 ${style.bg}`}
              >
                <span className={`h-2 w-2 shrink-0 rounded-full ${style.dot}`} />
                <div className="flex-1 min-w-0">
                  <span className="font-medium">{pattern.title}</span>
                  <span className="ml-2 text-xs text-muted-foreground">
                    {DIFFICULTY_LABELS[pattern.difficulty]}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium ${style.label}`}>
                    {statusLabels[status]}
                  </span>
                  {status !== 'completed' && (
                    <Link
                      href={`/learn/${pattern.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="shrink-0 rounded-md border border-border px-2 py-0.5 text-xs transition-colors hover:bg-muted"
                    >
                      Pratiquer
                    </Link>
                  )}
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
