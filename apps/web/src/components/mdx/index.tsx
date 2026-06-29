import type { ComponentPropsWithoutRef } from 'react'
import { Callout } from './callout'
import { UMLDiagram } from './uml-diagram'
import { Pre } from './pre'

type HeadingProps   = ComponentPropsWithoutRef<'h1'>
type ParagraphProps = ComponentPropsWithoutRef<'p'>
type ListProps      = ComponentPropsWithoutRef<'ul'>
type ListItemProps  = ComponentPropsWithoutRef<'li'>
type CodeProps      = ComponentPropsWithoutRef<'code'>
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>
type StrongProps    = ComponentPropsWithoutRef<'strong'>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getMDXComponents(): Record<string, any> {
  return {
    Callout,
    UMLDiagram,
    pre: Pre,
    h1: (props: HeadingProps) => <h1 className="mt-8 scroll-m-20 text-3xl font-bold tracking-tight" {...props} />,
    h2: (props: HeadingProps) => <h2 className="mt-8 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight" {...props} />,
    h3: (props: HeadingProps) => <h3 className="mt-6 scroll-m-20 text-xl font-semibold tracking-tight" {...props} />,
    p:  (props: ParagraphProps) => <p className="leading-7 [&:not(:first-child)]:mt-4" {...props} />,
    ul: (props: ListProps) => <ul className="my-4 ml-6 list-disc [&>li]:mt-1" {...props} />,
    ol: (props: ListProps) => <ol className="my-4 ml-6 list-decimal [&>li]:mt-1" {...props} />,
    li: (props: ListItemProps) => <li className="leading-7" {...props} />,
    code: (props: CodeProps) => (
      <code className="relative rounded bg-muted px-1.5 py-0.5 font-mono text-sm" {...props} />
    ),
    blockquote: (props: BlockquoteProps) => (
      <blockquote className="mt-4 border-l-4 border-primary pl-4 italic text-muted-foreground" {...props} />
    ),
    strong: (props: StrongProps) => <strong className="font-semibold" {...props} />,
  }
}
