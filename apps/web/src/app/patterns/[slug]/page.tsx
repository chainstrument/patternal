import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPatterns, getPatternContent, getAdjacentPatterns } from '@/lib/patterns'
import { getMDXComponents } from '@/components/mdx'
import { PatternNav } from '@/components/patterns/pattern-nav'
import { CATEGORY_LABELS, DIFFICULTY_LABELS } from '@/lib/patterns'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPatterns().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const pattern = getPatternContent(slug)
  if (!pattern) return {}
  return {
    title: `${pattern.title} — Patternal`,
    description: pattern.excerpt,
  }
}

export default async function PatternPage({ params }: Props) {
  const { slug } = await params
  const pattern = getPatternContent(slug)
  if (!pattern) notFound()

  const { prev, next } = getAdjacentPatterns(slug)

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/patterns" className="hover:text-foreground">Patterns</Link>
        <span>/</span>
        <span>{CATEGORY_LABELS[pattern.category]}</span>
        <span>/</span>
        <span className="text-foreground font-medium">{pattern.title}</span>
      </nav>

      {/* En-tête */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="rounded-full border border-border px-3 py-1 text-xs font-medium">
            {CATEGORY_LABELS[pattern.category]}
          </span>
          <span className="rounded-full border border-border px-3 py-1 text-xs font-medium">
            {DIFFICULTY_LABELS[pattern.difficulty]}
          </span>
          {pattern.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl font-bold tracking-tight">{pattern.title}</h1>
        {pattern.excerpt && (
          <p className="mt-3 text-lg text-muted-foreground">{pattern.excerpt}</p>
        )}
        {pattern.realWorld.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-muted-foreground">Utilisé dans :</span>
            {pattern.realWorld.map((example) => (
              <span key={example} className="rounded bg-muted px-2 py-0.5 font-mono text-xs">
                {example}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Contenu MDX */}
      <article className="prose-neutral max-w-none">
        <MDXRemote source={pattern.content} components={getMDXComponents()} />
      </article>

      {/* Patterns liés */}
      {pattern.related.length > 0 && (
        <aside className="mt-10 rounded-lg border border-border p-5">
          <h3 className="mb-3 font-semibold">Voir aussi</h3>
          <div className="flex flex-wrap gap-2">
            {pattern.related.map((relatedSlug) => (
              <Link
                key={relatedSlug}
                href={`/patterns/${relatedSlug}`}
                className="rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:bg-muted"
              >
                {relatedSlug}
              </Link>
            ))}
          </div>
        </aside>
      )}

      {/* Navigation précédent / suivant */}
      <PatternNav prev={prev} next={next} />
    </div>
  )
}
