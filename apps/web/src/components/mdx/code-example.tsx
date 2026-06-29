import { codeToHtml } from 'shiki'

interface CodeExampleProps {
  code: string
  language?: string
  filename?: string
}

export async function CodeExample({ code, language = 'typescript', filename }: CodeExampleProps) {
  const html = await codeToHtml(code.trim(), {
    lang: language,
    theme: 'github-dark',
  })

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-border">
      {filename && (
        <div className="flex items-center gap-2 border-b border-border bg-muted px-4 py-2">
          <span className="font-mono text-xs text-muted-foreground">{filename}</span>
        </div>
      )}
      <div
        className="overflow-x-auto text-sm [&>pre]:p-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
