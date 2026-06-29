import Link from 'next/link'
import { ExerciseBlock } from '@/components/exercise/exercise'
import { builderExercise } from '@/lib/exercises/builder'

export const metadata = { title: 'Exercice Builder — Patternal' }

export default function BuilderLearnPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/patterns" className="hover:text-foreground">Patterns</Link>
        <span>/</span>
        <Link href="/patterns/builder" className="hover:text-foreground">Builder</Link>
        <span>/</span>
        <span className="text-foreground font-medium">Exercice</span>
      </nav>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Exercice — Builder</h1>
        <p className="mt-2 text-muted-foreground">Construisez un profil utilisateur avec une API fluente.</p>
      </header>
      <ExerciseBlock exercise={builderExercise} />
      <div className="mt-8 flex gap-4">
        <Link href="/learn/abstract-factory" className="text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-2">← Abstract Factory</Link>
        <Link href="/learn/prototype" className="text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-2">Prototype →</Link>
      </div>
    </div>
  )
}
