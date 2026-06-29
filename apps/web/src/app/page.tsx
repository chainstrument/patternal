import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold tracking-tight">Patternal</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Apprenez les design patterns en les pratiquant.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/patterns"
          className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
        >
          Voir les patterns
        </Link>
        <Link
          href="/dashboard"
          className="rounded-md border px-6 py-3 text-sm font-medium"
        >
          Mon tableau de bord
        </Link>
      </div>
    </main>
  )
}
