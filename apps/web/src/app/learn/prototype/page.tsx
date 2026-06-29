import Link from 'next/link'
import { ExerciseBlock } from '@/components/exercise/exercise'
import { prototypeExercise } from '@/lib/exercises/prototype'

export const metadata = { title: 'Exercice Prototype — Patternal' }

export default function PrototypeLearnPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/patterns" className="hover:text-foreground">Patterns</Link>
        <span>/</span>
        <Link href="/patterns/prototype" className="hover:text-foreground">Prototype</Link>
        <span>/</span>
        <span className="text-foreground font-medium">Exercice</span>
      </nav>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Exercice — Prototype</h1>
        <p className="mt-2 text-muted-foreground">Implémentez un clonage profond et indépendant d'un document.</p>
      </header>
      <ExerciseBlock exercise={prototypeExercise} />
      <div className="mt-8 flex gap-4">
        <Link href="/learn/builder" className="text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-2">← Builder</Link>
        <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-2">Tableau de bord →</Link>
      </div>
    </div>
  )
}
