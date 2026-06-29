import { codeToHtml } from 'shiki'
import type { ComponentPropsWithoutRef } from 'react'

type PreProps = ComponentPropsWithoutRef<'pre'>

// Extrait le nom de fichier depuis un commentaire sur la première ligne : // filename.ts
function extractFilename(code: string): { filename: string | null; cleanCode: string } {
  const firstLine = code.split('\n')[0]?.trim() ?? ''
  const match = firstLine.match(/^\/\/\s*(.+\.\w+)$/)
  if (match?.[1]) {
    return { filename: match[1], cleanCode: code.split('\n').slice(1).join('\n').trim() }
  }
  return { filename: null, cleanCode: code }
}

export async function Pre({ children, ...props }: PreProps) {
  // Récupère language et code depuis le children <code>
  const codeElement = children as React.ReactElement<{ className?: string; children?: string }>
  const className = codeElement?.props?.className ?? ''
  const rawCode = (codeElement?.props?.children ?? '') as string
  const language = className.replace('language-', '') || 'text'

  const { filename, cleanCode } = extractFilename(rawCode.trim())

  let html = ''
  try {
    html = await codeToHtml(cleanCode, { lang: language, theme: 'github-dark' })
  } catch {
    // Langue non reconnue par Shiki — fallback texte brut
    html = `<pre><code>${cleanCode.replace(/</g, '&lt;')}</code></pre>`
  }

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-border">
      {filename && (
        <div className="flex items-center gap-2 border-b border-white/10 bg-[#161b22] px-4 py-2">
          <span className="font-mono text-xs text-white/50">{filename}</span>
        </div>
      )}
      <div
        className="overflow-x-auto text-sm [&>pre]:p-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
