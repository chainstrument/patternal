import Link from 'next/link'
import { ExerciseBlock } from '@/components/exercise/exercise'
import { factoryMethodExercise } from '@/lib/exercises/factory-method'

export const metadata = { title: 'Exercice Factory Method — Patternal' }

export default function FactoryMethodLearnPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/patterns" className="hover:text-foreground">Patterns</Link>
        <span>/</span>
        <Link href="/patterns/factory-method" className="hover:text-foreground">Factory Method</Link>
        <span>/</span>
        <span className="text-foreground font-medium">Exercice</span>
      </nav>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Exercice — Factory Method</h1>
        <p className="mt-2 text-muted-foreground">Créez un système de notifications extensible.</p>
      </header>
      <ExerciseBlock exercise={factoryMethodExercise} />
      <div className="mt-8 flex gap-4">
        <Link href="/learn/singleton" className="text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-2">← Singleton</Link>
        <Link href="/learn/abstract-factory" className="text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-2">Abstract Factory →</Link>
      </div>
    </div>
  )
}
