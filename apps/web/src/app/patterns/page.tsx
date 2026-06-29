import { getAllPatterns, CATEGORIES, CATEGORY_LABELS } from '@/lib/patterns'
import { PatternCard } from '@/components/patterns/pattern-card'

export default function PatternsPage() {
  const patterns = getAllPatterns()

  return (
    <main className="container mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Catalogue des patterns</h1>
        <p className="mt-2 text-muted-foreground">
          {patterns.length} pattern{patterns.length > 1 ? 's' : ''} disponibles — lisez, pratiquez, maîtrisez.
        </p>
      </div>

      <div className="space-y-12">
        {CATEGORIES.map((category) => {
          const categoryPatterns = patterns.filter((p) => p.category === category)
          if (categoryPatterns.length === 0) return null

          return (
            <section key={category}>
              <h2 className="mb-4 text-xl font-semibold">{CATEGORY_LABELS[category]}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categoryPatterns.map((pattern) => (
                  <PatternCard key={pattern.slug} pattern={pattern} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </main>
  )
}
