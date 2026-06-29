'use client'

import Editor from '@monaco-editor/react'
import type { editor } from 'monaco-editor'
import { useRef } from 'react'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  height?: string
  readOnly?: boolean
}

const EDITOR_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  fontSize: 14,
  lineHeight: 22,
  tabSize: 2,
  wordWrap: 'on',
  padding: { top: 12, bottom: 12 },
  renderLineHighlight: 'gutter',
  overviewRulerBorder: false,
  hideCursorInOverviewRuler: true,
  scrollbar: { verticalScrollbarSize: 6, horizontalScrollbarSize: 6 },
}

export function CodeEditor({
  value,
  onChange,
  language = 'typescript',
  height = '320px',
  readOnly = false,
}: CodeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)

  function handleMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor
    // Ajuste la hauteur automatiquement au contenu
    editor.onDidContentSizeChange(() => {
      const contentHeight = Math.min(600, editor.getContentHeight())
      const domNode = editor.getDomNode()
      if (domNode) domNode.style.height = `${contentHeight}px`
      editor.layout()
    })
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-[#1e1e1e]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/70" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <div className="h-3 w-3 rounded-full bg-green-500/70" />
        </div>
        <span className="ml-1 font-mono text-xs text-white/40">
          exercise.{language === 'typescript' ? 'ts' : language}
        </span>
      </div>
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={(v) => onChange(v ?? '')}
        theme="vs-dark"
        options={{ ...EDITOR_OPTIONS, readOnly }}
        onMount={handleMount}
        loading={
          <div className="flex h-full items-center justify-center text-sm text-white/40">
            Chargement de l'éditeur…
          </div>
        }
      />
    </div>
  )
}
