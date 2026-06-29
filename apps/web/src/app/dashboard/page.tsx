import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { getAllPatterns, CATEGORIES } from '@/lib/patterns'
import { getUserProgress } from '@/lib/dal/progress'
import type { PatternProgress } from '@/lib/dal/progress'
import { CategoryCard } from '@/components/dashboard/category-card'
import { GlobalStats } from '@/components/dashboard/global-stats'
import { SignOutButton } from '@/components/auth/sign-out-button'

export const metadata = { title: 'Tableau de bord — Patternal' }

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const [patterns, progressList] = await Promise.all([
    getAllPatterns(),
    getUserProgress(session.user.id),
  ])

  const progressMap = Object.fromEntries(
    progressList.map((p) => [p.patternId, p]),
  ) as Record<string, PatternProgress>

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      {/* En-tête */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
          <p className="mt-1 text-muted-foreground">
            Bonjour {session.user.name ?? session.user.email} — suivez votre progression.
          </p>
        </div>
        <SignOutButton />
      </div>

      {/* Stats globales */}
      <GlobalStats totalPatterns={patterns.length} progressList={progressList} />

      {/* Patterns par catégorie */}
      <div className="mt-10 space-y-6">
        {CATEGORIES.map((category) => {
          const categoryPatterns = patterns.filter((p) => p.category === category)
          if (categoryPatterns.length === 0) return null
          return (
            <CategoryCard
              key={category}
              category={category}
              patterns={categoryPatterns}
              progressMap={progressMap}
            />
          )
        })}
      </div>
    </div>
  )
}
