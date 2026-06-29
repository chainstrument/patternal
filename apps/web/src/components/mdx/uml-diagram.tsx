interface UMLDiagramProps {
  alt: string
  description?: string
}

export function UMLDiagram({ alt, description }: UMLDiagramProps) {
  return (
    <figure className="my-6 overflow-hidden rounded-lg border border-border bg-muted/30">
      <div className="flex min-h-40 items-center justify-center p-8 text-muted-foreground">
        <div className="text-center">
          <div className="mb-2 text-3xl">📊</div>
          <p className="text-sm font-medium">{alt}</p>
          {description && <p className="mt-1 text-xs opacity-70">{description}</p>}
        </div>
      </div>
      <figcaption className="border-t border-border px-4 py-2 text-center text-xs text-muted-foreground">
        {alt}
      </figcaption>
    </figure>
  )
}
