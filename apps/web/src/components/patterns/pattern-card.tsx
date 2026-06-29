import Link from 'next/link'
import type { PatternMeta } from '@/lib/patterns'
import { DIFFICULTY_LABELS } from '@/lib/patterns'

const difficultyColors = {
  beginner:     'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced:     'bg-red-100 text-red-800',
}

interface PatternCardProps {
  pattern: PatternMeta
}

export function PatternCard({ pattern }: PatternCardProps) {
  return (
    <Link
      href={`/patterns/${pattern.slug}`}
      className="group flex flex-col gap-3 rounded-lg border border-border p-5 transition-all hover:border-primary/50 hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold leading-tight group-hover:text-primary">{pattern.title}</h3>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${difficultyColors[pattern.difficulty]}`}
        >
          {DIFFICULTY_LABELS[pattern.difficulty]}
        </span>
      </div>

      {pattern.excerpt && (
        <p className="text-sm text-muted-foreground line-clamp-2">{pattern.excerpt}</p>
      )}

      {pattern.realWorld.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {pattern.realWorld.slice(0, 3).map((example) => (
            <span
              key={example}
              className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground"
            >
              {example}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
