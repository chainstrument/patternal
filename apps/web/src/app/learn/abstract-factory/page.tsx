import Link from 'next/link'
import { ExerciseBlock } from '@/components/exercise/exercise'
import { abstractFactoryExercise } from '@/lib/exercises/abstract-factory'

export const metadata = { title: 'Exercice Abstract Factory — Patternal' }

export default function AbstractFactoryLearnPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/patterns" className="hover:text-foreground">Patterns</Link>
        <span>/</span>
        <Link href="/patterns/abstract-factory" className="hover:text-foreground">Abstract Factory</Link>
        <span>/</span>
        <span className="text-foreground font-medium">Exercice</span>
      </nav>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Exercice — Abstract Factory</h1>
        <p className="mt-2 text-muted-foreground">Implémentez des familles de composants UI cohérentes.</p>
      </header>
      <ExerciseBlock exercise={abstractFactoryExercise} />
      <div className="mt-8 flex gap-4">
        <Link href="/learn/factory-method" className="text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-2">← Factory Method</Link>
        <Link href="/learn/builder" className="text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-2">Builder →</Link>
      </div>
    </div>
  )
}
