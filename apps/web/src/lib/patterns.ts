import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { z } from 'zod'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export const CATEGORIES = ['creational', 'structural', 'behavioral'] as const
export type Category = (typeof CATEGORIES)[number]

export const CATEGORY_LABELS: Record<Category, string> = {
  creational: 'Créationnels',
  structural: 'Structurels',
  behavioral: 'Comportementaux',
}

export const DIFFICULTY_LABELS = {
  beginner: 'Débutant',
  intermediate: 'Intermédiaire',
  advanced: 'Avancé',
} as const

const PatternFrontmatterSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.enum(CATEGORIES),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  tags: z.array(z.string()).default([]),
  realWorld: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
  excerpt: z.string().optional(),
})

export type PatternFrontmatter = z.infer<typeof PatternFrontmatterSchema>

export interface PatternMeta extends PatternFrontmatter {
  slug: string
}

export interface PatternContent extends PatternMeta {
  content: string
}

function getPatternFiles(): Array<{ slug: string; category: Category; filePath: string }> {
  const files: Array<{ slug: string; category: Category; filePath: string }> = []

  for (const category of CATEGORIES) {
    const dir = path.join(CONTENT_DIR, category)
    if (!fs.existsSync(dir)) continue

    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.mdx')) continue
      files.push({
        slug: file.replace(/\.mdx$/, ''),
        category,
        filePath: path.join(dir, file),
      })
    }
  }

  return files
}

export function getAllPatterns(): PatternMeta[] {
  return getPatternFiles().map(({ slug, filePath }) => {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(raw)
    const frontmatter = PatternFrontmatterSchema.parse(data)
    return { ...frontmatter, slug }
  })
}

export function getPatternsByCategory(category: Category): PatternMeta[] {
  return getAllPatterns().filter((p) => p.category === category)
}

export function getPatternContent(slug: string): PatternContent | null {
  for (const category of CATEGORIES) {
    const filePath = path.join(CONTENT_DIR, category, `${slug}.mdx`)
    if (!fs.existsSync(filePath)) continue

    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    const frontmatter = PatternFrontmatterSchema.parse(data)
    return { ...frontmatter, slug, content }
  }

  return null
}

export function getAdjacentPatterns(slug: string): {
  prev: PatternMeta | null
  next: PatternMeta | null
} {
  const all = getAllPatterns()
  const index = all.findIndex((p) => p.slug === slug)
  return {
    prev: index > 0 ? (all[index - 1] ?? null) : null,
    next: index < all.length - 1 ? (all[index + 1] ?? null) : null,
  }
}
