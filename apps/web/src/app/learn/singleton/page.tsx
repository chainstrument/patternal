import Link from 'next/link'
import { ExerciseBlock } from '@/components/exercise/exercise'
import { singletonExercise } from '@/lib/exercises/singleton'

export const metadata = {
  title: 'Exercice Singleton — Patternal',
}

export default function SingletonLearnPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/patterns" className="hover:text-foreground">Patterns</Link>
        <span>/</span>
        <Link href="/patterns/singleton" className="hover:text-foreground">Singleton</Link>
        <span>/</span>
        <span className="text-foreground font-medium">Exercice</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Exercice — Singleton</h1>
        <p className="mt-2 text-muted-foreground">
          Mettez en pratique le pattern Singleton en implémentant une classe de configuration globale.
        </p>
      </header>

      <ExerciseBlock exercise={singletonExercise} />

      <div className="mt-8 flex gap-4">
        <Link
          href="/patterns/singleton"
          className="text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
        >
          ← Revoir la fiche Singleton
        </Link>
        <Link
          href="/learn/factory-method"
          className="text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
        >
          Exercice suivant : Factory Method →
        </Link>
      </div>
    </div>
  )
}
