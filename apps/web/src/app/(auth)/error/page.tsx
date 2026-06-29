import Link from 'next/link'

export default function AuthErrorPage() {
  return (
    <div className="w-full max-w-sm space-y-4 rounded-lg border border-border bg-background p-8 shadow-sm text-center">
      <h1 className="text-xl font-bold">Erreur de connexion</h1>
      <p className="text-sm text-muted-foreground">
        Une erreur est survenue lors de la connexion. Veuillez réessayer.
      </p>
      <Link
        href="/login"
        className="inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        Retour à la connexion
      </Link>
    </div>
  )
}
