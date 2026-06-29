import Link from 'next/link'
import type { PatternMeta } from '@/lib/patterns'

interface PatternNavProps {
  prev: PatternMeta | null
  next: PatternMeta | null
}

export function PatternNav({ prev, next }: PatternNavProps) {
  return (
    <nav className="mt-12 flex items-center justify-between border-t border-border pt-6">
      {prev ? (
        <Link
          href={`/patterns/${prev.slug}`}
          className="group flex flex-col gap-1 rounded-lg border border-border p-4 transition-colors hover:bg-muted"
        >
          <span className="text-xs text-muted-foreground">← Précédent</span>
          <span className="font-medium group-hover:text-primary">{prev.title}</span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/patterns/${next.slug}`}
          className="group flex flex-col items-end gap-1 rounded-lg border border-border p-4 transition-colors hover:bg-muted"
        >
          <span className="text-xs text-muted-foreground">Suivant →</span>
          <span className="font-medium group-hover:text-primary">{next.title}</span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  )
}
