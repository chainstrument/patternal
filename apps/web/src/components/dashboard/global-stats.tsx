import type { PatternProgress } from '@/lib/dal/progress'

interface GlobalStatsProps {
  totalPatterns: number
  progressList: PatternProgress[]
}

export function GlobalStats({ totalPatterns, progressList }: GlobalStatsProps) {
  const completed = progressList.filter((p) => p.status === 'completed').length
  const inProgress = progressList.filter((p) => p.status === 'in_progress').length
  const percent = totalPatterns === 0 ? 0 : Math.round((completed / totalPatterns) * 100)

  const stats = [
    { label: 'Terminés',   value: completed,                          color: 'text-green-600' },
    { label: 'En cours',   value: inProgress,                         color: 'text-yellow-600' },
    { label: 'À faire',    value: totalPatterns - completed - inProgress, color: 'text-muted-foreground' },
    { label: 'Progression', value: `${percent}%`,                     color: 'text-primary' },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map(({ label, value, color }) => (
        <div key={label} className="rounded-xl border border-border bg-background p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className={`mt-1 text-3xl font-bold ${color}`}>{value}</p>
        </div>
      ))}
    </div>
  )
}
